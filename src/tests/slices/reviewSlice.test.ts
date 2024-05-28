import { createNewStore } from "../../redux/store";
import {
  fetchAllReviews,
  fetchReviewsByProductId,
  fetchReviewsByUserId,
  createReview,
  updateReview,
  deleteReview,
} from "../../redux/slices/reviewSlice";
import mockAxios from "../mocks/mockAxios";
import { mockDataReviews } from "../mocks/mockDataReviews";

let store = createNewStore();

beforeEach(() => {
  mockAxios.reset();
});

describe("reviewSlice", () => {
  test("should handle fetchAllReviews", async () => {
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
    const expectedUrl = `${process.env.REACT_APP_API_URL}/reviews?${queryString}`;

    mockAxios.onGet(expectedUrl).reply(200, {
      items: mockDataReviews.items,
      totalCount: mockDataReviews.totalCount,
    });

    await store.dispatch(fetchAllReviews(queryOptions));
    const state = store.getState().review;
    expect(state.reviews).toHaveLength(mockDataReviews.items.length);
    expect(state.reviews[0].content).toBe("Love it! Highly recommend.");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle createReview", async () => {
    const newReview = {
      userId: "user-1",
      productId: "product-1",
      rating: 5,
      content: "Amazing product!",
      user: {
        name: "Dave",
        avatar: "https://picsum.photos/200/?random=590",
      },
    };

    mockAxios
      .onPost(`${process.env.REACT_APP_API_URL}/reviews`)
      .reply((config) => {
        const review = {
          id: "review-4",
          ...newReview,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockDataReviews.items.push(review);
        mockDataReviews.totalCount += 1;
        return [201, review];
      });

    await store.dispatch(createReview(newReview));
    const state = store.getState().review;
    expect(state.reviews).toHaveLength(mockDataReviews.items.length);
    expect(state.reviews[state.reviews.length - 1].content).toBe(
      "Amazing product!"
    );
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle fetchReviewsByProductId", async () => {
    const productId = "1d82a5a7-38df-46c0-82d2-7071283cab74";
    const expectedUrl = `${process.env.REACT_APP_API_URL}/reviews/products/${productId}`;

    mockAxios.onGet(expectedUrl).reply(
      200,
      mockDataReviews.items.filter((review) => review.productId === productId)
    );

    await store.dispatch(fetchReviewsByProductId(productId));
    const state = store.getState().review;
    expect(state.reviews).toHaveLength(1);
    expect(state.reviews[0].content).toBe("Love it! Highly recommend.");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle fetchReviewsByUserId", async () => {
    const userId = "8fc0b97a-3f97-40e4-998e-2866cbc88b99";
    const expectedUrl = `${process.env.REACT_APP_API_URL}/reviews/users/${userId}`;

    mockAxios.onGet(expectedUrl).reply(
      200,
      mockDataReviews.items.filter((review) => review.userId === userId)
    );

    await store.dispatch(fetchReviewsByUserId(userId));
    const state = store.getState().review;
    expect(state.reviews).toHaveLength(1);
    expect(state.reviews[0].content).toBe("Love it! Highly recommend.");
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle updateReview", async () => {
    const updatedReview = {
      id: "11d76c29-6601-456d-937e-80ef6bb85ba1",
      userId: "8fc0b97a-3f97-40e4-998e-2866cbc88b99",
      rating: 4,
      content: "Updated review content",
    };

    mockAxios
      .onPatch(`${process.env.REACT_APP_API_URL}/reviews/${updatedReview.id}`)
      .reply(200, {
        ...mockDataReviews.items.find((r) => r.id === updatedReview.id),
        ...updatedReview,
      });

    await store.dispatch(updateReview(updatedReview));
    const state = store.getState().review;
    expect(state.reviews.find((r) => r.id === updatedReview.id)?.content).toBe(
      "Updated review content"
    );
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });

  test("should handle deleteReview", async () => {
    const reviewId = "11d76c29-6601-456d-937e-80ef6bb85ba1";

    mockAxios
      .onDelete(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}`)
      .reply(200);

    await store.dispatch(deleteReview(reviewId));
    const state = store.getState().review;
    expect(state.reviews.some((r) => r.id === reviewId)).toBe(false);
    expect(state.error).toBeNull();
    expect(state.loading).toBeFalsy();
  });
});
