import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterOrders: [],
};

const orderfilterSlice = createSlice({
  name: "orderfilter",
  initialState,
  reducers: {
    FILTER_ORDERS(state, action) {
      const { searchorders, search } = action.payload;

      const tempOrders = searchorders.filter(
        (order) =>
          order.user.name.toLowerCase().includes(search.toLowerCase()) ||         
          order._id.toLowerCase().includes(search.toLowerCase())  ||
          order.deliverycompany.toLowerCase().includes(search.toLowerCase()) ||
          order.status.toLowerCase().includes(search.toLowerCase()) 
      );
      state.filterOrders = tempOrders;

    },
  },
});
export const { FILTER_ORDERS } = orderfilterSlice.actions;
export const selectOrderfilter = (state) => state.orderfilter.filterOrders;
export default orderfilterSlice.reducer;
