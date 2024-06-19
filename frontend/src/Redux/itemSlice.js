import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get("http://localhost:3000/items");
  return response.data;
});

export const createItem = createAsyncThunk("items/createItem", async (item) => {
  const response = await axios.post("http://localhost:3000/items", item);
  return response.data;
});

export const updateItem = createAsyncThunk("items/updateItem", async (item) => {
  const response = await axios.put(
    `http://localhost:3000/items/${item.id}`,
    item
  );
  return response.data;
});

export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
  await axios.delete(`http://localhost:3000/items/${id}`);
  return id;
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default itemsSlice.reducer;
