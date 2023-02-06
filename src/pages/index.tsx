import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Product, asyncGetAll, PayloadGetAll } from "@/slices/productSlice";
import ProductListing from "@/components/Product/Listing";
import ProductListingSkeleton from "@/components/Product/ListingSkeleton";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const [skeleton, setSkeleton] = useState(true);
  const confProduct: PayloadGetAll = {
    page: 1,
    rows: 10,
    sortBy: "name",
    orderBy: "DESC",
    activeLoading: (active: boolean) => {
      setSkeleton(active);
    },
  };

  useEffect(() => {
    dispatch(asyncGetAll(confProduct));
  }, []);

  const products: Product[] = useAppSelector((state) => state.product.list);
  return (
    <div className="py-10 h-full">
      {skeleton && <ProductListingSkeleton />}
      {!skeleton && <ProductListing data={products} />}
    </div>
  );
}
