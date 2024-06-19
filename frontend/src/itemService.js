const API_URL = "http://localhost:3001/items";

export const fetchItems = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  return response.json();
};

export const createItem = async (item) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    const data = response.json();
    console.log(data);
    throw new Error("Failed to create item");
  }
  return response.json();
};

export const updateItem = async (id, item) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error("Failed to update item");
  }
  return response.json();
};

export const deleteItem = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete item");
  }
};
