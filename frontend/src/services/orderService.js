export async function placeOrder(orderData) {
    const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(orderData),
    })
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Failed to place order')
    }
    return res.json()
}

export async function getOrders() {
    const res = await fetch('/api/orders', {
        credentials: 'include',
    })
    if (!res.ok) {
        throw new Error('Failed to fetch orders')
    }
    return res.json()
}