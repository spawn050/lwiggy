### APIs:
1. GET `/api/restaurants?location=pincode`
	1. fetches list of restuarants with some details (restaurant name, rating, cuisine)
	2. request params: location (city or pincode?)
2. GET `/api/restaurants?query=<search-param>&location=<pincode>`
	1. searches restaurants based on restaurant name or dish name
3. GET `/api/restaurants/{restaurantId}`
	1. fetches details of a restaurant(name, address, cuisine, dish list, rating)
4. POST `/api/orders`
	1. creates an order for the cart items
	2. this should be authenticated api
5. GET `/api/orders/{orderId}`
	1. gets details of a specific order
6. GET `/api/orders`
	1. gets list of all orders placed by user
7. POST `/api/auth/login`
8. POST `/api/auth/logout` (will see if this should be removed later)
9. POST `/api/auth/register`
10. GET `/api/users/me`