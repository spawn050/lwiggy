import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";

export default function Footer() {
    return (
        <Box
            sx={{
                bgcolor: "#000000",
                color: "white",
                py: 6,
                mt: 4,
            }}
        >
            <Container>
                <Grid container spacing={4}>
                    {/* Company Column */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: "gray" }}>
                            COMPANY
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link href="#" color="inherit" underline="hover">
                                About us
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Team
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Careers
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Lwiggy Blog
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Bug Bounty
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Lwiggy One
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Lwiggy Corporate
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Lwiggy Instamart
                            </Link>
                        </Box>
                    </Grid>

                    {/* Contact Column */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: "gray" }}>
                            CONTACT
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link href="#" color="inherit" underline="hover">
                                Help & Support
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Partner with us
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Ride with us
                            </Link>
                        </Box>
                    </Grid>

                    {/* Legal Column */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: "gray" }}>
                            LEGAL
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link href="#" color="inherit" underline="hover">
                                Terms & Conditions
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Cookie Policy
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Privacy Policy
                            </Link>
                        </Box>
                    </Grid>

                    {/* Social / App with us icons */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: "gray" }}>
                            SOCIAL LINKS
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                            <IconButton href="#" color="inherit">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton href="#" color="inherit">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton href="#" color="inherit">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton href="#" color="inherit">
                                <PinterestIcon />
                            </IconButton>
                        </Box>

                        <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
                            © 2024 Lwiggy Technologies Pvt. Ltd
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
