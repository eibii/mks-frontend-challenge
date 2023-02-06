import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/services/api";
import type { AppThunk } from "@/store";

export interface Product {
  id: number;
  name: string;
  photo: string;
  brand: string;
  description: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PayloadGetAll {
  page: number;
  rows: number;
  sortBy: string;
  orderBy: string;
  activeLoading?: Function;
}

interface ProductState {
  list: Product[];
}

const initialState: ProductState = {
  list: [],
};

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    setList(state, { payload }: PayloadAction<Product[]>) {
      state.list = payload;
    },
  },
});

export const { setList } = product.actions;

export default product.reducer;

export function asyncGetAll({
  page,
  rows,
  sortBy,
  orderBy,
  activeLoading: loading = () => {},
}: PayloadGetAll): AppThunk {
  return async function (dispatch) {
    try {
      loading(true);
      const params = new URLSearchParams();
      params.append("page", `${page}`);
      params.append("rows", `${rows}`);
      params.append("sortBy", sortBy);
      params.append("orderBy", orderBy);
      await axios
        .get("/products", { params })
        .then((res) => {
          let data = [];
          if (res.status === 200) {
            const { products } = res.data;
            data = products;
          }
          dispatch(setList(data));
          loading(true);
        })
        .finally(() => {
          loading(false);
        });
    } catch (error) {}
  };
}
