import axios from "axios";

// This is the BASE URL of your backend.
// In the lab, you might need to update this after deployment.
const API_URL = "https://newready1-production.up.railway.app/api/items";
// GET all items from the database
export const getItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// POST a new item to the database
export const createItem = async (itemData) => {
  const response = await axios.post(API_URL, itemData);
  return response.data;
};

// PUT (Update) an existing item by its unique ID
export const updateItem = async (id, itemData) => {
  const response = await axios.put(`${API_URL}/${id}`, itemData);
  return response.data;
};

// DELETE an item by its unique ID
export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
