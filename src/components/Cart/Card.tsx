import type { ProductBag } from "@/slices/bagSlice";
import { convertToReal } from "../HeaderTop";
import { useAppDispatch } from "@/app/hooks";
import {
  removeProduct,
  asyncAmountIncrement,
  asyncAmountDecrement,
} from "@/slices/bagSlice";
import { useState } from "react";

interface Props extends ProductBag {}

export default function CartCard({
  id,
  brand,
  photo,
  name,
  price,
  amount,
}: Props) {
  const dispatch = useAppDispatch();
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="relative flex">
      <div className="absolute z-10 -top-3 -right-3">
        <button
          className="custom-transition flex-none w-6 h-6 bg-black/70 hover:bg-red-500 flex justify-center rounded-full"
          type="button"
          onClick={(e) => setConfirm(true)}
        >
          <i className="custom-transition text-white bi bi-x text-sm self-center"></i>
        </button>
        {confirm && (
          <div className="absolute bg-red-100 border border-red-600 rounded-md top-0 right-0 w-36 flex flex-col font-light text-sm overflow-hidden">
            <div className="p-2 text-center font-bold">Tem certeza?</div>
            <div className="flex">
              <button
                className="flex-1 text-center"
                type="button"
                onClick={(e) => setConfirm(false)}
              >
                Não
              </button>
              <button
                className="flex-1 bg-red-300/40 rounded-tl-md text-red-600 text-center"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(removeProduct(id));
                  setConfirm(false);
                }}
              >
                Sim
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        className="flex-none w-24 h-16 bg-no-repeat bg-contain bg-center"
        style={{ backgroundImage: `url(${photo})` }}
      ></div>
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="font-light text-sm">{brand}</div>
            <div className="font-light text-sm">-</div>
            <div className="font-bold text-sm">{name}</div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 flex justify-center items-center">
              <div className="flex border border-slate-300 rounded-md overflow-hidden">
                <div className="flex-none">
                  <button
                    disabled={Number(amount) < 2}
                    className="relative w-8 h-8 hover:after:hidden after:absolute after:top-[20%] after:content-[''] after:block after:w-full after:h-[60%] after:border-r after:border-slate-300 bg-transparent disabled:hover:bg-transparent hover:bg-yellow-500 transition ease-in-out delay-75 duration-300"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(asyncAmountDecrement(id));
                    }}
                  >
                    <i className="self-center bi bi-dash"></i>
                  </button>
                </div>
                <div className="flex-1 flex justify-center min-w-[44px]">
                  <span className="self-center">{amount}</span>
                </div>
                <div className="flex-none">
                  <button
                    className="relative w-8 h-8 hover:after:hidden after:absolute after:top-[20%] after:content-[''] after:block after:w-full after:h-[60%] after:border-l after:border-slate-300 bg-transparent hover:bg-yellow-500 transition ease-in-out delay-75 duration-300"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(asyncAmountIncrement(id));
                    }}
                  >
                    <i className="self-center bi bi-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            {Number(amount) > 1 && (
              <div className="flex-1 flex flex-col self-center">
                <div className="text-sm font-light flex justify-center items-center">
                  {amount}x: {convertToReal(Number(price) / Number(amount))}
                </div>
                <div className="text-sm font-bold flex justify-center items-center">
                  Total: {convertToReal(price)}
                </div>
              </div>
            )}
            {Number(amount) === 1 && (
              <div className="flex-1 self-center">
                <div className="text-sm font-bold flex justify-center items-center">
                  {convertToReal(price)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
