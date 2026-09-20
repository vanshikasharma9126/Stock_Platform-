import React, { useEffect, useState } from "react";
import axios from "axios";
import { watchlist } from "../data/data";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const [selectedStock, setSelectedStock] = useState(watchlist[0].name);
  const [orderMode, setOrderMode] = useState("BUY");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(watchlist[0].price);

  const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://stock-platform-4u7q.onrender.com/allOrders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders(response.data);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStockChange = (event) => {
    const stockName = event.target.value;
    setSelectedStock(stockName);

    const stock = watchlist.find((item) => item.name === stockName);

    if (stock) {
      setPrice(stock.price);
    }
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!quantity || Number(quantity) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (!price || Number(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

const response = await fetch("https://stock-platform-4u7q.onrender.com/newOrder", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: selectedStock,
    qty: Number(quantity),
    price: Number(price),
    mode: orderMode,
  }),
});

      if (!response.ok) {
        throw new Error("Order placement failed");
      }

      setShowOrderForm(false);
      setQuantity(1);

      await fetchOrders();

      alert(`${orderMode} order placed successfully!`);
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Unable to place order. Please try again.");
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div>
          <h2>Orders</h2>
          <p>View and manage your orders</p>
        </div>

        <button
          className="place-order-btn"
          onClick={() => setShowOrderForm(true)}
        >
          + Place New Order
        </button>
      </div>

      {showOrderForm && (
        <div className="order-form-container">
          <div className="order-form-header">
            <h3>Place New Order</h3>

            <button
              className="close-order-form"
              onClick={() => setShowOrderForm(false)}
            >
              ×
            </button>
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div className="form-row">
              <label>Stock</label>

              <select
                value={selectedStock}
                onChange={handleStockChange}
              >
                {watchlist.map((stock) => (
                  <option key={stock.name} value={stock.name}>
                    {stock.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label>Order Type</label>

              <div className="order-type-buttons">
                <button
                  type="button"
                  className={orderMode === "BUY" ? "active-buy" : ""}
                  onClick={() => setOrderMode("BUY")}
                >
                  BUY
                </button>

                <button
                  type="button"
                  className={orderMode === "SELL" ? "active-sell" : ""}
                  onClick={() => setOrderMode("SELL")}
                >
                  SELL
                </button>
              </div>
            </div>

            <div className="form-row">
              <label>Quantity</label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </div>

            <div className="form-row">
              <label>Price</label>

              <input
                type="number"
                min="0"
                step="0.05"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <div className="order-form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowOrderForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={
                  orderMode === "BUY"
                    ? "confirm-buy-btn"
                    : "confirm-sell-btn"
                }
              >
                Place {orderMode} Order
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="orders-table-container">
        {orders.length === 0 ? (
          <div className="empty-orders">
            <h3>No orders yet</h3>
            <p>Your placed orders will appear here.</p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="stock-name">{order.name}</td>

                  <td>
                    <span
                      className={
                        order.mode === "BUY"
                          ? "order-buy"
                          : "order-sell"
                      }
                    >
                      {order.mode}
                    </span>
                  </td>

                  <td>{order.qty}</td>

                  <td>₹{Number(order.price).toFixed(2)}</td>

                  <td>
                    ₹
                    {(
                      Number(order.qty) * Number(order.price)
                    ).toFixed(2)}
                  </td>

                  <td>
                    <span className="status-complete">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;