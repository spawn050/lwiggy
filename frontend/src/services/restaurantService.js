export async function getRestaurants(pincode) {
    const res = await fetch(`/api/restaurants?location=${pincode}`)
    if (!res.ok) {
        throw new Error('Failed to fetch restaurants')
    }
    return res.json()
}

export async function getRestaurantById(id) {
    const res = await fetch(`/api/restaurants/${id}`)
    if (!res.ok) {
        throw new Error('Restaurant not found')
    }
    return res.json()
}