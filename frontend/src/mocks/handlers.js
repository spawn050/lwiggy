import { http, HttpResponse } from 'msw'

const MOCK_USER = {
    id: 1,
    name: 'test',
    email: 'test@test.com',
}

const MOCK_RESTAURANTS = [
    {
        id: 1,
        name: 'Tandoor Palace',
        address: 'Connaught Place, New Delhi',
        pincode: '110001',
        image_url: 'https://picsum.photos/seed/rest1/400/200',
        rating: 4.3,
        rating_count: 2341,
        cuisines: ['North Indian', 'Mughlai'],
    },
    {
        id: 2,
        name: 'Dosa Hut',
        address: 'Indiranagar, Bengaluru',
        pincode: '560038',
        image_url: 'https://picsum.photos/seed/rest2/400/200',
        rating: 4.1,
        rating_count: 987,
        cuisines: ['South Indian', 'Breakfast'],
    },
    {
        id: 3,
        name: 'Dragon Wok',
        address: 'Bandra West, Mumbai',
        pincode: '400050',
        image_url: 'https://picsum.photos/seed/rest3/400/200',
        rating: 3.9,
        rating_count: 654,
        cuisines: ['Chinese', 'Thai', 'Asian'],
    },
    {
        id: 4,
        name: 'The Burger Lab',
        address: 'Koramangala, Bengaluru',
        pincode: '560034',
        image_url: 'https://picsum.photos/seed/rest4/400/200',
        rating: 4.5,
        rating_count: 3120,
        cuisines: ['American', 'Fast Food'],
    },
    {
        id: 5,
        name: 'Spice Garden',
        address: 'Powai, Mumbai',
        pincode: '400076',
        image_url: 'https://picsum.photos/seed/rest5/400/200',
        rating: 4.0,
        rating_count: 1450,
        cuisines: ['North Indian', 'Chinese', 'Biryani'],
    },
    {
        id: 6,
        name: 'Pizza Roma',
        address: 'Jubilee Hills, Hyderabad',
        pincode: '500033',
        image_url: 'https://picsum.photos/seed/rest6/400/200',
        rating: 4.2,
        rating_count: 890,
        cuisines: ['Italian', 'Pizza', 'Pasta'],
    },
    {
        id: 7,
        name: 'Biryani Brothers',
        address: 'Hitech City, Hyderabad',
        pincode: '500081',
        image_url: 'https://picsum.photos/seed/rest7/400/200',
        rating: 4.6,
        rating_count: 5230,
        cuisines: ['Biryani', 'Mughlai'],
    },
    {
        id: 8,
        name: 'Green Bowl',
        address: 'Hauz Khas, New Delhi',
        pincode: '110016',
        image_url: 'https://picsum.photos/seed/rest8/400/200',
        rating: 4.4,
        rating_count: 720,
        cuisines: ['Healthy', 'Salads', 'Wraps'],
    },
]

export const handlers = [
    http.post('/api/auth/login', async ({ request }) => {
        const { email, password } = await request.json()

        if (email === 'test@test.com' && password === 'password123') {
            return HttpResponse.json({ user: MOCK_USER })
        }

        return HttpResponse.json(
            { message: 'Invalid email or password' },
            { status: 401 }
        )
    }),

    http.post('/api/auth/logout', () => {
        return HttpResponse.json({ success: true })
    }),

    http.get('/api/restaurants', ({ request }) => {
        const url = new URL(request.url)
        const location = url.searchParams.get('location')
        console.log('[MSW] GET /api/restaurants, location:', location)
        return HttpResponse.json(MOCK_RESTAURANTS)
    }),
]