import { screen, render, fireEvent } from "@testing-library/react";
import store from "@/store";
import { Provider } from "react-redux";
import HeaderTop from "./HeaderTop";
import { convertToReal } from "./HeaderTop";

const onActiveSidebar = jest.fn();
process.env.appName = "MKS Sistemas";

const renderComponent = () => {
  render(
    <Provider store={store}>
      <HeaderTop onActiveSidebar={onActiveSidebar} />
    </Provider>
  );
};

describe("<HeaderTop/>", () => {
  it("dev renderizar o componente HeaderTop", () => {
    renderComponent();
    expect(screen.getByTestId("header-top")).toBeInTheDocument();
  });

  it("dev conter o texto da variável de ambiente appName", () => {
    renderComponent();
    expect(
      screen.getByText(`${process.env.appName?.split(" ")[0]}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${process.env.appName?.split(" ")[1]}`)
    ).toBeInTheDocument();
  });

  it("dev conter os valores amount e total", async () => {
    renderComponent();
    expect(screen.getByTestId("value-amount")).toHaveTextContent("0");
    const total = await convertToReal(0);
    expect(screen.getByTestId("value-total")).toHaveTextContent(
      new RegExp(`[${total.replace("$", "\\$")}]+`, "i")
    );
  });

  it("dev conter a props.onActiveSidebar(), para disparar a ação de abrir a sidebar da sacola", async () => {
    renderComponent();
    const button = screen.getByRole("button");
    await fireEvent.click(button);
    expect(button).toHaveProperty("type", "button");
    expect(onActiveSidebar).toHaveBeenCalledTimes(1);
  });
});
