export async function login(email, password) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
    }

    return response.json()
}

export async function logout() {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Logout failed')
    }

    return response.json()
}

export async function getCurrentUser() {
    const response = await fetch('/api/auth/me', {
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Not authenticated')
    }

    return response.json()
}

export async function register(name, email, password, address, pincode) {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, address, pincode }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
    }

    return response.json()
}