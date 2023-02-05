import { map } from "lodash";
import { useAppSelector } from "@/app/hooks";
import type { ProductBag } from "@/slices/bagSlice";
import CartCard from "../Cart/Card";
import { convertToReal } from "../HeaderTop";

interface Props {
  show: boolean;
  onCloseSidebar: Function;
}

export default function CartSidebar({ show, onCloseSidebar }: Props) {
  const products: ProductBag[] = useAppSelector((state) => state.bag.products);
  const total: number = useAppSelector((state) => state.bag.total);
  return (
    <>
      {show && (
        <>
          <div
            className="absolute z-50 w-full h-full"
            onClick={(e) => {
              e.preventDefault();
              onCloseSidebar();
            }}
          ></div>
          <div className="fixed z-50 top-0 right-0 w-full lg:w-2/6 bg-primary h-full shadow-2xl flex flex-col overflow-y-auto">
            <div className="flex-1 flex flex-col p-6">
              <div className="flex-none flex">
                <div className="flex-1 text-white text-2xl">
                  Carrinho de compras
                </div>
                <button
                  className="custom-transition flex-none w-8 h-8 bg-black hover:bg-white flex justify-center rounded-full group"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onCloseSidebar();
                  }}
                >
                  <i className="custom-transition text-white group-hover:text-black bi bi-x text-2xl self-center"></i>
                </button>
              </div>
              {products.length > 0 && (
                <div className="flex-1 flex flex-col gap-4 py-8">
                  {map(products, (product: ProductBag, i: number) => {
                    return (
                      <div className=" bg-white p-1 rounded-lg" key={i}>
                        <CartCard {...product} />
                      </div>
                    );
                  })}
                </div>
              )}
              {!products.length && (
                <div className="flex-1 flex justify-center h-full">
                  <i className="bi bi-bag-x self-center text-8xl opacity-30"></i>
                </div>
              )}
            </div>
            <div className="flex-none flex justify-between gap-2 text-white text-xl p-6">
              <div>Total:</div>
              <div>{convertToReal(total)}</div>
            </div>
            <button
              className="custom-transition flex-none w-full bg-black hover:bg-lime-600 disabled:hover:bg-black disabled:cursor-not-allowed text-white  flex justify-center py-4"
              type="button"
              disabled={!products.length}
            >
              <div className="flex gap-2 text-xl">
                <i className="bi bi-bag-check-fill"></i>
                <span>Finalizar Compra</span>
              </div>
            </button>
          </div>
        </>
      )}
    </>
  );
}
