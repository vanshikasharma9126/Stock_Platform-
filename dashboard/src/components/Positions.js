import React, { useEffect, useState } from "react";
import axios from "axios";
import { watchlist } from "../data/data";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://stock-platform-4u7q.onrender.com/allPositions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const getLivePrice = (position) => {
    const stock = watchlist.find(
      (item) => item.name === position.name
    );

    return stock ? stock.price : Number(position.price);
  };

  const calculatePnl = (position) => {
    const livePrice = getLivePrice(position);

    return (
      (livePrice - Number(position.avg)) *
      Number(position.qty)
    );
  };

  const totalInvestment = allPositions.reduce(
    (total, position) =>
      total +
      Number(position.avg) * Number(position.qty),
    0
  );

  const currentValue = allPositions.reduce(
    (total, position) =>
      total +
      getLivePrice(position) * Number(position.qty),
    0
  );

  const totalPnl = currentValue - totalInvestment;

  const totalPnlClass = totalPnl >= 0 ? "profit" : "loss";

  if (loading) {
    return (
      <>
        <h3 className="title">Positions</h3>

        <div className="no-orders">
          <p>Loading positions...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className="title">
        Positions ({allPositions.length})
      </h3>

      {allPositions.length === 0 ? (
        <div className="no-orders">
          <p>You don't have any open positions</p>
        </div>
      ) : (
        <>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
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
                {allPositions.map((position) => {
                  const livePrice = getLivePrice(position);

                  const currentValue =
                    livePrice * Number(position.qty);

                  const pnl = calculatePnl(position);

                  const pnlClass =
                    pnl >= 0 ? "profit" : "loss";

                  const dayClass = position.isLoss
                    ? "loss"
                    : "profit";

                  return (
                    <tr key={position._id}>
                      <td>{position.product}</td>

                      <td>
                        <strong>{position.name}</strong>
                      </td>

                      <td>{position.qty}</td>

                      <td>
                        ₹{Number(position.avg).toFixed(2)}
                      </td>

                      <td>
                        ₹{Number(livePrice).toFixed(2)}
                      </td>

                      <td>
                        ₹{currentValue.toFixed(2)}
                      </td>

                      <td className={pnlClass}>
                        ₹{pnl.toFixed(2)}
                      </td>

                      <td className={pnlClass}>
                        {position.net}
                      </td>

                      <td className={dayClass}>
                        {position.day}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

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
              <h5 className={totalPnlClass}>
                ₹{totalPnl.toFixed(2)}
              </h5>
              <p>P&L</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Positions;