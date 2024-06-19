import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems, deleteItem } from "../Redux/itemSlice";

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const status = useSelector((state) => state.items.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <h2>Items</h2>
      {status === "loading" && <div>Loading...</div>}
      {status === "succeeded" && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.description}
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {status === "failed" && <div>Error loading items</div>}
    </div>
  );
};

export default ItemList;
