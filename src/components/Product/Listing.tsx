import { map } from "lodash";
import type { Product } from "@/slices/productSlice";
import ProductCard from "./Card";

interface Props {
  data: Product[];
}

export default function ProductListing({ data }: Props) {
  return (
    <div className="grid grid-cols-4 gap-8">
      {map(
        data,
        (
          { id, name, photo, brand, description, price }: Product,
          i: number
        ) => {
          return (
            <div
              className="col-span-4 sm:col-span-2 lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden"
              key={i}
            >
              <ProductCard
                id={id}
                name={name}
                photo={photo}
                brand={brand}
                description={description}
                price={price}
              />
            </div>
          );
        }
      )}
    </div>
  );
}
