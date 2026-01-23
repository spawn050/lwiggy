const BASE = "http://localhost:8080";

export function getAllRestaurants() {
    return fetch(`${BASE}/api/restaurants`, {
        method: "GET",
        // credentials: "include" // Optional depending on security config, but safe to keep
    }).then(res => {
        if (!res.ok) throw new Error("Failed to fetch restaurants");
        return res.json();
    });
}

export function getRestaurantById(id) {
    return fetch(`${BASE}/api/restaurants/${id}`, {
        method: "GET",
    }).then(res => {
        if (!res.ok) throw new Error("Failed to fetch restaurant");
        return res.json();
    });
}
