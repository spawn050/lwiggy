import { useState } from 'react'
import { Box, Typography, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

export default function MenuItemCard({ item }) {
    const [count, setCount] = useState(0)

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                py: 3,
                borderBottom: '1px solid rgba(2,6,12,0.08)',
                gap: 2,
            }}
        >
            <Box sx={{ flex: 1 }}>
                <Box
                    sx={{
                        width: 16, height: 16,
                        border: `2px solid ${item.is_veg ? '#0f8a65' : '#e43b4f'}`,
                        borderRadius: 0.5,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        mb: 0.75,
                    }}
                >
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.is_veg ? '#0f8a65' : '#e43b4f' }} />
                </Box>

                <Typography fontWeight={600} color="#3d4152" sx={{ mb: 0.5 }}>
                    {item.name}
                </Typography>
                <Typography variant="body2" fontWeight={600} color="#3d4152">
                    ₹{item.price}
                </Typography>
            </Box>

            <Box sx={{ position: 'relative', flexShrink: 0, mb: 2 }}>
                <Box
                    component="img"
                    src={item.image_url}
                    alt={item.name}
                    sx={{ width: 130, height: 100, borderRadius: 2, objectFit: 'cover', display: 'block' }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 96,
                    }}
                >
                    {count === 0 ? (
                        <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            onClick={() => setCount(1)}
                            sx={{
                                bgcolor: '#fff',
                                color: '#1ba672',
                                borderColor: 'rgba(2,6,12,0.15)',
                                fontWeight: 700,
                                fontSize: 15,
                                boxShadow: '0 2px 8px rgba(40,44,63,0.08)',
                                '&:hover': { bgcolor: '#f5fdf9', borderColor: 'rgba(2,6,12,0.15)' },
                            }}
                        >
                            ADD
                        </Button>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                bgcolor: '#fff',
                                border: '1px solid rgba(2,6,12,0.15)',
                                borderRadius: 1,
                                boxShadow: '0 2px 8px rgba(40,44,63,0.08)',
                                px: 0.5,
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={() => setCount((c) => c - 1)}
                                sx={{ color: '#1ba672', p: 0.3 }}
                            >
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography fontWeight={700} color="#1ba672" sx={{ minWidth: 20, textAlign: 'center' }}>
                                {count}
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={() => setCount((c) => c + 1)}
                                sx={{ color: '#1ba672', p: 0.3 }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}