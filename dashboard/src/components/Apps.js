import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { watchlist } from "../data/data";
import "./Apps.css";

const Apps = () => {
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const [selectedStock, setSelectedStock] = useState(
    watchlist[0].name
  );

  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState("ABOVE");

  // Load saved alerts
  useEffect(() => {
    const savedAlerts = localStorage.getItem("priceAlerts");

    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  // Save alerts whenever they change
  useEffect(() => {
    localStorage.setItem(
      "priceAlerts",
      JSON.stringify(alerts)
    );
  }, [alerts]);

  const createAlert = () => {
    const price = Number(targetPrice);

    if (!price || price <= 0) {
      alert("Please enter a valid target price.");
      return;
    }

    const stock = watchlist.find(
      (item) => item.name === selectedStock
    );

    const newAlert = {
      id: Date.now(),
      stock: selectedStock,
      targetPrice: price,
      condition,
      currentPrice: stock.price,
      triggered: false,
    };

    setAlerts((previousAlerts) => [
      ...previousAlerts,
      newAlert,
    ]);

    setTargetPrice("");
    setShowAlertForm(false);

    alert("Price alert created successfully!");
  };

  const deleteAlert = (id) => {
    setAlerts((previousAlerts) =>
      previousAlerts.filter((alert) => alert.id !== id)
    );
  };

  const checkAlert = (alert) => {
    const stock = watchlist.find(
      (item) => item.name === alert.stock
    );

    if (!stock) return false;

    if (alert.condition === "ABOVE") {
      return stock.price >= alert.targetPrice;
    }

    return stock.price <= alert.targetPrice;
  };

  const checkAllAlerts = () => {
    let triggeredCount = 0;

    const updatedAlerts = alerts.map((alert) => {
      const triggered = checkAlert(alert);

      if (triggered && !alert.triggered) {
        triggeredCount++;
      }

      return {
        ...alert,
        triggered,
      };
    });

    setAlerts(updatedAlerts);

    if (triggeredCount > 0) {
      alert(
        `${triggeredCount} price alert${
          triggeredCount > 1 ? "s" : ""
        } triggered!`
      );
    } else {
      alert("No price alerts have been triggered.");
    }
  };

  return (
    <div className="apps-page">

      {/* HEADER */}
      <div className="apps-header">
        <div>
          <h2>Apps</h2>
          <p>
            Tools and services for your trading account
          </p>
        </div>
      </div>

      {/* PRICE ALERT SECTION */}
      <div className="price-alert-section">

        <div className="section-heading">
          <div>
            <h3>Price Alerts</h3>
            <p>
              Set alerts when a stock reaches your target
              price.
            </p>
          </div>

          <div className="alert-actions">
            <button
              className="check-alert-btn"
              onClick={checkAllAlerts}
              disabled={alerts.length === 0}
            >
              Check Alerts
            </button>

            <button
              className="create-alert-btn"
              onClick={() => setShowAlertForm(true)}
            >
              + Create Alert
            </button>
          </div>
        </div>

        {/* ALERT LIST */}

        {alerts.length === 0 ? (
          <div className="no-alerts">
            <div className="alert-empty-icon">!</div>

            <h3>No price alerts</h3>

            <p>
              Create an alert to get notified when a stock
              reaches your target price.
            </p>

            <button
              className="create-alert-btn"
              onClick={() => setShowAlertForm(true)}
            >
              Create Your First Alert
            </button>
          </div>
        ) : (
          <div className="alerts-list">
            {alerts.map((alert) => {
              const stock = watchlist.find(
                (item) => item.name === alert.stock
              );

              const currentPrice = stock
                ? stock.price
                : alert.currentPrice;

              return (
                <div
                  className={`alert-card ${
                    alert.triggered
                      ? "alert-triggered"
                      : ""
                  }`}
                  key={alert.id}
                >
                  <div className="alert-stock">
                    <div className="stock-symbol">
                      {alert.stock.charAt(0)}
                    </div>

                    <div>
                      <h4>{alert.stock}</h4>

                      <span>
                        Current price: ₹
                        {Number(currentPrice).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="alert-condition">
                    <span>
                      Alert when price goes{" "}
                      {alert.condition === "ABOVE"
                        ? "above"
                        : "below"}
                    </span>

                    <strong>
                      ₹{Number(
                        alert.targetPrice
                      ).toFixed(2)}
                    </strong>
                  </div>

                  <div className="alert-status">
                    {alert.triggered ? (
                      <span className="triggered">
                        Triggered
                      </span>
                    ) : (
                      <span className="active-alert">
                        Active
                      </span>
                    )}
                  </div>

                  <button
                    className="delete-alert"
                    onClick={() =>
                      deleteAlert(alert.id)
                    }
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* OTHER APPS */}

      <div className="other-apps">

        <div className="app-card">
          <div className="app-card-top">
            <div className="app-icon">M</div>

            <span className="app-status available">
              Available
            </span>
          </div>

          <h3>Market Watch</h3>

          <p>
            Track stocks and monitor their latest price
            movements.
          </p>

          <button
            className="app-open-btn"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Open
          </button>
        </div>

        <div className="app-card">
          <div className="app-card-top">
            <div className="app-icon">P</div>

            <span className="app-status available">
              Available
            </span>
          </div>

          <h3>Portfolio Analytics</h3>

          <p>
            Analyze your holdings, investment value and
            overall P&L.
          </p>

          <button
            className="app-open-btn"
            onClick={() => {
              window.location.href = "/holdings";
            }}
          >
            Open
          </button>
        </div>

        <div className="app-card">
          <div className="app-card-top">
            <div className="app-icon">R</div>

            <span className="app-status available">
                  Available
            </span>
          </div>

          <h3>Reports</h3>
          <p>
          View and download detailed trading and
          portfolio reports.
          </p>
         <Link
          to="/reports"
          className="app-open-btn"
          style={{ textDecoration: "none" }}
        >
          Open Reports
          </Link>
        </div>

      </div>

      {/* CREATE ALERT MODAL */}

      {showAlertForm && (
        <div className="alert-modal-overlay">
          <div className="alert-modal">

            <button
              className="alert-modal-close"
              onClick={() => {
                setShowAlertForm(false);
                setTargetPrice("");
              }}
            >
              ×
            </button>

            <h3>Create Price Alert</h3>

            <p>
              Choose a stock and set your target price.
            </p>

            <label>Stock</label>

            <select
              value={selectedStock}
              onChange={(e) =>
                setSelectedStock(e.target.value)
              }
            >
              {watchlist.map((stock) => (
                <option
                  key={stock.name}
                  value={stock.name}
                >
                  {stock.name} — ₹
                  {stock.price.toFixed(2)}
                </option>
              ))}
            </select>

            <label>Condition</label>

            <div className="condition-buttons">
              <button
                className={
                  condition === "ABOVE"
                    ? "condition-active"
                    : ""
                }
                onClick={() =>
                  setCondition("ABOVE")
                }
              >
                Price goes above
              </button>

              <button
                className={
                  condition === "BELOW"
                    ? "condition-active"
                    : ""
                }
                onClick={() =>
                  setCondition("BELOW")
                }
              >
                Price goes below
              </button>
            </div>

            <label>Target Price</label>

            <input
              type="number"
              min="0"
              step="0.05"
              placeholder="Enter target price"
              value={targetPrice}
              onChange={(e) =>
                setTargetPrice(e.target.value)
              }
            />

            <div className="alert-modal-actions">

              <button
                className="cancel-alert-btn"
                onClick={() => {
                  setShowAlertForm(false);
                  setTargetPrice("");
                }}
              >
                Cancel
              </button>

              <button
                className="save-alert-btn"
                onClick={createAlert}
              >
                Create Alert
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Apps;