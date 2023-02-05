import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./productSlice";
import { filter, sumBy, findIndex } from "lodash";
import { AppThunk } from "@/store";

export interface ProductBag extends Product {
  amount: number;
}

interface BagState {
  products: ProductBag[];
  amount: number;
  total: number;
}

const initialState: BagState = {
  products: [],
  amount: 0,
  total: 0,
};

function setLocalStorage(state: BagState) {
  localStorage.removeItem("CART");
  localStorage.setItem(
    "CART",
    JSON.stringify({
      products: state.products,
      total: state.total,
      amount: state.amount,
    })
  );
}

const bag = createSlice({
  name: "bag",
  initialState,
  reducers: {
    addProduct(state, { payload }: PayloadAction<ProductBag>) {
      state.products.push(payload);
      state.total = sumBy(state.products, (o) => Number(o.price));
      state.amount = sumBy(state.products, (o) => Number(o.amount));
      setLocalStorage(state);
    },
    changeProduct(
      state,
      {
        payload: { product, key },
      }: PayloadAction<{ product: ProductBag; key: number }>
    ) {
      state.products[key] = product;
      state.total = sumBy(state.products, (o) => Number(o.price));
      state.amount = sumBy(state.products, (o) => Number(o.amount));
      setLocalStorage(state);
    },
    amountIncrement(
      state,
      { payload: { id, price } }: PayloadAction<{ id: number; price: number }>
    ) {
      const key = findIndex(state.products, (o) => o.id === id);
      if (key >= 0) {
        state.products[key].amount++;
        state.products[key].price =
          Number(state.products[key].amount) * Number(price);
        state.total = sumBy(state.products, (o) => Number(o.price));
        state.amount = sumBy(state.products, (o) => Number(o.amount));
        setLocalStorage(state);
      }
    },
    amountDecrement(
      state,
      { payload: { id, price } }: PayloadAction<{ id: number; price: number }>
    ) {
      const key = findIndex(state.products, (o) => o.id === id);
      if (key >= 0) {
        state.products[key].amount--;
        state.products[key].price =
          Number(state.products[key].amount) * Number(price);
        state.total = sumBy(state.products, (o) => Number(o.price));
        state.amount = sumBy(state.products, (o) => Number(o.amount));
        setLocalStorage(state);
      }
    },
    removeProduct(state, { payload }: PayloadAction<number>) {
      state.products = filter(state.products, (o) => o.id !== payload);
      state.total = sumBy(state.products, (o) => Number(o.price));
      state.amount = sumBy(state.products, (o) => Number(o.amount));
      setLocalStorage(state);
    },
    restoreCart(
      state,
      {
        payload: { products, total, amount },
      }: PayloadAction<{
        products: ProductBag[];
        total: number;
        amount: number;
      }>
    ) {
      state.products = products;
      state.total = total;
      state.amount = amount;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  changeProduct,
  amountIncrement,
  amountDecrement,
  restoreCart,
} = bag.actions;
export default bag.reducer;

export function asyncAddProduct(product: Product): AppThunk {
  return async function (dispatch, getState) {
    try {
      const duplicates = await filter(
        getState().bag.products,
        (o) => o.id === product.id
      );
      if (duplicates.length) {
        const price = Number(duplicates[0].price) + Number(product.price);
        const amount = Number(duplicates[0].amount) + 1;
        const key = await findIndex(
          getState().bag.products,
          (o) => o.id === product.id
        );
        dispatch(
          changeProduct({
            product: { ...product, price, amount },
            key,
          })
        );
      } else {
        dispatch(addProduct({ ...product, amount: 1 }));
      }
    } catch (error) {}
  };
}
export function asyncAmountIncrement(id: number): AppThunk {
  return async function (dispatch, getState) {
    try {
      const products = getState().product.list;
      const [product] = await filter(products, (o) => o.id === id);
      if (product) {
        dispatch(amountIncrement({ id, price: product.price }));
      }
    } catch (error) {}
  };
}
export function asyncAmountDecrement(id: number): AppThunk {
  return async function (dispatch, getState) {
    try {
      const products = getState().product.list;
      const [product] = await filter(products, (o) => o.id === id);
      if (product) {
        dispatch(amountDecrement({ id, price: product.price }));
      }
    } catch (error) {}
  };
}
