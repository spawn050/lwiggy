import { http, HttpResponse } from 'msw'

const MOCK_USER = {
    id: 1,
    name: 'test',
    email: 'test@test.com',
}

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
]