import {
  addFavoriteProduct,
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProductById,
  removeFavoriteProduct,
  searchProductByName,
  sortProductsByPrice,
  updateProduct,
} from "../../redux/slices/productSlice";
import { createNewStore } from "../../redux/store";
import { NewProduct } from "../../types/Product";
import {
  ascMockProducts,
  descMockProducts,
  favProduct,
} from "../mockdata/products";
import { productServer } from "../shared/productServer";

let store = createNewStore();

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

beforeEach(() => {
  store = createNewStore();
});

describe("product reducer", () => {
  //test for fetch all data of products
  test("should fetch all products from api", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().products.products.length).toBe(3);
    expect(store.getState().products.error).toBeNull();
    expect(store.getState().products.loading).toBeFalsy();
  });
  //test for sorting products by price in descending order
  test("should sort products by price in descending order", async () => {
    await store.dispatch(fetchAllProducts());
    store.dispatch(sortProductsByPrice("desc"));
    expect(store.getState().products.products).toEqual(descMockProducts);
  });
  //test for sorting products by price in ascending order
  test("should sort products by price in ascending order", async () => {
    await store.dispatch(fetchAllProducts());
    store.dispatch(sortProductsByPrice("asc"));
    expect(store.getState().products.products).toEqual(ascMockProducts);
  });
  //test for search by name
  test("should search products by name", async () => {
    await store.dispatch(fetchAllProducts());
    store.dispatch(searchProductByName("wallet"));
    expect(store.getState().products.products.length).toBe(1);
    //Dispatch action with search query in uppercase
    store.dispatch(searchProductByName("NOTEBOOK"));
    expect(store.getState().products.products.length).toBe(0);
  });
  //test for add favorite product
  test("should add favorite product", async () => {
    await store.dispatch(fetchAllProducts());
    store.dispatch(addFavoriteProduct(favProduct));
    expect(store.getState().products.favoriteProducts).toHaveLength(1);
  });
  //test for add favorite product repeatedly
  test("hould not add a product if it already exists in favorites", async () => {
    await store.dispatch(fetchAllProducts());
    store.dispatch(addFavoriteProduct(favProduct));
    expect(store.getState().products.favoriteProducts).toHaveLength(1);
    store.dispatch(addFavoriteProduct(favProduct));
    expect(store.getState().products.favoriteProducts).toHaveLength(1);
  });
  //test for remove favorite product
  test("should remove favorite product", async () => {
    await store.dispatch(fetchAllProducts());
    store.dispatch(addFavoriteProduct(favProduct));
    expect(store.getState().products.favoriteProducts).toHaveLength(1);
    store.dispatch(removeFavoriteProduct(1));
    expect(store.getState().products.favoriteProducts).toHaveLength(0);
  });
  //create new product
  test("should create a new product", async () => {
    const newProduct: NewProduct = {
      title: "Modern Wireless Bluetooth Headphones",
      price: 89,
      description:
        "Experience the ultimate freedom in audio with our Modern Wireless Bluetooth Headphones. Featuring advanced Bluetooth technology, these headphones provide crystal-clear sound quality and hassle-free connectivity. With a lightweight and ergonomic design, they offer long-lasting comfort for extended listening sessions. Whether you're commuting, working out, or relaxing at home, these headphones deliver an immersive audio experience.",
      categoryId: 5,
      images: [
        "https://i.imgur.com/AeQsKXD.jpg",
        "https://i.imgur.com/um7UIr1.jpg",
        "https://i.imgur.com/fz6XKSl.jpg",
      ],
    };
    await store.dispatch(createProduct(newProduct));
    expect(store.getState().products.products.length).toBe(1);
  });
  //test for fetching single product by id
  test("should fetch a single product by id", async () => {
    // Dispatch the action to fetch the product
    const dispatchedAction = await store.dispatch(fetchProductById(1));
    const expectedAction = {
      type: "fetchProductById/fulfilled",
      payload: {
        data: {
          id: 1,
          title: "Chic Transparent Fashion Handbag",
          price: 613,
          description:
            "Elevate your style with our Chic Transparent Fashion Handbag, perfect for showcasing your essentials with a clear, modern edge. This trendy accessory features durable acrylic construction, luxe gold-tone hardware, and an elegant chain strap. Its compact size ensures you can carry your day-to-day items with ease and sophistication.",
          images: [
            "https://i.imgur.com/Lqaqz59.jpg",
            "https://i.imgur.com/uSqWK0m.jpg",
            "https://i.imgur.com/atWACf1.jpg",
          ],
          creationAt: "2024-02-29T03:37:26.000Z",
          updatedAt: "2024-02-29T08:18:20.000Z",
          category: {
            id: 5,
            name: "Miscellaneous",
            image: "https://i.imgur.com/BG8J0Fj.jpg",
            creationAt: "2024-02-29T03:37:26.000Z",
            updatedAt: "2024-02-29T03:37:26.000Z",
          },
        },
        id: 1,
      },
      meta: {
        arg: 1,
        requestId: expect.any(String),
        requestStatus: "fulfilled",
      },
    };
    expect(dispatchedAction).toEqual(expectedAction);
    expect(store.getState().products.error).toBeNull();
    expect(store.getState().products.loading).toBeFalsy();
  });
  //test for updating product title
  test("should update a product", async () => {
    const updates = {
      id: 2,
      data: {
        title: "Stylish Notebook",
      },
    };
    const dispatchedAction = await store.dispatch(updateProduct(updates));
    const expectedAction = {
      type: "updateProduct/fulfilled",
      payload: {
        id: 2,
        title: "Stylish Notebook",
        price: 25,
        description:
          "Make a statement with our Stylish Marble Pattern Notebook, designed to inspire creativity and organization. This sleek notebook features high-quality paper with a luxurious marble print cover, perfect for jotting down thoughts, sketches, or keeping track of your busy schedule. Whether for work, school, or personal use, this notebook is a must-have accessory for any modern individual.",
        images: [
          "https://i.imgur.com/8qOr2G9.jpg",
          "https://i.imgur.com/rDRPb3T.jpg",
          "https://i.imgur.com/Ky15kXe.jpg",
        ],
        creationAt: "2024-02-29T03:37:26.000Z",
        updatedAt: "2024-02-29T08:18:20.000Z",
        category: {
          id: 5,
          name: "Miscellaneous",
          image: "https://i.imgur.com/7OcN6uW.jpg",
          creationAt: "2024-02-29T03:37:26.000Z",
          updatedAt: "2024-02-29T03:37:26.000Z",
        },
      },
      meta: {
        arg: { id: 2, data: { title: "Stylish Notebook" } },
        requestId: expect.any(String),
        requestStatus: "fulfilled",
      },
    };
    expect(dispatchedAction).toEqual(expectedAction);
    expect(store.getState().products.error).toBeNull();
    expect(store.getState().products.loading).toBeFalsy();
  });
  //test for delete product
  test("should delete product successfully", async () => {
    const dispatchedAction = await store.dispatch(deleteProduct(2));
    const expectedAction = {
      type: "deleteProduct/fulfilled",
      payload: true,
      meta: {
        arg: 2,
        requestId: expect.any(String),
        requestStatus: "fulfilled",
      },
    };
    expect(dispatchedAction).toEqual(expectedAction);
    await store.dispatch(deleteProduct(2));
    expect(store.getState().products.error).toBeNull();
    expect(store.getState().products.loading).toBeFalsy();
  });
});
