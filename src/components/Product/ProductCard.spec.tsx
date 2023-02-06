import type { Product } from "@/slices/productSlice";
import { convertToReal } from "../HeaderTop";
import { screen, render, fireEvent } from "@testing-library/react";
import store from "@/store";
import { Provider } from "react-redux";
import ProductCard from "./Card";

const product: Product = {
  id: 3,
  name: "Macbook Air",
  brand: "Apple",
  description:
    "Processador intel Core i5 de dois núcleos e 1,8 GHz (Turbo Boost de até 2,9 GHz) com cache L3 compartilhado de 3 MB.",
  photo:
    "https://mks-sistemas.nyc3.digitaloceanspaces.com/products/macbookair.webp",
  price: 8200.0,
};

const renderComponent = () => {
  render(
    <Provider store={store}>
      <ProductCard product={product} />
    </Provider>
  );
};

describe("<ProductCard/>", () => {
  it("dev renderizar o componente Card", () => {
    renderComponent();
    expect(screen.getByTestId("product-card")).toBeInTheDocument();
  });

  it("dev conter a props.product", async () => {
    renderComponent();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveProperty("src", product.photo);
    const price = await convertToReal(product.price);
    expect(screen.getByTestId("product-price")).toHaveTextContent(
      new RegExp(`[${price.replace("$", "\\$")}]+`, "i")
    );
  });

  it("dev conter a ação de adicionar o produto na sacola", async () => {
    renderComponent();
    const button = screen.getByRole("button");
    await fireEvent.click(button);
    expect(button).toHaveProperty("type", "button");
  });
});
