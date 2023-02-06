import { map, times, noop } from "lodash";
export default function ProductListingSkeleton() {
  return (
    <div
      data-testid="product-listing-skeleton"
      className="grid grid-cols-4 gap-8"
    >
      {map(times(4, noop), (v, i) => {
        return (
          <div
            className="col-span-4 sm:col-span-2 lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden"
            key={i}
          >
            <div className="animate-pulse flex flex-col gap-2 h-full">
              <div className="flex-none p-4">
                <div className=" bg-slate-400 h-40 w-full rounded-lg"></div>
              </div>
              <div className="flex-none flex gap-2 px-4">
                <div className="flex-1 flex flex-col gap-2">
                  <div className="bg-slate-400 rounded h-2 w-full"></div>
                  <div className="bg-slate-400 rounded h-2 w-full"></div>
                </div>
                <div className="flex-none w-24">
                  <div className="bg-slate-400 h-8 w-full rounded-md px-2 py-1"></div>
                </div>
              </div>
              <div className="flex-1 self-stretch px-4 flex flex-col gap-2">
                <div className="bg-slate-400 rounded h-2 w-full"></div>
                <div className="bg-slate-400 rounded h-2 w-full"></div>
                <div className="bg-slate-400 rounded h-2 w-full"></div>
              </div>
              <div className="flex-none w-full bg-slate-400 py-5"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
