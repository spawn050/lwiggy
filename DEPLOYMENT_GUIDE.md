# AWS Deployment Execution Plan for Lwiggy

> **Portfolio Project Deployment Guide**  
> Last Updated: April 2026  
> Architecture: EC2 (Backend + MySQL) + S3 + CloudFront (Frontend)

---

## Table of Contents

1. [Prerequisites](#phase-0-prerequisites)
2. [AWS Account & IAM Setup](#phase-1-aws-account--iam-setup-30-minutes)
3. [VPC & Security Groups](#phase-2-vpc--security-group-setup-20-minutes)
4. [EC2 Instance Setup](#phase-3-ec2-instance-setup-25-minutes)
5. [MySQL Setup on EC2](#phase-4-mysql-setup-on-ec2-30-minutes)
6. [Java & Spring Boot Setup](#phase-5-java--spring-boot-setup-25-minutes)
7. [Nginx Configuration](#phase-6-install--configure-nginx-20-minutes)
8. [Frontend Deployment](#phase-7-frontend-deployment-to-s3--cloudfront-40-minutes)
9. [SSL/HTTPS Setup](#phase-8-sslhttps-with-lets-encrypt-30-minutes)
10. [Testing & Validation](#phase-9-testing--validation-20-minutes)
11. [Maintenance](#phase-10-maintenance--operations)

---

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│              AWS Cloud                       │
│  ┌─────────────────────────────────────┐    │
│  │           VPC                        │    │
│  │   ┌─────────────────────────────┐    │    │
│   │   │       Public Subnet          │    │    │
│   │   │                              │    │    │
│   │   │   ┌─────────────────────┐    │    │    │
│   │   │   │     EC2 t2.micro    │    │    │    │
│   │   │   │                     │    │    │    │
│   │   │   │  ┌───────────────┐  │    │    │    │
│   │   │   │  │  Spring Boot  │  │    │    │    │
│   │   │   │  │   (Port 8080) │  │◄───┼────┼────┼─── Internet
│   │   │   │  └───────────────┘  │    │    │    │
│   │   │   │                     │    │    │    │
│   │   │   │  ┌───────────────┐  │    │    │    │
│   │   │   │  │    MySQL      │  │    │    │    │
│   │   │   │  │   (Port 3306) │  │    │    │    │
│   │   │   │  │   (localhost) │  │    │    │    │
│   │   │   │  └───────────────┘  │    │    │    │
│   │   │   │                     │    │    │    │
│   │   │   └─────────────────────┘    │    │    │
│   │   │                              │    │    │
│   │   │   Security Group:            │    │    │
│   │   │   - SSH (22): Your IP only   │    │    │
│   │   │   - HTTP (80): 0.0.0.0/0     │    │    │
│   │   │   - API (8080): 0.0.0.0/0    │    │    │
│   │   │   - MySQL (3306): Local only │    │    │
│   │   └─────────────────────────────┘    │    │
│   └─────────────────────────────────────┘    │
│                                               │
│   Elastic IP (free) ──► EC2 (fixed IP)       │
│                                               │
└─────────────────────────────────────────────┘
│                                               │
│   Frontend: S3 + CloudFront (separate)       │
│   - Static hosting                           │
│   - Global CDN                               │
│   - Custom domain optional                   │
└─────────────────────────────────────────────┘
```

---

## Cost Breakdown (Free Tier)

| Service | Free Tier | Monthly Cost After |
|---------|-----------|-------------------|
| **EC2 t2.micro** | 750 hrs | ~$8.50 |
| **S3** | 5GB | ~$0.23/GB |
| **CloudFront** | 10TB transfer | ~$0.085/GB |
| **Data Transfer** | 15GB out | ~$0.09/GB |
| **Total** | **FREE** | **~$9-12/month** if you keep it running 24/7 |

**Money-saving tip**: Stop the EC2 instance when not showing your portfolio. You can start it again when needed.

---

## Phase 0: Prerequisites

### Skills Required
- [ ] Basic Linux commands (cd, ls, sudo, vim/nano)
- [ ] Understanding of SSH
- [ ] Basic MySQL knowledge (CREATE DATABASE, SHOW TABLES)
- [ ] Familiarity with environment variables

### Tools to Install Locally
- [ ] AWS CLI (latest version)
- [ ] SSH client (Terminal on Mac/Linux, PuTTY or Git Bash on Windows)
- [ ] MySQL Workbench or DBeaver (optional, for GUI database management)

---

## Phase 1: AWS Account & IAM Setup (30 minutes)

### Step 1.1: Create AWS Account
1. Go to https://aws.amazon.com/free
2. Click "Create a Free Account"
3. Enter email, password, AWS account name
4. **Important**: Add credit card for verification (you won't be charged if you stay within free tier)
5. Complete identity verification (phone call or SMS)
6. Select "Basic" support plan (free)

### Step 1.2: Set Up Billing Alerts (CRITICAL!)
1. Log into AWS Console
2. Go to **Billing and Cost Management** → **Billing preferences**
3. Enable "Receive Free Tier usage alerts" ✓
4. Go to **Budgets** → **Create budget**
5. Select "Zero spend budget" template
6. This will alert you if you're about to be charged

### Step 1.3: Create IAM User (NEVER use root account!)
1. Go to **IAM** → **Users** → **Add users**
2. User name: `lwiggy-deploy`
3. Access type: ✓ "Programmatic access" AND ✓ "AWS Management Console access"
4. Password: "Custom password" (set one you'll remember)
5. **Uncheck** "User must create a new password at next sign-in"
6. Click **Next: Permissions**
7. Attach policies directly:
   - `AmazonEC2FullAccess`
   - `AmazonS3FullAccess`
   - `AmazonRDSFullAccess` (just in case)
   - `CloudFrontFullAccess`
   - `IAMFullAccess`
8. Click **Next: Tags** → **Next: Review** → **Create user**
9. **IMPORTANT**: Download the CSV file with Access Key ID and Secret Access Key
10. Save the Console login URL shown on the success page

### Step 1.4: Configure AWS CLI Locally

```bash
# Open terminal/command prompt
aws configure

# Enter:
AWS Access Key ID: [from CSV file]
AWS Secret Access Key: [from CSV file]
Default region name: ap-south-1  # or your preferred region
Default output format: json
```

### Step 1.5: Verify Setup

```bash
aws sts get-caller-identity
# Should show your account ID, user ARN
```

---

## Phase 2: VPC & Security Group Setup (20 minutes)

### Step 2.1: Create VPC (Virtual Private Cloud)
1. Go to **VPC** → **Create VPC**
2. Select "VPC and more" (creates all components automatically)
3. Name tag: `lwiggy-vpc`
4. IPv4 CIDR block: `10.0.0.0/16`
5. Number of Availability Zones: 1
6. Number of public subnets: 1
7. Number of private subnets: 0
8. NAT gateways: None
9. VPC endpoints: None
10. Click **Create VPC**

### Step 2.2: Create Security Group
1. Go to **EC2** → **Security Groups** → **Create security group**
2. Security group name: `lwiggy-sg`
3. Description: "Security group for Lwiggy application"
4. VPC: Select `lwiggy-vpc` (created above)

**Inbound Rules:**

| Type | Protocol | Port Range | Source | Description |
|------|----------|------------|--------|-------------|
| SSH | TCP | 22 | My IP | Admin access |
| HTTP | TCP | 80 | 0.0.0.0/0 | Nginx frontend |
| Custom TCP | TCP | 8080 | 0.0.0.0/0 | Spring Boot API |

**Outbound Rules:**
- Leave default (All traffic, 0.0.0.0/0)

5. Click **Create security group**

---

## Phase 3: EC2 Instance Setup (25 minutes)

### Step 3.1: Launch EC2 Instance
1. Go to **EC2** → **Instances** → **Launch instances**
2. Name: `lwiggy-server`
3. Application and OS Images:
   - Select "Ubuntu Server 22.04 LTS" (Free tier eligible) ✓
   - Architecture: 64-bit (x86)
4. Instance type: `t2.micro` (Free tier eligible) ✓
5. Key pair: 
   - Click "Create new key pair"
   - Name: `lwiggy-key`
   - Type: RSA
   - Format: `.pem` (Mac/Linux) or `.ppk` (Windows/PuTTY)
   - **Download and save securely!** You cannot download again!
6. Network settings:
   - VPC: `lwiggy-vpc`
   - Subnet: Public subnet
   - Auto-assign public IP: Enable
   - Security group: Select existing → `lwiggy-sg`
7. Storage:
   - 1x 8 GiB gp2 (default is fine)
8. Click **Launch instance**

### Step 3.2: Allocate Elastic IP (Static IP)
1. Go to **EC2** → **Network & Security** → **Elastic IPs**
2. Click **Allocate Elastic IP address**
3. Network border group: Default
4. Click **Allocate**
5. Select the new Elastic IP → **Actions** → **Associate Elastic IP address**
6. Instance: Select `lwiggy-server`
7. Click **Associate**

**Write down this IP address - this is your server's permanent address!**

### Step 3.3: Test SSH Connection

```bash
# Mac/Linux:
chmod 400 /path/to/lwiggy-key.pem
ssh -i /path/to/lwiggy-key.pem ubuntu@[YOUR_ELASTIC_IP]

# Windows (PuTTY):
# Convert .ppk or use the .pem with recent Windows 10+ OpenSSH
```

You should see the Ubuntu welcome message.

---

## Phase 4: MySQL Setup on EC2 (30 minutes)

### Step 4.1: Update System & Install MySQL

```bash
# SSH into your server first
ssh -i /path/to/lwiggy-key.pem ubuntu@[YOUR_ELASTIC_IP]

# Update package list
sudo apt update && sudo apt upgrade -y

# Install MySQL Server
sudo apt install mysql-server -y

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Verify MySQL is running
sudo systemctl status mysql
# Should show "active (running)"
```

### Step 4.2: Secure MySQL Installation

```bash
sudo mysql_secure_installation

# Answer the prompts:
# - VALIDATE PASSWORD COMPONENT: N (optional, but recommended Y for production)
# - Root password: [SET A STRONG PASSWORD]
# - Remove anonymous users: Y
# - Disallow root login remotely: Y
# - Remove test database: Y
# - Reload privilege tables: Y
```

### Step 4.3: Create Application Database & User

```bash
# Log into MySQL as root
sudo mysql -u root -p

# In MySQL prompt:
CREATE DATABASE lwiggy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'lwiggyuser'@'localhost' IDENTIFIED BY '[STRONG_PASSWORD]';

GRANT ALL PRIVILEGES ON lwiggy.* TO 'lwiggyuser'@'localhost';

FLUSH PRIVILEGES;

SHOW DATABASES;
# Should see "lwiggy" in the list

EXIT;
```

### Step 4.4: Configure MySQL for Remote Access (Optional)

```bash
# Edit MySQL config
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# Find and change:
bind-address = 127.0.0.1
# TO:
bind-address = 0.0.0.0

# Save and exit (Ctrl+X, Y, Enter)

# Restart MySQL
sudo systemctl restart mysql
```

---

## Phase 5: Java & Spring Boot Setup (25 minutes)

### Step 5.1: Install Java 21

```bash
# Check if Java is installed
java -version

# If not installed or wrong version:
sudo apt install openjdk-21-jdk -y

# Verify installation
java -version
# Should show OpenJDK 21
```

### Step 5.2: Install Maven (for building)

```bash
sudo apt install maven -y

# Verify
mvn -version
```

### Step 5.3: Create Application Directory

```bash
sudo mkdir -p /opt/lwiggy
sudo chown ubuntu:ubuntu /opt/lwiggy
cd /opt/lwiggy
```

### Step 5.4: Build Application Locally First

On your **local machine** (not the server):

```bash
cd /path/to/lwiggy/backend

# Update application.properties for production
# Create src/main/resources/application-prod.properties:
```

**`application-prod.properties`:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lwiggy
spring.datasource.username=lwiggyuser
spring.datasource.password=[THE_PASSWORD_YOU_SET]
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

server.port=8080
```

```bash
# Build the JAR
mvn clean package -DskipTests

# Verify JAR was created
ls -la target/*.jar
```

### Step 5.5: Transfer JAR to Server

```bash
# On local machine:
scp -i /path/to/lwiggy-key.pem \
  target/backend-0.0.1-SNAPSHOT.jar \
  ubuntu@[YOUR_ELASTIC_IP]:/opt/lwiggy/
```

### Step 5.6: Create Systemd Service

On the server:

```bash
sudo nano /etc/systemd/system/lwiggy.service
```

**Service file content:**
```ini
[Unit]
Description=Lwiggy Spring Boot Application
After=network.target mysql.service
Wants=mysql.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/opt/lwiggy
ExecStart=/usr/bin/java -jar /opt/lwiggy/backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=prod
SuccessExitStatus=143
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable lwiggy
sudo systemctl start lwiggy

# Check status
sudo systemctl status lwiggy

# View logs
sudo journalctl -u lwiggy -f
```

### Step 5.7: Test Backend

```bash
# Test locally on server
curl http://localhost:8080/api/health
# Or your existing endpoint
```

From your **local machine**, test:

```bash
curl http://[YOUR_ELASTIC_IP]:8080/api/health
```

---

## Phase 6: Install & Configure Nginx (20 minutes)

### Step 6.1: Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 6.2: Configure Nginx as Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/lwiggy
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name _;  # Accept any hostname

    location /api/ {
        proxy_pass http://localhost:8080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Optional: Serve frontend directly from EC2
    # location / {
    #     root /var/www/lwiggy;
    #     index index.html;
    #     try_files $uri $uri/ /index.html;
    # }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/lwiggy /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

### Step 6.3: Test API Through Nginx

```bash
# From local machine
curl http://[YOUR_ELASTIC_IP]/api/health
# Should work!
```

---

## Phase 7: Frontend Deployment to S3 + CloudFront (40 minutes)

### Step 7.1: Create S3 Bucket
1. Go to **S3** → **Create bucket**
2. Bucket name: `lwiggy-frontend-[your-name]` (must be globally unique)
3. AWS Region: Same as your EC2 (e.g., ap-south-1)
4. **Uncheck** "Block all public access"
5. Acknowledge the warning
6. Click **Create bucket**

### Step 7.2: Configure S3 for Static Hosting
1. Click on your bucket
2. Go to **Properties** tab
3. Scroll to "Static website hosting"
4. Click **Edit**
5. Static website hosting: Enable
6. Hosting type: Host a static website
7. Index document: `index.html`
8. Error document: `index.html` (for SPA routing)
9. Click **Save changes**

### Step 7.3: Set Bucket Policy
1. Go to **Permissions** tab
2. Bucket Policy → **Edit**
3. Add:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::lwiggy-frontend-[your-name]/*"
        }
    ]
}
```

4. Click **Save changes**

### Step 7.4: Build Frontend Locally

On your local machine:

```bash
cd /path/to/lwiggy/frontend

# Update API URL to point to your EC2
# Edit src/config.js or wherever you store API base URL:
# const API_BASE_URL = 'http://[YOUR_ELASTIC_IP]/api';

# Install dependencies
npm install

# Build production version
npm run build

# Verify build folder exists
ls -la dist/
```

### Step 7.5: Upload to S3

```bash
# Using AWS CLI
aws s3 sync dist/ s3://lwiggy-frontend-[your-name]/ \
  --delete \
  --acl public-read

# Or manually upload via AWS Console
```

### Step 7.6: Test S3 Website
1. In S3, go to **Properties** → **Static website hosting**
2. Copy the "Bucket website endpoint" URL
3. Open in browser - you should see your app!
4. Test login/register to verify API connection

### Step 7.7: Create CloudFront Distribution (CDN)
1. Go to **CloudFront** → **Create distribution**
2. Origin domain: Select your S3 bucket from dropdown
3. Origin access: Public (since S3 is already public)
4. Viewer protocol policy: **Redirect HTTP to HTTPS**
5. Allowed HTTP methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
6. Cache policy: **CachingOptimized**
7. Alternate domain names (CNAMEs): (leave blank for now)
8. Custom SSL certificate: (leave default CloudFront cert)
9. Default root object: `index.html`
10. Click **Create distribution**

Wait 10-15 minutes for distribution to deploy.

### Step 7.8: Update Frontend API URL

```bash
# Update your frontend config to use CloudFront or EC2 IP
# Use the CloudFront domain name (e.g., d1234.cloudfront.net)
# Or keep EC2 IP for now

# Rebuild and re-upload if you changed config
npm run build
aws s3 sync dist/ s3://lwiggy-frontend-[your-name]/ --delete --acl public-read

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id [YOUR_DISTRIBUTION_ID] \
  --paths "/*"
```

---

## Phase 8: SSL/HTTPS with Let's Encrypt (30 minutes)

### Step 8.1: Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Step 8.2: Obtain SSL Certificate

```bash
sudo certbot --nginx -d [YOUR_DOMAIN_OR_IP]

# If you don't have a domain, you can skip this for now
# Or use the Elastic IP directly (not ideal but works)
```

### Step 8.3: Auto-Renewal

```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Should show success
```

### Step 8.4: Update Security Group
1. Go to **EC2** → **Security Groups** → `lwiggy-sg`
2. **Edit inbound rules**
3. Add rule:
   - Type: HTTPS
   - Port: 443
   - Source: 0.0.0.0/0

---

## Phase 9: Testing & Validation (20 minutes)

### Test Checklist
- [ ] Can access frontend via CloudFront URL (HTTPS)
- [ ] Can register new user
- [ ] Can login with registered user
- [ ] User data persists after logout/login
- [ ] Can access API directly via EC2 IP (HTTP)
- [ ] Nginx reverse proxy works
- [ ] SSL certificate is valid (if configured)
- [ ] App starts automatically after server reboot

### Test Commands

```bash
# Test API health
curl https://[YOUR_CLOUDFRONT_DOMAIN]/api/health

# Test database connection
curl https://[YOUR_CLOUDFRONT_DOMAIN]/api/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123","address":"Test Address","pincode":"400001"}'
```

---

## Phase 10: Maintenance & Operations

### Regular Tasks

#### Check Server Health

```bash
ssh -i lwiggy-key.pem ubuntu@[ELASTIC_IP]

# Check disk space
df -h

# Check memory usage
free -h

# Check running processes
ps aux | grep java

# Check MySQL status
sudo systemctl status mysql
```

#### View Logs

```bash
# Application logs
sudo journalctl -u lwiggy -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# MySQL logs
sudo tail -f /var/log/mysql/error.log
```

#### Backup Database

```bash
# Create backup
mysqldump -u lwiggyuser -p lwiggy > backup_$(date +%Y%m%d).sql

# Download backup
scp -i lwiggy-key.pem ubuntu@[ELASTIC_IP]:/home/ubuntu/backup_*.sql ./

# Restore backup
mysql -u lwiggyuser -p lwiggy < backup_20240331.sql
```

#### Update Application

```bash
# Build new JAR locally
mvn clean package -DskipTests

# Upload to server
scp -i lwiggy-key.pem target/backend-0.0.1-SNAPSHOT.jar ubuntu@[ELASTIC_IP]:/opt/lwiggy/

# On server:
sudo systemctl restart lwiggy
```

#### Stop Server (to save costs)

```bash
# AWS Console → EC2 → Select instance → Actions → Instance State → Stop
# Costs $0 when stopped, but you'll lose the Elastic IP (reassign when starting)
```

---

## Quick Reference Commands

### SSH into Server
```bash
ssh -i /path/to/lwiggy-key.pem ubuntu@[ELASTIC_IP]
```

### Restart Services
```bash
# Backend
sudo systemctl restart lwiggy
sudo systemctl status lwiggy

# Nginx
sudo systemctl restart nginx
sudo nginx -t

# MySQL
sudo systemctl restart mysql
sudo systemctl status mysql
```

### View Logs
```bash
# Application
sudo journalctl -u lwiggy -f --no-pager

# All services
sudo tail -f /var/log/syslog
```

### Database Operations
```bash
# Connect to MySQL
sudo mysql -u lwiggyuser -p lwiggy

# Show tables
USE lwiggy;
SHOW TABLES;

# Create backup
mysqldump -u lwiggyuser -p lwiggy > backup.sql
```

---

## Common Pitfalls to Avoid

1. **Forgetting to stop EC2** when not in use - set a reminder!
2. **Losing the .pem key** - keep multiple backups
3. **Opening port 3306 to internet** - keep it localhost only
4. **Using root MySQL user** for application - always use dedicated user
5. **Forgetting to update API URL** in frontend before building
6. **Not testing after deployment** - always verify end-to-end

---

## Troubleshooting Guide

### Issue: Cannot SSH into EC2
- **Check**: Security group allows SSH (port 22) from your IP
- **Check**: Key file permissions: `chmod 400 lwiggy-key.pem`
- **Check**: Using correct username: `ubuntu` for Ubuntu AMIs
- **Check**: Instance is running and has public IP

### Issue: MySQL Connection Failed
- **Check**: MySQL is running: `sudo systemctl status mysql`
- **Check**: Credentials in application-prod.properties match
- **Check**: Database and user exist: `SHOW DATABASES;` and `SELECT user FROM mysql.user;`
- **Check**: Application can connect to localhost:3306

### Issue: Application Won't Start
- **Check**: Logs: `sudo journalctl -u lwiggy -n 50`
- **Check**: Port 8080 not in use: `sudo lsof -i :8080`
- **Check**: JAR file exists: `ls -la /opt/lwiggy/`
- **Check**: Java version: `java -version` (should be 21)

### Issue: Frontend Can't Connect to API
- **Check**: API URL in frontend config points to EC2 IP
- **Check**: Nginx is running and configured: `sudo nginx -t`
- **Check**: Security group allows port 8080
- **Check**: Backend is running: `curl http://localhost:8080/api/health`

### Issue: S3 Website Shows 403 Forbidden
- **Check**: Bucket policy allows public read
- **Check**: "Block all public access" is unchecked
- **Check**: Files uploaded with `--acl public-read`

---

## Useful Resources

- **AWS Free Tier Limits**: https://aws.amazon.com/free/
- **Ubuntu Server Guide**: https://ubuntu.com/server/docs
- **MySQL Security Best Practices**: https://dev.mysql.com/doc/refman/8.0/en/security.html
- **Let's Encrypt Documentation**: https://letsencrypt.org/docs/
- **Spring Boot Deployment Guide**: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html

---

## Skills You'll Learn

| Skill | What You'll Practice |
|-------|---------------------|
| **AWS Core** | EC2, S3, CloudFront, VPC, Security Groups, IAM |
| **Linux Admin** | SSH, package management, systemd, file permissions |
| **Database** | MySQL installation, user management, security |
| **Web Server** | Nginx reverse proxy, SSL/TLS |
| **Java Deployment** | JAR deployment, systemd services |
| **DevOps** | Environment configuration, monitoring, logs |
| **Security** | Firewalls, SSL certificates, least privilege |

---

## Notes Section

Use this space to document your specific configurations:

**Elastic IP:** _________________.

**EC2 Instance ID:** _________________.

**S3 Bucket Name:** _________________.

**CloudFront Domain:** _________________.

**MySQL Root Password:** _________________.

**Application DB Password:** _________________.

**Custom Domain (if any):** _________________.

---

## Next Steps After Deployment

1. [ ] Test all features end-to-end
2. [ ] Set up CloudWatch monitoring (optional)
3. [ ] Configure automated backups
4. [ ] Document your architecture decisions
5. [ ] Write a blog post about your deployment experience
6. [ ] Add "Deployed on AWS" badge to your GitHub README

---

**Good luck with your deployment! 🚀**

*Remember: The goal is learning, not just getting it working. Take your time and understand each step.*
