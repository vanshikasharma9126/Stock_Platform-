import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();
  const logoStyle = {
    width: "220px",
    height: "80px",
    objectFit: "contain",
  };

  const logoBoxStyle = {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="container mt-5">
      <div className="row text-center">

        <h1>The Zerodha Universe</h1>

        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        {/* Smallcase */}
        <div className="col-4 p-3 mt-5">
          <div style={logoBoxStyle}>
            <img
              src="/media/images/smallcaseLogo.png"
              alt="Smallcase"
              style={logoStyle}
            />
          </div>

          <p className="text-small text-muted">
            Thematic investment platform
          </p>
        </div>

        {/* Streak */}
        <div className="col-4 p-3 mt-5">
          <div style={logoBoxStyle}>
            <img
              src="/media/images/streakLogo.png"
              alt="Streak"
              style={logoStyle}
            />
          </div>

          <p className="text-small text-muted">
            Algo & strategy platform
          </p>
        </div>

        {/* Sensibull */}
        <div className="col-4 p-3 mt-5">
          <div style={logoBoxStyle}>
            <img
              src="/media/images/sensibullLogo.svg"
              alt="Sensibull"
              style={logoStyle}
            />
          </div>

          <p className="text-small text-muted">
            Options trading platform
          </p>
        </div>

        {/* Zerodha Fund House */}
        <div className="col-4 p-3 mt-5">
          <div style={logoBoxStyle}>
            <img
              src="/media/images/zerodhaFundhouse.png"
              alt="Zerodha Fund House"
              style={logoStyle}
            />
          </div>

          <p className="text-small text-muted">
            Asset management
          </p>
        </div>

        {/* GoldenPi */}
        <div className="col-4 p-3 mt-5">
          <div style={logoBoxStyle}>
            <img
              src="/media/images/goldenpiLogo.png"
              alt="GoldenPi"
              style={logoStyle}
            />
          </div>

          <p className="text-small text-muted">
            Bonds trading platform
          </p>
        </div>

        {/* Ditto */}
        <div className="col-4 p-3 mt-5">
          <div style={logoBoxStyle}>
            <img
              src="/media/images/dittoLogo.png"
              alt="Ditto"
              style={logoStyle}
            />
          </div>

          <p className="text-small text-muted">
            Insurance
          </p>
        </div>

        {/* Signup Button */}
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{
            width: "20%",
            margin: "20px auto 0",
          }}
          onClick={() => navigate("/signup")}

        >
          Signup Now
        </button>

      </div>
    </div>
  );
}

export default Universe;