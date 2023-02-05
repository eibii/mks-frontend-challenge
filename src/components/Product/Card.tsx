import type { Product } from "@/slices/productSlice";
import { convertToReal } from "../HeaderTop";
import { asyncAddProduct } from "@/slices/bagSlice";
import { useAppDispatch } from "@/app/hooks";
import { MouseEventHandler } from "react";

interface Props extends Product {}

export default function ProductCard(props: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex-none p-4">
        <img className="rounded-lg" src={props.photo} alt="image do produto" />
      </div>
      <div className="flex-none flex gap-2 px-4">
        <div className="flex-1 flex flex-col">
          <div className="font-semibold text-sm">{props.brand}</div>
          <div className="font-black text-sm">{props.name}</div>
        </div>
        <div className="flex-none">
          <div className="bg-slate-800 rounded-md text-white px-2 py-1">
            {convertToReal(props.price)}
          </div>
        </div>
      </div>
      <div className="flex-1 self-stretch text-sm font-light px-4">
        {props.description}
      </div>
      <button
        className="custom-transition flex-none w-full bg-primary hover:bg-primary/90 text-white flex justify-center py-2"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          dispatch(asyncAddProduct(props));
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
