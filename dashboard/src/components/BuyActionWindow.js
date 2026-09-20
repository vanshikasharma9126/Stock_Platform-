import React, { useContext, useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode }) => {
  // Find the selected stock from the watchlist
  const selectedStock = watchlist.find(
    (stock) => stock.name === uid
  );

  // Use the stock's current price automatically
  const defaultPrice = selectedStock
    ? selectedStock.price
    : 0;

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(defaultPrice);

  const generalContext = useContext(GeneralContext);

  const quantity = Number(stockQuantity) || 0;
  const price = Number(stockPrice) || 0;

  const orderValue = quantity * price;

  const handleOrderClick = async () => {
    if (quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (price <= 0) {
      alert("Please enter a valid price.");
      return;
    }
    try{
    const token = localStorage.getItem("token");

      await axios.post(
        "https://stock-platform-4u7q.onrender.com/newOrder",
        {
          name: uid,
          qty: quantity,
          price: price,
          mode: mode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(
        `${
          mode === "BUY" ? "Buy" : "Sell"
        } order placed successfully!`
      );

      generalContext.closeBuyWindow();

    } catch (error) {
      console.error("Order error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to place order. Please try again."
      );
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  const isBuy = mode === "BUY";

  return (
    <div
      className="container"
      id="buy-window"
      draggable="true"
    >
      <div className="regular-order">

        {/* STOCK NAME */}

        <div className="stock-name">
          <strong>{uid}</strong>

          {selectedStock && (
            <span>
              Current price: ₹
              {selectedStock.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* INPUTS */}

        <div className="inputs">

          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              step="1"
              onChange={(e) =>
                setStockQuantity(e.target.value)
              }
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0.05"
              onChange={(e) =>
                setStockPrice(e.target.value)
              }
              value={stockPrice}
            />
          </fieldset>

        </div>

      </div>

      {/* ORDER SUMMARY */}

      <div className="order-summary">

        <span>
          Order value
        </span>

        <strong>
          ₹{orderValue.toFixed(2)}
        </strong>

      </div>

      {/* BUTTONS */}

      <div className="buttons">

        <span>
          {isBuy
            ? `Amount required ₹${orderValue.toFixed(2)}`
            : `Sell value ₹${orderValue.toFixed(2)}`}
        </span>

        <div>

          <button
            type="button"
            className={`btn ${
              isBuy
                ? "btn-blue"
                : "btn-red"
            }`}
            onClick={handleOrderClick}
          >
            {isBuy ? "Buy" : "Sell"}
          </button>

          <button
            type="button"
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default BuyActionWindow;