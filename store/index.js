import authReducer from "../store/auth/authSlice.js";
import userReducer from "../store/auth/userSlice.js";
import SilderReducer from "../store/silder/Silder.js";
import productReducer from "../store/product/productSlice";
import categoryReducer from "../store/category/categorySlice.js";
import orderReducer from '../store/order/orderSlice.js'
import filterReducer from '../store/product/filterSlice.js'

import orderfilterReducer from '../store/order/orderfilterSlice.js'


import cartReducer from "../store/cart/cartSlice.js"
import companyReducer from "../store/company/companySlice.js"

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  //  blacklist: ['product','filter',]
  whitelist: ["cart", "auth"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  user: userReducer,
  silder: SilderReducer,
  product: productReducer,
  category:categoryReducer,
  order:orderReducer,
  company:companyReducer,
  filter:filterReducer,
  orderfilter:orderfilterReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
