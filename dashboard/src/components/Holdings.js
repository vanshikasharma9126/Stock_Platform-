import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { watchlist } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
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

        setAllHoldings(response.data);
      } catch (error) {
        console.error("Error fetching holdings:", error);
      }
    };

    fetchHoldings();
  }, []);

  // --------------------------------
  // GET CURRENT STOCK PRICE
  // --------------------------------

  const getLivePrice = (stock) => {
    const marketStock = watchlist.find(
      (item) => item.name === stock.name
    );

    return marketStock
      ? Number(marketStock.price)
      : Number(stock.price || 0);
  };

  // --------------------------------
  // CHART DATA
  // --------------------------------

  const chartStocks =
    allHoldings.length > 0
      ? allHoldings
      : watchlist;

  const labels = chartStocks.map(
    (stock) => stock.name
  );

  const chartPrices = chartStocks.map((stock) => {
    if (allHoldings.length === 0) {
      return Number(stock.price || 0);
    }

    return getLivePrice(stock);
  });

  const data = {
    labels,
    datasets: [
      {
        label:
          allHoldings.length > 0
            ? "Stock Price"
            : "Market Stock Price",
        data: chartPrices,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // --------------------------------
  // DYNAMIC TOTALS
  // --------------------------------

  const totalInvestment = allHoldings.reduce(
    (total, stock) =>
      total +
      Number(stock.avg || 0) *
        Number(stock.qty || 0),
    0
  );

  const currentValue = allHoldings.reduce(
    (total, stock) =>
      total +
      getLivePrice(stock) *
        Number(stock.qty || 0),
    0
  );

  const totalPnl =
    currentValue - totalInvestment;

  const pnlPercentage =
    totalInvestment > 0
      ? (totalPnl / totalInvestment) * 100
      : 0;

  const pnlClass =
    totalPnl >= 0 ? "profit" : "loss";

  return (
    <>
      <h3 className="title">
        Holdings ({allHoldings.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              const qty = Number(
                stock.qty || 0
              );

              const avg = Number(
                stock.avg || 0
              );

              const price = getLivePrice(stock);

              const curValue =
                price * qty;

              const pnl =
                curValue - avg * qty;

              const isProfit = pnl >= 0;

              const profClass = isProfit
                ? "profit"
                : "loss";

              const dayClass =
                stock.isLoss
                  ? "loss"
                  : "profit";

              return (
                <tr
                  key={
                    stock._id || index
                  }
                >
                  <td>
                    {stock.name}
                  </td>

                  <td>{qty}</td>

                  <td>
                    ₹{avg.toFixed(2)}
                  </td>

                  <td>
                    ₹{price.toFixed(2)}
                  </td>

                  <td>
                    ₹{curValue.toFixed(2)}
                  </td>

                  <td
                    className={profClass}
                  >
                    {pnl >= 0 ? "+" : ""}
                    ₹{pnl.toFixed(2)}
                  </td>

                  <td
                    className={profClass}
                  >
                    {stock.net || "0.00%"}
                  </td>

                  <td
                    className={dayClass}
                  >
                    {stock.day || "0.00%"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* DYNAMIC SUMMARY */}

      <div className="row">
        <div className="col">
          <h5>
            ₹{totalInvestment.toFixed(2)}
          </h5>

          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>
            ₹{currentValue.toFixed(2)}
          </h5>

          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={pnlClass}>
            {totalPnl >= 0 ? "+" : ""}
            ₹{totalPnl.toFixed(2)}{" "}
            (
            {pnlPercentage >= 0
              ? "+"
              : ""}
            {pnlPercentage.toFixed(2)}
            %)
          </h5>

          <p>P&L</p>
        </div>
      </div>

      {/* STOCK PRICE GRAPH */}

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;