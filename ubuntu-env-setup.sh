#!/bin/bash

sudo apt update
sudo apt upgrade -y

###################################### GIT SETUP ######################################
echo "Setting up git..."
sudo apt install git -y
read -p "Enter GitHub username: " GIT_USER
read -p "Enter GitHub email: " GIT_EMAIL

git config --global user.name "$GIT_USER"
git config --global user.email "$GIT_EMAIL"

echo "Git installed and identity configured as: $GIT_USER <$GIT_EMAIL>"

# Check if key already exists to avoid overwriting
if [ ! -f ~/.ssh/id_ed25519 ]; then
    echo "Generating new SSH key..."
    ssh-keygen -t ed25519 -C "$GIT_EMAIL" -N "" -f ~/.ssh/id_ed25519
else
    echo "SSH key already exists, skipping generation."
fi

echo "-------------------------------------------------------"
echo "Copy the SSH key below and add it to your Git provider:"
echo "-------------------------------------------------------"
cat ~/.ssh/id_ed25519.pub
echo "-------------------------------------------------------"
read -n 1 -s -p "Press any key to continue..."
echo ""

echo "-------------------------------------git setup complete! You can now test with: ssh -T git@github.com"
#######################################################################################

###################################### DOCKER SETUP ###################################
# used this guide: https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository
# Check and remove existing docker packages if present
DOCKER_PACKAGES=$(dpkg --get-selections docker.io docker-compose docker-compose-v2 docker-doc podman-docker containerd runc 2>/dev/null | grep -v deinstall | cut -f1)
if [ -n "$DOCKER_PACKAGES" ]; then
    sudo apt remove -y $DOCKER_PACKAGES || true
fi

# Add Docker's official GPG key:
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update

sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo usermod -aG docker ubuntu
sudo systemctl start docker

#######################################################################################

###################################### LWIGGY SETUP ###################################
mkdir -p ~/omkar/lwiggy && cd ~/omkar/lwiggy
if [ ! -d "lwiggy" ]; then
    git clone git@github.com:spawn050/lwiggy.git
else
    echo "lwiggy directory already exists, skipping git clone."
fi
cd lwiggy

git pull origin main

# MySQL root password (default: changeme)
read -sp "Enter MySQL root password [changeme]: " MYSQL_ROOT_PASSWORD
echo ""
MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-changeme}
   
# DB password (default: changeme)
read -sp "Enter database password [changeme]: " DB_PASSWORD
echo ""
DB_PASSWORD=${DB_PASSWORD:-changeme}
   
# EC2 IP/Domain (default: localhost)
read -p "Enter EC2 IP or domain [localhost]: " EC2_DOMAIN
EC2_DOMAIN=${EC2_DOMAIN:-localhost}

# autogenerate jwt-secret
JWT_SECRET=$(openssl rand -base64 48)

cat << EOF > .env

MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
MYSQL_USER=lwiggy_user
DB_USERNAME=lwiggy_user
DB_PASSWORD=$DB_PASSWORD                                                                                          
DB_URL=jdbc:mysql://db:3306/lwiggy?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
JWT_SECRET=$JWT_SECRET
CORS_ALLOWED_ORIGIN=http://$EC2_DOMAIN
VITE_API_BASE_URL=http://$EC2_DOMAIN
EOF

sudo docker compose up -d --build

