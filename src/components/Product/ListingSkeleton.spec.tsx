import { screen, render } from "@testing-library/react";
import ProductListingSkeleton from "./ListingSkeleton";

const renderComponent = () => {
  render(<ProductListingSkeleton />);
};

describe("<ProductCard/>", () => {
  it("dev renderizar o componente ListingSkeleton", () => {
    renderComponent();
    expect(screen.getByTestId("product-listing-skeleton")).toBeInTheDocument();
  });
});
