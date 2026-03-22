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
        image_url: 'https://picsum.photos/seed/rest1/800/400',
        rating: 4.3,
        rating_count: 2341,
        cuisines: ['North Indian', 'Mughlai'],
    },
    {
        id: 2,
        name: 'Dosa Hut',
        address: 'Indiranagar, Bengaluru',
        pincode: '560038',
        image_url: 'https://picsum.photos/seed/rest2/800/400',
        rating: 4.1,
        rating_count: 987,
        cuisines: ['South Indian', 'Breakfast'],
    },
    {
        id: 3,
        name: 'Dragon Wok',
        address: 'Bandra West, Mumbai',
        pincode: '400050',
        image_url: 'https://picsum.photos/seed/rest3/800/400',
        rating: 3.9,
        rating_count: 654,
        cuisines: ['Chinese', 'Thai', 'Asian'],
    },
    {
        id: 4,
        name: 'The Burger Lab',
        address: 'Koramangala, Bengaluru',
        pincode: '560034',
        image_url: 'https://picsum.photos/seed/rest4/800/400',
        rating: 4.5,
        rating_count: 3120,
        cuisines: ['American', 'Fast Food'],
    },
    {
        id: 5,
        name: 'Spice Garden',
        address: 'Powai, Mumbai',
        pincode: '400076',
        image_url: 'https://picsum.photos/seed/rest5/800/400',
        rating: 4.0,
        rating_count: 1450,
        cuisines: ['North Indian', 'Chinese', 'Biryani'],
    },
    {
        id: 6,
        name: 'Pizza Roma',
        address: 'Jubilee Hills, Hyderabad',
        pincode: '500033',
        image_url: 'https://picsum.photos/seed/rest6/800/400',
        rating: 4.2,
        rating_count: 890,
        cuisines: ['Italian', 'Pizza', 'Pasta'],
    },
    {
        id: 7,
        name: 'Biryani Brothers',
        address: 'Hitech City, Hyderabad',
        pincode: '500081',
        image_url: 'https://picsum.photos/seed/rest7/800/400',
        rating: 4.6,
        rating_count: 5230,
        cuisines: ['Biryani', 'Mughlai'],
    },
    {
        id: 8,
        name: 'Green Bowl',
        address: 'Hauz Khas, New Delhi',
        pincode: '110016',
        image_url: 'https://picsum.photos/seed/rest8/800/400',
        rating: 4.4,
        rating_count: 720,
        cuisines: ['Healthy', 'Salads', 'Wraps'],
    },
]

const MOCK_MENUS = {
    1: [
        { id: 101, name: 'Butter Chicken', price: 280, image_url: 'https://picsum.photos/seed/item101/150/150', is_veg: false },
        { id: 102, name: 'Dal Makhani', price: 220, image_url: 'https://picsum.photos/seed/item102/150/150', is_veg: true },
        { id: 103, name: 'Garlic Naan', price: 60, image_url: 'https://picsum.photos/seed/item103/150/150', is_veg: true },
        { id: 104, name: 'Seekh Kebab', price: 320, image_url: 'https://picsum.photos/seed/item104/150/150', is_veg: false },
        { id: 105, name: 'Paneer Tikka', price: 260, image_url: 'https://picsum.photos/seed/item105/150/150', is_veg: true },
        { id: 106, name: 'Chicken Biryani', price: 350, image_url: 'https://picsum.photos/seed/item106/150/150', is_veg: false },
    ],
    2: [
        { id: 201, name: 'Masala Dosa', price: 120, image_url: 'https://picsum.photos/seed/item201/150/150', is_veg: true },
        { id: 202, name: 'Idli Sambar', price: 80, image_url: 'https://picsum.photos/seed/item202/150/150', is_veg: true },
        { id: 203, name: 'Medu Vada', price: 90, image_url: 'https://picsum.photos/seed/item203/150/150', is_veg: true },
        { id: 204, name: 'Uttapam', price: 110, image_url: 'https://picsum.photos/seed/item204/150/150', is_veg: true },
    ],
    3: [
        { id: 301, name: 'Veg Fried Rice', price: 180, image_url: 'https://picsum.photos/seed/item301/150/150', is_veg: true },
        { id: 302, name: 'Chicken Manchurian', price: 240, image_url: 'https://picsum.photos/seed/item302/150/150', is_veg: false },
        { id: 303, name: 'Pad Thai', price: 280, image_url: 'https://picsum.photos/seed/item303/150/150', is_veg: false },
        { id: 304, name: 'Spring Rolls', price: 160, image_url: 'https://picsum.photos/seed/item304/150/150', is_veg: true },
    ],
    4: [
        { id: 401, name: 'Classic Burger', price: 220, image_url: 'https://picsum.photos/seed/item401/150/150', is_veg: false },
        { id: 402, name: 'Veggie Burger', price: 180, image_url: 'https://picsum.photos/seed/item402/150/150', is_veg: true },
        { id: 403, name: 'Fries', price: 100, image_url: 'https://picsum.photos/seed/item403/150/150', is_veg: true },
        { id: 404, name: 'Milkshake', price: 150, image_url: 'https://picsum.photos/seed/item404/150/150', is_veg: true },
    ],
    5: [
        { id: 501, name: 'Veg Biryani', price: 220, image_url: 'https://picsum.photos/seed/item501/150/150', is_veg: true },
        { id: 502, name: 'Chicken Biryani', price: 280, image_url: 'https://picsum.photos/seed/item502/150/150', is_veg: false },
        { id: 503, name: 'Paneer Butter Masala', price: 240, image_url: 'https://picsum.photos/seed/item503/150/150', is_veg: true },
        { id: 504, name: 'Hakka Noodles', price: 180, image_url: 'https://picsum.photos/seed/item504/150/150', is_veg: true },
    ],
    6: [
        { id: 601, name: 'Margherita Pizza', price: 280, image_url: 'https://picsum.photos/seed/item601/150/150', is_veg: true },
        { id: 602, name: 'Pepperoni Pizza', price: 340, image_url: 'https://picsum.photos/seed/item602/150/150', is_veg: false },
        { id: 603, name: 'Pasta Arrabiata', price: 220, image_url: 'https://picsum.photos/seed/item603/150/150', is_veg: true },
        { id: 604, name: 'Garlic Bread', price: 120, image_url: 'https://picsum.photos/seed/item604/150/150', is_veg: true },
    ],
    7: [
        { id: 701, name: 'Hyderabadi Chicken Biryani', price: 320, image_url: 'https://picsum.photos/seed/item701/150/150', is_veg: false },
        { id: 702, name: 'Veg Biryani', price: 240, image_url: 'https://picsum.photos/seed/item702/150/150', is_veg: true },
        { id: 703, name: 'Mutton Biryani', price: 380, image_url: 'https://picsum.photos/seed/item703/150/150', is_veg: false },
        { id: 704, name: 'Raita', price: 60, image_url: 'https://picsum.photos/seed/item704/150/150', is_veg: true },
    ],
    8: [
        { id: 801, name: 'Greek Salad', price: 220, image_url: 'https://picsum.photos/seed/item801/150/150', is_veg: true },
        { id: 802, name: 'Quinoa Bowl', price: 280, image_url: 'https://picsum.photos/seed/item802/150/150', is_veg: true },
        { id: 803, name: 'Chicken Wrap', price: 260, image_url: 'https://picsum.photos/seed/item803/150/150', is_veg: false },
        { id: 804, name: 'Smoothie', price: 180, image_url: 'https://picsum.photos/seed/item804/150/150', is_veg: true },
    ],
}

export const handlers = [
    http.post('/api/auth/login', async ({ request }) => {
        const { email, password } = await request.json()
        if (email === 'test@test.com' && password === 'password123') {
            return HttpResponse.json({ user: MOCK_USER })
        }
        return HttpResponse.json({ message: 'Invalid email or password' }, { status: 401 })
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

    http.get('/api/restaurants/:id', ({ params }) => {
        const id = Number(params.id)
        const restaurant = MOCK_RESTAURANTS.find((r) => r.id === id)
        if (!restaurant) {
            return HttpResponse.json({ message: 'Restaurant not found' }, { status: 404 })
        }
        return HttpResponse.json({ ...restaurant, menu: MOCK_MENUS[id] ?? [] })
    }),

    http.post('/api/orders', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json(
            {
                id: Math.floor(Math.random() * 1000) + 1,
                status: 'PLACED',
                total_price: body.total_price,
                restaurant_id: body.restaurant_id,
                order_placed_time: new Date().toISOString(),
            },
            { status: 201 }
        )
    }),
]