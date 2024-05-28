import { createNewStore } from "../../redux/store";
import {
  fetchAllOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
} from "../../redux/slices/orderSlice";
import mockAxios from "../mocks/mockAxios";
import { mockDataOrders } from "../mocks/mockDataOrders";

let store = createNewStore();

beforeEach(() => {
  mockAxios.reset();
});

describe("orderSlice", () => {
  test("should handle fetchAllOrders", async () => {
    const queryOptions = {
      page: 1,
      pageSize: 12,
      sortBy: "createdAt",
      sortOrder: "asc",
    };
    const queryString = new URLSearchParams({
      page: queryOptions.page.toString(),
      pageSize: queryOptions.pageSize.toString(),
      sortBy: queryOptions.sortBy,
      sortOrder: queryOptions.sortOrder,
    }).toString();
    const expectedUrl = `${process.env.REACT_APP_API_URL}/orders?${queryString}`;

    mockAxios.onGet(expectedUrl).reply(200, {
      items: mockDataOrders.items,
      totalCount: mockDataOrders.totalCount,
    });

    await store.dispatch(fetchAllOrders(queryOptions));
    const state = store.getState().orders;
    expect(state.orders).toHaveLength(mockDataOrders.items.length);
    expect(state.orders[0].status).toBe("Processing");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle createOrder", async () => {
    const newOrder = {
      userId: "user-1",
      status: "Pending",
      totalPrice: 150,
      orderItems: [],
      shippingAddress: {
        id: "mock-id",
        addressLine: "789 Oak St",
        city: "Sometown",
        postalCode: "11223",
        country: "USA",
      },
    };

    mockAxios
      .onPost(`${process.env.REACT_APP_API_URL}/orders`)
      .reply((config) => {
        const order = {
          id: "order-3",
          ...newOrder,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockDataOrders.items.push(order);
        mockDataOrders.totalCount += 1;
        return [201, order];
      });

    await store.dispatch(createOrder(newOrder));
    const state = store.getState().orders;
    expect(state.orders).toHaveLength(mockDataOrders.items.length);
    expect(state.orders[state.orders.length - 1].status).toBe("Pending");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle updateOrderStatus", async () => {
    const updatedStatus = "Shipped";

    mockAxios
      .onPatch(
        `${process.env.REACT_APP_API_URL}/orders/1745fd1e-d1ac-4605-8fc6-fcf5d70b0f6f/status`
      )
      .reply((config) => {
        const order = mockDataOrders.items.find(
          (o) => o.id === "1745fd1e-d1ac-4605-8fc6-fcf5d70b0f6f"
        );
        if (order) {
          order.status = updatedStatus;
        }
        return [200, order];
      });

    await store.dispatch(
      updateOrderStatus({
        orderId: "1745fd1e-d1ac-4605-8fc6-fcf5d70b0f6f",
        status: updatedStatus,
      })
    );
    const state = store.getState().orders;
    expect(
      state.orders.find((o) => o.id === "1745fd1e-d1ac-4605-8fc6-fcf5d70b0f6f")
        ?.status
    ).toBe("Shipped");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle cancelOrder", async () => {
    const orderId = "1745fd1e-d1ac-4605-8fc6-fcf5d70b0f6f";
    const cancelledOrder = { ...mockDataOrders.items[0], status: "Cancelled" };

    mockAxios
      .onPatch(`${process.env.REACT_APP_API_URL}/orders/${orderId}/cancel`)
      .reply(200, cancelledOrder);

    await store.dispatch(cancelOrder(orderId));
    const state = store.getState().orders;
    expect(state.orders.find((o) => o.id === orderId)?.status).toBe(
      "Cancelled"
    );
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle deleteOrder", async () => {
    const orderId = "1745fd1e-d1ac-4605-8fc6-fcf5d70b0f6f";

    mockAxios
      .onDelete(`${process.env.REACT_APP_API_URL}/orders/${orderId}/delete`)
      .reply(200);

    await store.dispatch(deleteOrder(orderId));
    const state = store.getState().orders;
    expect(state.orders.some((o) => o.id === orderId)).toBe(false);
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });
});
