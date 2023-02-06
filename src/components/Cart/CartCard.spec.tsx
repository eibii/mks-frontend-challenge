import type { ProductBag } from "@/slices/bagSlice";
import { convertToReal } from "../HeaderTop";
import { screen, render, fireEvent } from "@testing-library/react";
import store from "@/store";
import { Provider } from "react-redux";
import CartCard from "./Card";

const product: ProductBag = {
  id: 3,
  name: "Macbook Air",
  brand: "Apple",
  description:
    "Processador intel Core i5 de dois núcleos e 1,8 GHz (Turbo Boost de até 2,9 GHz) com cache L3 compartilhado de 3 MB.",
  photo:
    "https://mks-sistemas.nyc3.digitaloceanspaces.com/products/macbookair.webp",
  price: 8200.0,
  amount: 1,
};

const renderComponent = () => {
  render(
    <Provider store={store}>
      <CartCard product={product} />
    </Provider>
  );
};

describe("<ProductCard/>", () => {
  it("dev renderizar o componente Card", () => {
    renderComponent();
    expect(screen.getByTestId("cart-card")).toBeInTheDocument();
  });

  it("dev conter a props.product", async () => {
    renderComponent();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    expect(screen.getByTestId("image")).toHaveStyle({
      backgroundImage: product.photo,
    });
    const price = await convertToReal(product.price);
    expect(screen.getByTestId("product-price")).toHaveTextContent(
      new RegExp(`[${price.replace("$", "\\$")}]+`, "i")
    );
    expect(screen.getByText(product.amount)).toBeInTheDocument();
  });

  it("dev ser desabilitando quando o amount for 1", async () => {
    renderComponent();
    const button = screen.getByTestId("button-rm");
    await fireEvent.click(button);
    expect(button).toHaveProperty("type", "button");
    expect(button).toHaveProperty("disabled", true);
    expect(screen.getByTestId("amount").textContent).toBe("1");
  });

  it("dev conter o botão de incrementar a quantidade do produto", async () => {
    renderComponent();
    const button = screen.getByTestId("button-add");
    await fireEvent.click(button);
    expect(button).toHaveProperty("type", "button");
  });
  it("dev conter o botão de remover o produto, após o popup", async () => {
    renderComponent();
    const buttonPopUp = screen.getByTestId("button-popup");
    await fireEvent.click(buttonPopUp);
    expect(screen.getByTestId("popup").textContent).toBe("Tem certeza?");
    const button = screen.getByTestId("button-remove");
    await fireEvent.click(button);
    expect(button).toHaveProperty("type", "button");
  });
  it("dev conter o botão de cancelar o produto, após o popup", async () => {
    renderComponent();
    const buttonPopUp = screen.getByTestId("button-popup");
    await fireEvent.click(buttonPopUp);
    expect(screen.getByTestId("popup").textContent).toBe("Tem certeza?");
    const button = screen.getByTestId("button-cancel");
    await fireEvent.click(button);
    expect(button).toHaveProperty("type", "button");
  });
});
