import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Funds.css";

const Funds = () => {
  const [balance, setBalance] = useState(0);
  const [holdings, setHoldings] = useState([]);

  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");

  // Fetch funds and holdings when page loads
  useEffect(() => {
    fetchFunds();
    fetchHoldings();
  }, []);

  // -----------------------------
  // FETCH FUNDS
  // -----------------------------

  const fetchFunds = async () => {
    try {
      const token = localStorage.getItem("token");

const response = await axios.get(
  "https://stock-platform-4u7q.onrender.com/funds",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setBalance(Number(response.data.balance));
    } catch (error) {
      console.error("Error fetching funds:", error);
    }
  };

  // -----------------------------
  // FETCH HOLDINGS
  // -----------------------------

  const fetchHoldings = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://stock-platform-4u7q.onrender.com/allHoldings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setHoldings(response.data);
  } catch (error) {
    console.error("Error fetching holdings:", error);
  }
};

  // -----------------------------
  // CALCULATE INVESTED AMOUNT
  // -----------------------------

  const investedAmount = holdings.reduce(
    (total, stock) =>
      total +
      Number(stock.avg || 0) * Number(stock.qty || 0),
    0
  );

  // -----------------------------
  // CALCULATE CURRENT VALUE
  // -----------------------------

  const currentValue = holdings.reduce(
    (total, stock) =>
      total +
      Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );

  // -----------------------------
  // CALCULATE OVERALL P&L
  // -----------------------------

  const totalPnl = currentValue - investedAmount;

  // -----------------------------
  // CALCULATE TODAY'S P&L
  // -----------------------------

  const todaysPnl = holdings.reduce((total, stock) => {
    const stockValue =
      Number(stock.price || 0) * Number(stock.qty || 0);

    const dayPercentage = parseFloat(
      String(stock.day || "0").replace("%", "")
    );

    return total + stockValue * (dayPercentage / 100);
  }, 0);

  const pnlClass =
    totalPnl >= 0
      ? "positive-value"
      : "negative-value";

  const todayPnlClass =
    todaysPnl >= 0
      ? "positive-value"
      : "negative-value";

  // -----------------------------
  // ADD FUNDS
  // -----------------------------

  const handleAddFunds = async () => {
  const addAmount = Number(amount);

  if (!addAmount || addAmount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "https://stock-platform-4u7q.onrender.com/addFunds",
      {
        amount: addAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setBalance(Number(response.data.balance));
    setAmount("");
    setShowAddFunds(false);

    alert("Funds added successfully!");
  } catch (error) {
    console.error("Add funds error:", error);

    alert(
      error.response?.data?.message ||
        "Unable to add funds."
    );
  }
};

  // -----------------------------
  // WITHDRAW FUNDS
  // -----------------------------

  const handleWithdraw = async () => {
  const withdrawAmount = Number(amount);

  if (!withdrawAmount || withdrawAmount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  if (withdrawAmount > balance) {
    alert("Insufficient funds.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "https://stock-platform-4u7q.onrender.com/withdrawFunds",
      {
        amount: withdrawAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setBalance(Number(response.data.balance));
    setAmount("");
    setShowWithdraw(false);

    alert("Funds withdrawn successfully!");
  } catch (error) {
    console.error("Withdraw error:", error);

    alert(
      error.response?.data?.message ||
        "Unable to withdraw funds."
    );
  }
};

  return (
    <div className="funds-page">

      {/* ================= HEADER ================= */}

      <div className="funds-header">
        <div>
          <h2>Funds</h2>
          <p>Manage your trading account balance</p>
        </div>

        <div className="fund-buttons">
          <button
            className="add-funds-btn"
            onClick={() => setShowAddFunds(true)}
          >
            + Add Funds
          </button>

          <button
            className="withdraw-btn"
            onClick={() => setShowWithdraw(true)}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="funds-grid">

        {/* ================= EQUITY ================= */}

        <div className="fund-card">

          <div className="card-title">
            <h3>Equity</h3>
            <span>Trading Account</span>
          </div>

          <div className="main-balance">
            <p>Available margin</p>

            <h1>
              ₹{balance.toFixed(2)}
            </h1>
          </div>

          <div className="fund-row">
            <span>Used for investments</span>

            <strong>
              ₹{investedAmount.toFixed(2)}
            </strong>
          </div>

          <div className="fund-row">
            <span>Available cash</span>

            <strong className="green-value">
              ₹{balance.toFixed(2)}
            </strong>
          </div>

          <div className="divider"></div>

          <div className="fund-row">
            <span>Current balance</span>

            <strong>
              ₹{balance.toFixed(2)}
            </strong>
          </div>

          <div className="fund-row">
            <span>Payin</span>

            <strong>
              ₹0.00
            </strong>
          </div>

          <div className="fund-row">
            <span>SPAN</span>

            <strong>
              ₹0.00
            </strong>
          </div>

          <div className="fund-row">
            <span>Delivery margin</span>

            <strong>
              ₹0.00
            </strong>
          </div>

          <div className="fund-row">
            <span>Exposure</span>

            <strong>
              ₹0.00
            </strong>
          </div>

          <div className="fund-row">
            <span>Options premium</span>

            <strong>
              ₹0.00
            </strong>
          </div>

          <div className="divider"></div>

          <div className="fund-row">
            <span>Collateral (Liquid funds)</span>

            <strong>
              ₹0.00
            </strong>
          </div>

          <div className="fund-row">
            <span>Collateral (Equity)</span>

            <strong>
              ₹0.00
            </strong>
          </div>

          <div className="fund-row total-row">
            <span>Total collateral</span>

            <strong>
              ₹0.00
            </strong>
          </div>

        </div>

        {/* ================= ACCOUNT SUMMARY ================= */}

        <div className="account-summary">

          <div className="summary-header">
            <h3>Account Summary</h3>
            <span>Live Overview</span>
          </div>

          {/* AVAILABLE CASH */}

          <div className="summary-item">
            <div>
              <p>Available Cash</p>
              <span>Ready to trade</span>
            </div>

            <strong className="green-value">
              ₹{balance.toFixed(2)}
            </strong>
          </div>

          {/* INVESTED AMOUNT */}

          <div className="summary-item">
            <div>
              <p>Invested Amount</p>
              <span>Cost of current holdings</span>
            </div>

            <strong>
              ₹{investedAmount.toFixed(2)}
            </strong>
          </div>

          {/* CURRENT VALUE */}

          <div className="summary-item">
            <div>
              <p>Current Value</p>
              <span>Market value of holdings</span>
            </div>

            <strong>
              ₹{currentValue.toFixed(2)}
            </strong>
          </div>

          {/* OVERALL P&L */}

          <div className="summary-item">
            <div>
              <p>Overall P&L</p>
              <span>Current value − investment</span>
            </div>

            <strong className={pnlClass}>
              {totalPnl >= 0 ? "+" : ""}
              ₹{totalPnl.toFixed(2)}
            </strong>
          </div>

          {/* TODAY'S P&L */}

          <div className="summary-item">
            <div>
              <p>Today's P&L</p>
              <span>Based on day change</span>
            </div>

            <strong className={todayPnlClass}>
              {todaysPnl >= 0 ? "+" : ""}
              ₹{todaysPnl.toFixed(2)}
            </strong>
          </div>

          {/* ACCOUNT NOTE */}

          <div className="account-note">
            <strong>Trading account</strong>

            <p>
              Your funds and investment values are
              calculated from your current holdings.
            </p>
          </div>

        </div>
      </div>

      {/* ================= ADD FUNDS MODAL ================= */}

      {showAddFunds && (
        <div className="modal-overlay">

          <div className="fund-modal">

            <button
              className="modal-close"
              onClick={() => {
                setShowAddFunds(false);
                setAmount("");
              }}
            >
              ×
            </button>

            <h3>Add Funds</h3>

            <p className="modal-description">
              Add money to your trading account.
            </p>

            <div className="current-balance">
              <span>Current balance</span>

              <strong>
                ₹{balance.toFixed(2)}
              </strong>
            </div>

            <input
              type="number"
              min="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowAddFunds(false);
                  setAmount("");
                }}
              >
                Cancel
              </button>

              <button
                className="confirm-add-btn"
                onClick={handleAddFunds}
              >
                Add Money
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= WITHDRAW MODAL ================= */}

      {showWithdraw && (
        <div className="modal-overlay">

          <div className="fund-modal">

            <button
              className="modal-close"
              onClick={() => {
                setShowWithdraw(false);
                setAmount("");
              }}
            >
              ×
            </button>

            <h3>Withdraw Funds</h3>

            <p className="modal-description">
              Withdraw money from your trading account.
            </p>

            <div className="current-balance">
              <span>Available balance</span>

              <strong>
                ₹{balance.toFixed(2)}
              </strong>
            </div>

            <input
              type="number"
              min="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowWithdraw(false);
                  setAmount("");
                }}
              >
                Cancel
              </button>

              <button
                className="confirm-withdraw-btn"
                onClick={handleWithdraw}
              >
                Withdraw Money
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Funds;