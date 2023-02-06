import { useAppSelector } from "@/app/hooks";

interface Props {
  onActiveSidebar: Function;
}

export function convertToReal(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function HeaderTop({ onActiveSidebar }: Props) {
  const amount = useAppSelector((state) => state.bag.amount);
  const total = useAppSelector((state) => state.bag.total);

  return (
    <header data-testid="header-top" className="bg-primary py-4">
      <div className="custom-container flex">
        <div className="flex-1 flex items-center ">
          <div className="flex font-Montserrat text-white gap-1">
            <span className="font-bold text-4xl">
              {process.env.appName?.split(" ")[0]}
            </span>
            <span className="font-normal text-lg self-end">
              {process.env.appName?.split(" ")[1]}
            </span>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            className="bg-white px-5 py-1 rounded-lg shadow-lg text-lg flex gap-3"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onActiveSidebar();
            }}
          >
            <div className="self-center flex flex-col gap-0">
              <i className="bi bi-basket2 self-center"></i>
              <div className="leading-3 text-xs self-center">Total:</div>
            </div>
            <div className="self-center flex flex-col gap-0">
              <div data-testid="value-amount">{amount}</div>
              <div
                data-testid="value-total"
                className="leading-3 text-xs self-center"
              >
                {convertToReal(total)}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
