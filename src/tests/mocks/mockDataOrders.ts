export const mockDataOrders = {
  items: [
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
    {
      id: "306513ef-cc79-46c3-8e9d-f99299985178",
      userId: "e00ccef9-7df9-4f06-9d30-e5fac9ca7348",
      status: "Shipped",
      totalPrice: 350.25,
      orderItems: [
        {
          id: "4a0694e5-50e7-44fa-adc1-29199b919b92",
          orderId: "306513ef-cc79-46c3-8e9d-f99299985178",
          productSnapshot: {
            productId: "04a0685a-863d-4c6b-bd1c-4d07773bf796",
            title: "Electronics Product 14",
            price: 200,
            description:
              "The Electronics Product 14 is a eco-friendly, plastic-made product suitable for educational use. With its 6% satisfaction rating, it's perfect for any electronics needs.",
            imageUrls: [
              "https://picsum.photos/200/?random=796",
              "https://picsum.photos/200/?random=824",
              "https://picsum.photos/200/?random=245",
            ],
          },
          quantity: 2,
          price: 200,
          createdAt: "2024-05-24T08:00:15.117183",
          updatedAt: "2024-05-24T08:00:15.117183",
        },
      ],
      shippingAddress: {
        id: "0123ddab-034b-49fc-9d20-303adb84bacc",
        addressLine: "789 Oak St",
        city: "Citytown",
        postalCode: "11223",
        country: "USA",
      },
      createdAt: "2024-05-24T08:00:36.681049",
      updatedAt: "2024-05-24T08:00:36.681049",
    },
    {
      id: "abb4b4d7-0cfc-4943-b3a7-8e38e8b03f88",
      userId: "8fc0b97a-3f97-40e4-998e-2866cbc88b99",
      status: "Completed",
      totalPrice: 230.5,
      orderItems: [
        {
          id: "ce6ca295-51ca-4b7a-a463-99dbf2591ad8",
          orderId: "abb4b4d7-0cfc-4943-b3a7-8e38e8b03f88",
          productSnapshot: {
            productId: "74ed7fc9-908e-496e-83e2-c875b2480efa",
            title: "Books Product 1",
            price: 1000,
            description:
              "The Books Product 1 is a ergonomic design, plastic-made product suitable for educational use. With its 9% satisfaction rating, it's perfect for any books needs.",
            imageUrls: [
              "https://picsum.photos/200/?random=558",
              "https://picsum.photos/200/?random=808",
              "https://picsum.photos/200/?random=285",
            ],
          },
          quantity: 2,
          price: 1000,
          createdAt: "2024-05-24T08:00:15.117186",
          updatedAt: "2024-05-24T08:00:15.117186",
        },
      ],
      shippingAddress: {
        id: "813ed629-6d47-48fb-99c4-dfc1f69f5d16",
        addressLine: "101 Maple St",
        city: "Springfield",
        postalCode: "33445",
        country: "USA",
      },
      createdAt: "2024-05-24T08:00:36.681049",
      updatedAt: "2024-05-24T08:00:36.681049",
    },
    {
      id: "d7bb2cd8-9aa1-46da-aa07-64028286cf2c",
      userId: "ff21dca7-d583-41a5-b289-57bf6db909b6",
      status: "Completed",
      totalPrice: 150.5,
      orderItems: [
        {
          id: "6b5d255c-c01d-4eb2-b5f9-d0997fdd17a8",
          orderId: "d7bb2cd8-9aa1-46da-aa07-64028286cf2c",
          productSnapshot: {
            productId: "1f9fd9ec-4c2a-45a7-9082-55540a6d414d",
            title: "Electronics Product 5",
            price: 200,
            description:
              "The Electronics Product 5 is a durable, wood-made product suitable for educational use. With its 1% satisfaction rating, it's perfect for any electronics needs.",
            imageUrls: [
              "https://picsum.photos/200/?random=172",
              "https://picsum.photos/200/?random=393",
              "https://picsum.photos/200/?random=887",
            ],
          },
          quantity: 2,
          price: 200,
          createdAt: "2024-05-24T08:00:15.117176",
          updatedAt: "2024-05-24T08:00:15.117176",
        },
      ],
      shippingAddress: {
        id: "428661e9-c5d9-4267-9b95-2ce3ea260d52",
        addressLine: "123 Main St",
        city: "Townsville",
        postalCode: "12345",
        country: "USA",
      },
      createdAt: "2024-05-24T08:00:36.681049",
      updatedAt: "2024-05-24T08:00:36.681049",
    },
    {
      id: "dbb699e0-e53e-4bf8-9cce-3196addc9d56",
      userId: "5a7452f2-f55e-4b8f-9509-956e923549df",
      status: "Completed",
      totalPrice: 450.78,
      orderItems: [
        {
          id: "6467c580-11d9-48b5-a9d6-8684b3fd6cd0",
          orderId: "dbb699e0-e53e-4bf8-9cce-3196addc9d56",
          productSnapshot: {
            productId: "2ea35876-7f0e-4b84-b649-08877a5a8d89",
            title: "Women Product 13",
            price: 500,
            description:
              "The Women Product 13 is a eco-friendly, composite-made product suitable for indoor use. With its 7% satisfaction rating, it's perfect for any women needs.",
            imageUrls: [
              "https://picsum.photos/200/?random=777",
              "https://picsum.photos/200/?random=979",
              "https://picsum.photos/200/?random=742",
            ],
          },
          quantity: 1,
          price: 500,
          createdAt: "2024-05-24T08:00:15.117193",
          updatedAt: "2024-05-24T08:00:15.117193",
        },
      ],
      shippingAddress: {
        id: "cba43df5-905a-4e7f-9179-71d0299a2e91",
        addressLine: "303 Cedar St",
        city: "Hillview",
        postalCode: "77889",
        country: "USA",
      },
      createdAt: "2024-05-24T08:00:36.681049",
      updatedAt: "2024-05-24T08:00:36.681049",
    },
    {
      id: "e39da5c0-050d-4001-9020-99d8b1e6b27f",
      userId: "bffc6be8-3482-4f7c-a7af-d35b01577f11",
      status: "Completed",
      totalPrice: 560.99,
      orderItems: [
        {
          id: "8705c885-9ac3-438d-be3f-64ed49bf9749",
          orderId: "e39da5c0-050d-4001-9020-99d8b1e6b27f",
          productSnapshot: {
            productId: "567f0447-7034-4181-8346-58ed9b2b7d80",
            title: "Toys Product 17",
            price: 100,
            description:
              "The Toys Product 17 is a durable, plastic-made product suitable for educational use. With its 2% satisfaction rating, it's perfect for any toys needs.",
            imageUrls: [
              "https://picsum.photos/200/?random=634",
              "https://picsum.photos/200/?random=297",
              "https://picsum.photos/200/?random=714",
            ],
          },
          quantity: 4,
          price: 100,
          createdAt: "2024-05-24T08:00:15.11719",
          updatedAt: "2024-05-24T08:00:15.11719",
        },
      ],
      shippingAddress: {
        id: "e42500cb-078e-4832-86ef-39e3ce6491b3",
        addressLine: "202 Pine St",
        city: "Greenville",
        postalCode: "55667",
        country: "USA",
      },
      createdAt: "2024-05-24T08:00:36.681049",
      updatedAt: "2024-05-24T08:00:36.681049",
    },
    {
      id: "692864d2-f066-45af-a073-3a9fc7ff3bbc",
      userId: "e00ccef9-7df9-4f06-9d30-e5fac9ca7348",
      status: "Pending",
      totalPrice: 1600,
      orderItems: [
        {
          id: "46d3bdbc-410d-4584-83a7-0b03e4edfbb3",
          orderId: "692864d2-f066-45af-a073-3a9fc7ff3bbc",
          productSnapshot: {
            productId: "6b049b76-e4d9-4679-b1dc-ff51c5afbf2a",
            title: "Books Product 18",
            price: 800,
            description:
              "The Books Product 18 is a lightweight, plastic-made product suitable for personal use. With its 1% satisfaction rating, it's perfect for any books needs.",
            imageUrls: [
              "https://picsum.photos/200/?random=192",
              "https://picsum.photos/200/?random=903",
              "https://picsum.photos/200/?random=572",
            ],
          },
          quantity: 2,
          price: 800,
          createdAt: "2024-05-24T15:08:08.30089",
          updatedAt: "2024-05-24T15:08:08.30089",
        },
      ],
      shippingAddress: {
        id: "187386d8-7cc2-4ba7-9747-e186cc07e3c6",
        addressLine: "12Street 2 B",
        city: "NY",
        postalCode: "87456",
        country: "USA",
      },
      createdAt: "2024-05-24T15:08:08.300805",
      updatedAt: "2024-05-24T15:08:08.300858",
    },
  ],
  totalCount: 7,
};
