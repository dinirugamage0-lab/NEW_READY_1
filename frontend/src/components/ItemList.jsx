const ItemList = ({ items, onEdit, onDelete }) => {
  // If no items exist, show a friendly message
  if (items.length === 0) {
    return <p className="no-items">No items found. Add one above!</p>;
  }

  return (
    <div className="item-list">
      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the items array to create table rows dynamically */}
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              {/* .toFixed(2) ensures prices always show 2 decimal places */}
              <td>${item.price}</td>
              <td>{item.category}</td>
              <td>${item.totalPrice}</td>
              <td className="action-buttons">
                <button onClick={() => onEdit(item)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => onDelete(item._id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
