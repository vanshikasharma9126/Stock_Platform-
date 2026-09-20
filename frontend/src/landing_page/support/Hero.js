import React from "react";

function Hero() {
  return (
    <section
      className="container-fluid"
      id="supportHero"
      style={{
        backgroundColor: "#387ed1",
        color: "white",
        minHeight: "445px",
      }}
    >
      {/* Top section */}
      <div
        className="container d-flex justify-content-between align-items-center"
        style={{ paddingTop: "40px" }}
      >
        <h4 style={{ fontSize: "18px", margin: 0 }}>
          Support Portal
        </h4>

        <a
          href=""
          style={{
            color: "white",
            fontSize: "16px",
          }}
        >
          Track Tickets
        </a>
      </div>

      {/* Main section */}
      <div
        className="container"
        style={{
          marginTop: "70px",
        }}
      >
        <div className="row">

          {/* Left side */}
          <div className="col-6">
            <h1
              style={{
                fontSize: "27px",
                lineHeight: "1.4",
                fontWeight: "400",
                maxWidth: "550px",
              }}
            >
              Search for an answer or browse help topics
              <br />
              to create a ticket
            </h1>

            <input
              type="text"
              placeholder="Eg: how do I activate F&O, why is my order getting rejected..."
              style={{
                width: "505px",
                height: "75px",
                padding: "20px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "none",
                marginTop: "15px",
                color: "#424242",
              }}
            />

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                flexWrap: "wrap",
                gap: "18px",
                maxWidth: "550px",
              }}
            >
              <a href="" style={{ color: "white" }}>
                Track account opening
              </a>

              <a href="" style={{ color: "white" }}>
                Track segment activation
              </a>

              <a href="" style={{ color: "white" }}>
                Intraday margins
              </a>

              <a href="" style={{ color: "white" }}>
                Kite user manual
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="col-6">
            <h1
              style={{
                fontSize: "27px",
                fontWeight: "400",
                marginBottom: "15px",
              }}
            >
              Featured
            </h1>

            <ol style={{ paddingLeft: "35px" }}>
              <li style={{ marginBottom: "10px" }}>
                <a href="" style={{ color: "white" }}>
                  Current Takeovers and Delisting - January 2024
                </a>
              </li>

              <li>
                <a href="" style={{ color: "white" }}>
                  Latest Intraday leverages - MIS & CO
                </a>
              </li>
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;