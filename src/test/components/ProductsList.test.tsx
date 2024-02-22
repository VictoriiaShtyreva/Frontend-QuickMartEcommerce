import { getByText, render } from "@testing-library/react";

import ProductList from "../../components/products/ProductList";
import { mockProducts, productServer } from "../shared/productServer";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { PropsWithChildren } from "react";

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

const wrapper = ({ children }: PropsWithChildren) => (
  <Provider store={store}>{children}</Provider>
);

describe("test ProductList component", () => {
  test("should render all Product Card from the api", async () => {
    //Render the ProductList component with the mocked Redux store
    const { container } = render(
      <ProductList
        selectedCategory="all"
        pagination={{ page: 1, limit: 10 }}
      />,
      { wrapper: wrapper }
    );
    //Get the container element that holds the ProductCard components
    const productListContainer =
      container.getElementsByClassName("MuiGrid-container")[0];
    // Assert that the container element exists
    expect(productListContainer).toBeInTheDocument();
  });
});
