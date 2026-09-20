import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "./Reports.css";

const Reports = () => {
  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
  try {
    const token = localStorage.getItem("token");

    const [holdingsResponse, ordersResponse] = await Promise.all([
      axios.get("https://stock-platform-4u7q.onrender.com/allHoldings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      axios.get("https://stock-platform-4u7q.onrender.com/allOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    // KEEP YOUR EXISTING CODE HERE
    // that processes holdingsResponse.data
    // and ordersResponse.data

      setHoldings(holdingsResponse.data || []);
      setOrders(ordersResponse.data || []);

      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
  };

  const totalInvested = holdings.reduce(
    (total, stock) =>
      total +
      Number(stock.avg || 0) * Number(stock.qty || 0),
    0
  );

  const currentValue = holdings.reduce(
    (total, stock) =>
      total +
      Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );

  const totalPnl = currentValue - totalInvested;

  const buyOrders = orders.filter(
    (order) => order.mode === "BUY"
  ).length;

  const sellOrders = orders.filter(
    (order) => order.mode === "SELL"
  ).length;

  const formatMoney = (value) =>
    `₹${Number(value).toFixed(2)}`;

  // =========================
  // CSV DOWNLOAD
  // =========================

  const downloadCSV = () => {
    let csv = "";

    csv += "PORTFOLIO REPORT\n\n";

    csv += "Summary\n";
    csv += "Metric,Value\n";
    csv += `Total Invested,${totalInvested.toFixed(2)}\n`;
    csv += `Current Value,${currentValue.toFixed(2)}\n`;
    csv += `Overall P&L,${totalPnl.toFixed(2)}\n`;
    csv += `Total Holdings,${holdings.length}\n`;
    csv += `Total Orders,${orders.length}\n`;
    csv += `BUY Orders,${buyOrders}\n`;
    csv += `SELL Orders,${sellOrders}\n\n`;

    csv += "Holdings\n";
    csv +=
      "Instrument,Quantity,Average Cost,LTP,Current Value,P&L\n";

    holdings.forEach((stock) => {
      const investment =
        Number(stock.avg || 0) *
        Number(stock.qty || 0);

      const value =
        Number(stock.price || 0) *
        Number(stock.qty || 0);

      const pnl = value - investment;

      csv +=
        `${stock.name},` +
        `${stock.qty},` +
        `${Number(stock.avg || 0).toFixed(2)},` +
        `${Number(stock.price || 0).toFixed(2)},` +
        `${value.toFixed(2)},` +
        `${pnl.toFixed(2)}\n`;
    });

    csv += "\nOrders\n";
    csv += "Stock,Type,Quantity,Price,Total\n";

    orders.forEach((order) => {
      const total =
        Number(order.qty || 0) *
        Number(order.price || 0);

      csv +=
        `${order.name},` +
        `${order.mode},` +
        `${order.qty},` +
        `${Number(order.price || 0).toFixed(2)},` +
        `${total.toFixed(2)}\n`;
    });

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio-report.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // =========================
  // PDF DOWNLOAD
  // =========================

  const downloadPDF = () => {
    const doc = new jsPDF();

    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 20;

    const addPageIfNeeded = (space = 10) => {
      if (y + space > pageHeight - 15) {
        doc.addPage();
        y = 20;
      }
    };

    // TITLE
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("PORTFOLIO REPORT", 20, y);

    y += 9;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Trading and portfolio summary",
      20,
      y
    );

    y += 15;

    // SUMMARY
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Account Summary", 20, y);

    y += 9;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const summaryRows = [
      ["Total Invested", totalInvested],
      ["Current Value", currentValue],
      ["Overall P&L", totalPnl],
      ["Total Holdings", holdings.length],
      ["Total Orders", orders.length],
      ["BUY Orders", buyOrders],
      ["SELL Orders", sellOrders],
    ];

    summaryRows.forEach(([label, value]) => {
      addPageIfNeeded(8);

      doc.setFont("helvetica", "bold");
      doc.text(label, 20, y);

      doc.setFont("helvetica", "normal");

      const displayValue =
        typeof value === "number" &&
        label !== "Total Holdings" &&
        label !== "Total Orders" &&
        label !== "BUY Orders" &&
        label !== "SELL Orders"
          ? `Rs. ${value.toFixed(2)}`
          : String(value);

      doc.text(displayValue, 90, y);

      y += 7;
    });

    y += 7;

    // HOLDINGS
    addPageIfNeeded(20);

    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Portfolio Holdings", 20, y);

    y += 9;

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");

    doc.text("Stock", 20, y);
    doc.text("Qty", 55, y);
    doc.text("Avg Cost", 75, y);
    doc.text("LTP", 105, y);
    doc.text("Value", 130, y);
    doc.text("P&L", 165, y);

    y += 6;

    doc.setFont("helvetica", "normal");

    holdings.forEach((stock) => {
      addPageIfNeeded(8);

      const investment =
        Number(stock.avg || 0) *
        Number(stock.qty || 0);

      const value =
        Number(stock.price || 0) *
        Number(stock.qty || 0);

      const pnl = value - investment;

      doc.text(String(stock.name), 20, y);
      doc.text(String(stock.qty), 55, y);
      doc.text(
        Number(stock.avg).toFixed(2),
        75,
        y
      );
      doc.text(
        Number(stock.price).toFixed(2),
        105,
        y
      );
      doc.text(
        value.toFixed(2),
        130,
        y
      );
      doc.text(
        `${pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}`,
        165,
        y
      );

      y += 6;
    });

    y += 10;

    // ORDERS
    addPageIfNeeded(20);

    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Order History", 20, y);

    y += 9;

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");

    doc.text("Stock", 20, y);
    doc.text("Type", 55, y);
    doc.text("Qty", 80, y);
    doc.text("Price", 105, y);
    doc.text("Total", 140, y);

    y += 6;

    doc.setFont("helvetica", "normal");

    orders.forEach((order) => {
      addPageIfNeeded(8);

      const total =
        Number(order.qty || 0) *
        Number(order.price || 0);

      doc.text(String(order.name), 20, y);
      doc.text(String(order.mode), 55, y);
      doc.text(String(order.qty), 80, y);
      doc.text(
        Number(order.price).toFixed(2),
        105,
        y
      );
      doc.text(
        total.toFixed(2),
        140,
        y
      );

      y += 6;
    });

    // FOOTER ON EACH PAGE
    const pageCount = doc.getNumberOfPages();

    for (let page = 1; page <= pageCount; page++) {
      doc.setPage(page);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");

      doc.text(
        `Portfolio Report | Page ${page} of ${pageCount}`,
        20,
        pageHeight - 10
      );
    }

    doc.save("portfolio-report.pdf");
  };

  if (loading) {
    return (
      <div className="reports-page">
        <h2>Reports</h2>
        <p className="loading-report">
          Loading your trading report...
        </p>
      </div>
    );
  }

  return (
    <div className="reports-page">

      {/* HEADER */}

      <div className="reports-header">
        <div>
          <h2>Reports</h2>

          <p>
            View and download your trading and portfolio
            summary.
          </p>
        </div>

        <div className="report-download-buttons">

          <button
            className="download-pdf-btn"
            onClick={downloadPDF}
          >
            ↓ Download PDF
          </button>

          <button
            className="download-report-btn"
            onClick={downloadCSV}
          >
            ↓ Download CSV
          </button>

        </div>
      </div>

      {/* SUMMARY CARDS */}

      <div className="report-summary-grid">

        <div className="report-card">
          <span>Total Invested</span>

          <strong>
            {formatMoney(totalInvested)}
          </strong>
        </div>

        <div className="report-card">
          <span>Current Value</span>

          <strong>
            {formatMoney(currentValue)}
          </strong>
        </div>

        <div className="report-card">
          <span>Overall P&L</span>

          <strong
            className={
              totalPnl >= 0
                ? "report-profit"
                : "report-loss"
            }
          >
            {totalPnl >= 0 ? "+" : ""}
            {formatMoney(totalPnl)}
          </strong>
        </div>

        <div className="report-card">
          <span>Total Holdings</span>

          <strong>
            {holdings.length}
          </strong>
        </div>

      </div>

      {/* TRADING ACTIVITY */}

      <div className="order-summary-card">

        <div className="report-section-header">
          <div>
            <h3>Trading Activity</h3>
            <p>Summary of your orders</p>
          </div>
        </div>

        <div className="activity-grid">

          <div className="activity-item">
            <span>Total Orders</span>
            <strong>
              {orders.length}
            </strong>
          </div>

          <div className="activity-item">
            <span>BUY Orders</span>
            <strong className="report-profit">
              {buyOrders}
            </strong>
          </div>

          <div className="activity-item">
            <span>SELL Orders</span>
            <strong className="report-loss">
              {sellOrders}
            </strong>
          </div>

        </div>
      </div>

      {/* HOLDINGS TABLE */}

      <div className="report-table-card">

        <div className="report-section-header">
          <div>
            <h3>Portfolio Holdings</h3>

            <p>
              Current holdings and investment performance
            </p>
          </div>
        </div>

        {holdings.length === 0 ? (
          <div className="empty-report">
            No holdings available.
          </div>
        ) : (
          <div className="report-table-wrapper">

            <table className="report-table">

              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Avg. Cost</th>
                  <th>LTP</th>
                  <th>Current Value</th>
                  <th>P&L</th>
                </tr>
              </thead>

              <tbody>

                {holdings.map((stock) => {

                  const investment =
                    Number(stock.avg || 0) *
                    Number(stock.qty || 0);

                  const value =
                    Number(stock.price || 0) *
                    Number(stock.qty || 0);

                  const pnl =
                    value - investment;

                  return (
                    <tr key={stock._id}>

                      <td>
                        <strong>
                          {stock.name}
                        </strong>
                      </td>

                      <td>
                        {stock.qty}
                      </td>

                      <td>
                        ₹
                        {Number(
                          stock.avg
                        ).toFixed(2)}
                      </td>

                      <td>
                        ₹
                        {Number(
                          stock.price
                        ).toFixed(2)}
                      </td>

                      <td>
                        ₹{value.toFixed(2)}
                      </td>

                      <td
                        className={
                          pnl >= 0
                            ? "report-profit"
                            : "report-loss"
                        }
                      >
                        {pnl >= 0 ? "+" : ""}
                        ₹{pnl.toFixed(2)}
                      </td>

                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};

export default Reports;