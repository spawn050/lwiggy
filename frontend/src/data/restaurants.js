export const restaurants = [
    {
        id: 1,
        name: "Burger King",
        cuisine: "Burgers, Fast Food",
        rating: "4.2",
        time: "30 mins",
        priceForTwo: 400,
        location: "Connaught Place, New Delhi",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
        menu: [
            {
                category: "Recommended",
                items: [
                    {
                        id: 101,
                        name: "Whopper",
                        price: 199,
                        description: "Signature flame-grilled beef patty",
                        isVeg: false,
                        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add"
                    },
                    {
                        id: 102,
                        name: "Veggie Burger",
                        price: 149,
                        description: "Crispy veggie patty with fresh lettuce",
                        isVeg: true,
                        image: "https://images.unsplash.com/photo-1550547660-d9450f859349"
                    }
                ]
            },
            {
                category: "Sides",
                items: [
                    {
                        id: 103,
                        name: "Fries (Medium)",
                        price: 99,
                        description: "Classic salted fries",
                        isVeg: true,
                        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Domino's Pizza",
        cuisine: "Pizza, Italian",
        rating: "4.0",
        time: "25 mins",
        priceForTwo: 500,
        location: "Sector 18, Noida",
        image: "https://images.unsplash.com/photo-1601924572627-bd2b8f94c6c6",
        menu: [
            {
                category: "Recommended",
                items: [
                    {
                        id: 201,
                        name: "Farmhouse Pizza",
                        price: 450,
                        description: "Delightful combination of onion, capsicum, tomato & grilled mushroom",
                        isVeg: true,
                        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
                    },
                    {
                        id: 202,
                        name: "Pepperoni Pizza",
                        price: 550,
                        description: "American classic pepperoni",
                        isVeg: false,
                        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e"
                    }
                ]
            }
        ]
    }
];
