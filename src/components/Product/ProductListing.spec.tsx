import type { Product } from "@/slices/productSlice";
import { convertToReal } from "../HeaderTop";
import { screen, render } from "@testing-library/react";
import store from "@/store";
import { Provider } from "react-redux";
import ProductListing from "./Listing";

const products: Product[] = [
  {
    id: 3,
    name: "Macbook Air",
    brand: "Apple",
    description:
      "Processador intel Core i5 de dois núcleos e 1,8 GHz (Turbo Boost de até 2,9 GHz) com cache L3 compartilhado de 3 MB.",
    photo:
      "https://mks-sistemas.nyc3.digitaloceanspaces.com/products/macbookair.webp",
    price: 8200.0,
  },
];

const renderComponent = () => {
  render(
    <Provider store={store}>
      <ProductListing data={products} />
    </Provider>
  );
};

describe("<ProductListing/>", () => {
  it("dev renderizar o componente Listing", () => {
    renderComponent();
    expect(screen.getByTestId("product-card")).toBeInTheDocument();
  });

  it("dev conter a props.product", async () => {
    renderComponent();
    expect(screen.getByText(products[0].name)).toBeInTheDocument();
    expect(screen.getByText(products[0].brand)).toBeInTheDocument();
    expect(screen.getByText(products[0].description)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveProperty("src", products[0].photo);
    const price = await convertToReal(products[0].price);
    expect(screen.getByTestId("product-price")).toHaveTextContent(
      new RegExp(`[${price.replace("$", "\\$")}]+`, "i")
    );
  });
});
