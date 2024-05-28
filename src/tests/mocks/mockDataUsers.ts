export const mockDataUsers = {
  items: [
    {
      id: "5a7452f2-f55e-4b8f-9509-956e923549df",
      name: "Bob",
      email: "bob@example.com",
      role: "Customer",
      avatar: "https://picsum.photos/200/?random=424",
      orders: [
        {
          id: "1745fd1e-d1ac-4605-8fc6-fcf5d70b0f6f",
          userId: "5a7452f2-f55e-4b8f-9509-956e923549df",
          status: "Processing",
          totalPrice: 250.75,
          orderItems: [
            {
              id: "af21fb5c-a2e1-49be-9aa5-0605129cce03",
              orderId: "1745fd1e-d1ac-4605-8fc6-fcf5d70b0f6f",
              productSnapshot: {
                productId: "98efdf45-979a-45cc-a810-63949bb89146",
                title: "Books Product 10",
                price: 700,
                description:
                  "The Books Product 10 is a durable, glass-made product suitable for educational use. With its 4% satisfaction rating, it's perfect for any books needs.",
                imageUrls: [
                  "https://picsum.photos/200/?random=190",
                  "https://picsum.photos/200/?random=976",
                  "https://picsum.photos/200/?random=206",
                ],
              },
              quantity: 1,
              price: 700,
              createdAt: "2024-05-24T08:00:15.117179",
              updatedAt: "2024-05-24T08:00:15.117179",
            },
          ],
          shippingAddress: {
            id: "e7c0aa04-68ba-4f5f-92b0-1e9091e1e7e0",
            addressLine: "456 Elm St",
            city: "Villageville",
            postalCode: "67890",
            country: "USA",
          },
          createdAt: "2024-05-24T08:00:36.681049",
          updatedAt: "2024-05-24T08:00:36.681049",
        },
      ],
      reviews: [
        {
          id: "6619c5b6-4d3b-4369-800d-9948d6f56157",
          userId: "5a7452f2-f55e-4b8f-9509-956e923549df",
          productId: "eaec5e2f-5e71-4e4e-8e7e-20063b20657f",
          rating: 4,
          content: "Very good quality.",
          createdAt: "2024-05-24T08:00:36.681049",
          updatedAt: "2024-05-24T08:00:36.681049",
          user: {
            name: "Bob",
            avatar: "https://picsum.photos/200/?random=424",
          },
        },
      ],
    },
  ],
  totalCount: 1,
};
