export async function getUserProfile() {
    const response = await fetch('/api/users/me', {
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Failed to fetch user profile')
    }

    return response.json()
}