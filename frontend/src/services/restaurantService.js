export async function getRestaurants(pincode) {
    const response = await fetch(`/api/restaurants?location=${pincode}`)

    if (!response.ok) {
        throw new Error('Failed to fetch restaurants')
    }

    return response.json()
}