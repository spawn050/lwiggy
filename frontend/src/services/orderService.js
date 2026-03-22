export async function placeOrder(orderData) {
    const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
    })
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Failed to place order')
    }
    return res.json()
}