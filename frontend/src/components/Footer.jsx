import { Box, Container, Typography, IconButton, Divider } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'

export default function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: '#f0f0f5', mt: 'auto' }}>
            <Divider />
            <Container maxWidth="lg">
                <Box
                    sx={{
                        py: 4,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                    }}
                >
                    <Typography variant="body2" color="#686b78" fontWeight={500}>
                        Made by Omkar
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                            component="a"
                            href="https://linkedin.com/in/YOUR_LINKEDIN"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: '#686b78', '&:hover': { color: '#FF5200' } }}
                        >
                            <LinkedInIcon />
                        </IconButton>

                        <IconButton
                            component="a"
                            href="https://github.com/YOUR_GITHUB"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: '#686b78', '&:hover': { color: '#FF5200' } }}
                        >
                            <GitHubIcon />
                        </IconButton>

                        <IconButton
                            component="a"
                            href="mailto:YOUR_EMAIL"
                            sx={{ color: '#686b78', '&:hover': { color: '#FF5200' } }}
                        >
                            <EmailIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}