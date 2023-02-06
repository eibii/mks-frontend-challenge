import type { Product } from "@/slices/productSlice";
import { convertToReal } from "../HeaderTop";
import { asyncAddProduct } from "@/slices/bagSlice";
import { useAppDispatch } from "@/app/hooks";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div data-testid="product-card" className="flex flex-col gap-2 h-full">
      <div className="flex-none p-4">
        <img
          className="rounded-lg"
          src={product.photo}
          alt="image do produto"
        />
      </div>
      <div className="flex-none flex gap-2 px-4">
        <div className="flex-1 flex flex-col">
          <div className="font-semibold text-sm">{product.brand}</div>
          <div className="font-black text-sm">{product.name}</div>
        </div>
        <div className="flex-none">
          <div
            data-testid="product-price"
            className="bg-slate-800 rounded-md text-white px-2 py-1"
          >
            {convertToReal(product.price)}
          </div>
        </div>
      </div>
      <div className="flex-1 self-stretch text-sm font-light px-4">
        {product.description}
      </div>
      <button
        className="custom-transition flex-none w-full bg-primary hover:bg-primary/90 text-white flex justify-center py-2"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          dispatch(asyncAddProduct(product));
        }}
      >
        <div className="flex gap-2">
          <i className="bi bi-bag-plus"></i>
          <span className="uppercase">Comprar</span>
        </div>
      </button>
    </div>
  );
}
