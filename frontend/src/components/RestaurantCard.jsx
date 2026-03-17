import { useNavigate } from 'react-router-dom'
import { Box, Card, Typography, Chip } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

export default function RestaurantCard({ restaurant }) {
    const navigate = useNavigate()
    const { id, name, address, rating, rating_count, image_url, cuisines } = restaurant

    return (
        <Card
            onClick={() => navigate(`/restaurants/${id}`)}
            sx={{
                borderRadius: 3,
                boxShadow: '0px 0px 8px rgba(27,30,36,0.08)',
                border: '1px solid rgba(2,6,12,0.08)',
                cursor: 'pointer',
                transition: 'transform 0.1s',
                '&:hover': { transform: 'scale(1.02)' },
                overflow: 'hidden',
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <Box
                    component="img"
                    src={image_url}
                    alt={name}
                    sx={{ width: '100%', height: 189, objectFit: 'cover', display: 'block' }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        height: 60,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        px: 1.5,
                        pb: 1,
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={700} color="#fff" noWrap sx={{ maxWidth: '70%' }}>
                        {name}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex', alignItems: 'center', gap: 0.3,
                            bgcolor: '#48c479', borderRadius: 1, px: 0.6, py: 0.2,
                        }}
                    >
                        <StarIcon sx={{ color: '#fff', fontSize: 12 }} />
                        <Typography variant="caption" color="#fff" fontWeight={700}>
                            {rating}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ px: 1.5, pt: 1.5, pb: 2 }}>
                <Typography variant="caption" color="#3d4152" fontWeight={600} display="block" noWrap>
                    {address}
                </Typography>
                <Typography variant="caption" color="#686b78" display="block">
                    {rating_count.toLocaleString()} ratings
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {cuisines.slice(0, 3).map((cuisine) => (
                        <Chip
                            key={cuisine}
                            label={cuisine}
                            size="small"
                            sx={{ bgcolor: '#f0f0f5', color: '#686b78', fontSize: 11, height: 22 }}
                        />
                    ))}
                </Box>
            </Box>
        </Card>
    )
}