import { http, HttpResponse } from "msw";
import { API_URLS } from "../api/ApiConstants";

const mockUser = {
    id: 1,
    email: "test@test.com"
}

export const mockHandlers = [
    http.post(API_URLS.LOGIN, async ({ request }) => {
        const body = await request.json() as { email: string; password: string };
        if (body.email === mockUser.email && body.password === "test") {
            return HttpResponse.json(
                {
                    success: true,
                    data: mockUser,
                    message: "Login successful"
                },
                {headers : { 'set-cookie': 'authToken=dummyAuthToken' }}
            );
        }

        return HttpResponse.json(
            {
                success: false,
                data: null,
                message: "Invalid credentials"
            },
            { status: 401 }
        );
    }),

    http.get(API_URLS.ME, ({ cookies }) => {
        if (!cookies.authToken) {
            return new HttpResponse(null, { status: 401 })
        }

        return HttpResponse.json(
            {
                success: true,
                data: mockUser
            },
            { status: 200 }
        );
    }),

    http.post(API_URLS.LOGOUT, () => {
        return new HttpResponse(
            null,
            { headers: { 'set-cookie': 'authToken=; Max-Age: 0' } }
        );
    })
]