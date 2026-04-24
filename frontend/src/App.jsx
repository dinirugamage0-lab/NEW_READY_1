import { useState, useEffect } from "react";
import { getItems, createItem, updateItem, deleteItem } from "./api";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import "./App.css";

function App() {
  // Global state to store the list of items from the backend
  const [items, setItems] = useState([]);
  
  // State to track which item is currently being edited (null = not editing)
  const [editingItem, setEditingItem] = useState(null);

  // Fetch all items when the component first loads (mount)
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to get items from the backend and update state
  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Logic to handle both Adding and Updating
  const handleSubmit = async (itemData) => {
    try {
      if (editingItem) {
        // If we have an editingItem, we update it
        await updateItem(editingItem._id, itemData);
        setEditingItem(null); // Exit edit mode
      } else {
        // Otherwise, we create a new one
        await createItem(itemData);
      }
      fetchItems(); // Refresh the list after any change
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  // Set the selected item into the form for editing
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  // Cancel edit mode and clear the form
  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  // Delete an item and refresh the list
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div className="app">
      <h1>Item Manager</h1>

      <ItemForm
        onSubmit={handleSubmit}
        editingItem={editingItem}
        onCancelEdit={handleCancelEdit}
      />

      <ItemList
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
