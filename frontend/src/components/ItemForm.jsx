import { useState, useEffect } from "react";

const ItemForm = ({ onSubmit, editingItem, onCancelEdit }) => {
  // Local state for each form field
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // This Effect runs whenever 'editingItem' changes.
  // If we clicked "Edit" on an item, populate the form with its values.
  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDescription(editingItem.description);
      setQuantity(editingItem.quantity);
      setPrice(editingItem.price);
      setCategory(editingItem.category);
    } else {
      // Otherwise, clear the form (Reset to Add mode)
      setName("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setCategory("");
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Create an object with the current form data
    const itemData = { name, description, quantity, price, category };
    
    // Call the parent component's submit function (passed via props)
    onSubmit(itemData);

    // Clear form after successful submit
    setName("");
    setDescription("");
    setQuantity("");
    setPrice("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <h2>{editingItem ? "Edit Item" : "Add New Item"}</h2>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Food">Food</option>
          <option value="Books">Books</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-buttons">
        <button type="submit">
          {editingItem ? "Update Item" : "Add Item"}
        </button>
        {editingItem && (
          <button type="button" onClick={onCancelEdit} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ItemForm;
