import React, { useEffect, useState } from "react";
import { watchlist } from "../data/data";

const Summary = () => {
  const [userName, setUserName] = useState("User");
  const [balance, setBalance] = useState(0);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const params = new URLSearchParams(
          window.location.search
        );

        const tokenFromUrl = params.get("token");

        if (tokenFromUrl) {
          localStorage.setItem("token", tokenFromUrl);

          window.history.replaceState(
            {},
            document.title,
            "/"
          );
        }

        const token =
          tokenFromUrl ||
          localStorage.getItem("token");

        if (!token) {
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch user
        const userResponse = await fetch(
          "https://stock-platform-4u7q.onrender.com/me",
          {
            headers,
          }
        );

        if (!userResponse.ok) {
          throw new Error(
            "Authentication failed"
          );
        }

        const userData =
          await userResponse.json();

        setUserName(userData.name);

        // Fetch funds
        const fundsResponse = await fetch(
          "https://stock-platform-4u7q.onrender.com/funds",
          {
            headers,
          }
        );

        if (!fundsResponse.ok) {
          throw new Error(
            "Failed to fetch funds"
          );
        }

        const fundsData =
          await fundsResponse.json();

        setBalance(
          Number(fundsData.balance || 0)
        );

        // Fetch holdings
        const holdingsResponse = await fetch(
          "https://stock-platform-4u7q.onrender.com/allHoldings",
          {
            headers,
          }
        );

        if (!holdingsResponse.ok) {
          throw new Error(
            "Failed to fetch holdings"
          );
        }

        const holdingsData =
          await holdingsResponse.json();

        setHoldings(holdingsData);
      } catch (error) {
        console.error(
          "Dashboard fetch error:",
          error
        );
      }
    };

    fetchDashboardData();
  }, []);

  // --------------------------------
  // GET CURRENT STOCK PRICE
  // --------------------------------

  const getLivePrice = (holding) => {
    const stock = watchlist.find(
      (item) => item.name === holding.name
    );

    return stock
      ? Number(stock.price)
      : Number(holding.price || 0);
  };

  // --------------------------------
  // DYNAMIC HOLDING CALCULATIONS
  // --------------------------------

  const totalInvestment = holdings.reduce(
    (total, holding) =>
      total +
      Number(holding.avg || 0) *
        Number(holding.qty || 0),
    0
  );

  const currentValue = holdings.reduce(
    (total, holding) =>
      total +
      getLivePrice(holding) *
        Number(holding.qty || 0),
    0
  );

  const totalPnl =
    currentValue - totalInvestment;

  const pnlPercentage =
    totalInvestment > 0
      ? (totalPnl / totalInvestment) * 100
      : 0;

  // --------------------------------
  // FORMATTING
  // --------------------------------

  const formatAmount = (amount) => {
    return Number(amount).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  const formatShortAmount = (amount) => {
    const value = Number(amount);

    if (value >= 100000) {
      return (
        (value / 100000).toFixed(2) +
        "L"
      );
    }

    if (value >= 1000) {
      return (
        (value / 1000).toFixed(2) +
        "k"
      );
    }

    return value.toFixed(2);
  };

  const pnlClass =
    totalPnl >= 0 ? "profit" : "loss";

  return (
    <>
      {/* USER */}

      <div className="username">
        <h6>Hi, {userName}!</h6>

        <hr className="divider" />
      </div>

      {/* EQUITY */}

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>
              ₹{formatShortAmount(balance)}
            </h3>

            <p>Margin available</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Margins used{" "}
              <span>
                ₹0.00
              </span>
            </p>

            <p>
              Opening balance{" "}
              <span>
                ₹{formatAmount(balance)}
              </span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>

      {/* HOLDINGS */}

      <div className="section">
        <span>
          <p>
            Holdings ({holdings.length})
          </p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnlClass}>
              ₹{formatShortAmount(totalPnl)}{" "}
              <small>
                {totalPnl >= 0 ? "+" : ""}
                {pnlPercentage.toFixed(2)}%
              </small>
            </h3>

            <p>P&L</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Current Value{" "}
              <span>
                ₹{formatShortAmount(currentValue)}
              </span>
            </p>

            <p>
              Investment{" "}
              <span>
                ₹{formatShortAmount(
                  totalInvestment
                )}
              </span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;