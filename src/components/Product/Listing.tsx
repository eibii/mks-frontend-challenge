import { map } from "lodash";
import type { Product } from "@/slices/productSlice";
import ProductCard from "./Card";

interface Props {
  data: Product[];
}

export default function ProductListing({ data }: Props) {
  return (
    <>
      {data.length > 0 && (
        <div data-testid="product-listing" className="grid grid-cols-4 gap-8">
          {map(data, (product: Product, i: number) => {
            return (
              <div
                className="col-span-4 sm:col-span-2 lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden"
                key={i}
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      )}
      {data.length === 0 && (
        <div
          data-testid="product-listing"
          className="h-full flex justify-center items-center"
        >
          <div className="flex flex-col gap-4 text-slate-400">
            <div className="flex justify-center">
              <i className="bi bi-emoji-frown text-6xl"></i>
            </div>
            <div className="text-xl">Nenhum produto diponível no momento</div>
          </div>
        </div>
      )}
    </>
  );
}
