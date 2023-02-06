import { screen, render } from "@testing-library/react";
import Footer from "./Footer";

process.env.appName = "MKS Sistemas";

const renderComponent = () => {
  render(<Footer />);
};

describe("<Footer/>", () => {
  it("dev renderizar o componente Footer", () => {
    renderComponent();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("dev conter o texto da variável de ambiente appName", () => {
    renderComponent();
    expect(
      screen.getByText(new RegExp(`[${process.env.appName}]+`, "i"))
    ).toBeInTheDocument();
  });
});
