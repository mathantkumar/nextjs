import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ItemList from "./com/itemList";
import ItemForm from "./com/itemForm";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Item Manager</h1>
        <ItemForm />
        <ItemList />
      </div>
    </Provider>
  );
}

export default App;
