require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel");
const { UserModel } = require("./model/UserModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.userId = user._id;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.get("/allHoldings", authenticateUser, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({
      userId: req.userId,
    });

    res.json(allHoldings);
  } catch (error) {
    console.error("Error fetching holdings:", error);

    res.status(500).json({
      message: "Failed to fetch holdings",
    });
  }
});

app.get("/allPositions", authenticateUser, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({
      userId: req.userId,
    });

    res.json(allPositions);
  } catch (error) {
    console.error("Error fetching positions:", error);

    res.status(500).json({
      message: "Failed to fetch positions",
    });
  }
});

app.get("/funds", authenticateUser, async (req, res) => {
  try {
    let funds = await FundsModel.findOne({
      userId: req.userId,
    });

    if (!funds) {
      funds = new FundsModel({
        userId: req.userId,
        balance: 50000,
      });

      await funds.save();
    }

    res.json(funds);
  } catch (error) {
    console.error("Funds fetch error:", error);

    res.status(500).json({
      message: "Failed to fetch funds",
    });
  }
});

app.post("/addFunds", authenticateUser, async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Enter a valid amount",
      });
    }

    let funds = await FundsModel.findOne({
      userId: req.userId,
    });

    if (!funds) {
      funds = new FundsModel({
        userId: req.userId,
        balance: 50000,
      });
    }

    funds.balance += amount;

    await funds.save();

    res.json({
      message: "Funds added successfully",
      balance: funds.balance,
    });
  } catch (error) {
    console.error("Add funds error:", error);

    res.status(500).json({
      message: "Failed to add funds",
    });
  }
});

app.post("/withdrawFunds", authenticateUser, async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Enter a valid amount",
      });
    }

    const funds = await FundsModel.findOne({
      userId: req.userId,
    });

    if (!funds) {
      return res.status(400).json({
        message: "Funds account not found",
      });
    }

    if (amount > funds.balance) {
      return res.status(400).json({
        message: "Insufficient funds",
      });
    }

    funds.balance -= amount;

    await funds.save();

    res.json({
      message: "Funds withdrawn successfully",
      balance: funds.balance,
    });
  } catch (error) {
    console.error("Withdraw funds error:", error);

    res.status(500).json({
      message: "Failed to withdraw funds",
    });
  }
});

app.post("/newOrder", authenticateUser, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const quantity = Number(qty);
    const orderPrice = Number(price);
    const orderValue = quantity * orderPrice;

    // =========================
    // VALIDATION
    // =========================

    if (
      !name ||
      !quantity ||
      quantity <= 0 ||
      !orderPrice ||
      orderPrice <= 0
    ) {
      return res.status(400).json({
        message: "Invalid order details",
      });
    }

    if (mode !== "BUY" && mode !== "SELL") {
      return res.status(400).json({
        message: "Invalid order mode",
      });
    }

    // =========================
    // FIND USER'S FUNDS
    // =========================

    let funds = await FundsModel.findOne({
      userId: req.userId,
    });

    if (!funds) {
      funds = new FundsModel({
        userId: req.userId,
        balance: 50000,
      });

      await funds.save();
    }

    // =========================
    // FIND USER'S HOLDING
    // =========================

    let holding = await HoldingsModel.findOne({
      userId: req.userId,
      name,
    });

    // =========================
    // BUY VALIDATION
    // =========================

    if (mode === "BUY") {
      if (funds.balance < orderValue) {
        return res.status(400).json({
          message: `Insufficient funds. Available balance: ₹${funds.balance.toFixed(
            2
          )}`,
        });
      }
    }

    // =========================
    // SELL VALIDATION
    // =========================

    if (mode === "SELL") {
      if (!holding) {
        return res.status(400).json({
          message: `You don't own any ${name} shares`,
        });
      }

      if (holding.qty < quantity) {
        return res.status(400).json({
          message: `You only have ${holding.qty} shares of ${name}`,
        });
      }
    }

    // =========================
    // SAVE ORDER
    // =========================

    const newOrder = new OrdersModel({
      userId: req.userId,
      name,
      qty: quantity,
      price: orderPrice,
      mode,
    });

    await newOrder.save();

    // =========================
    // UPDATE FUNDS
    // =========================

    if (mode === "BUY") {
      funds.balance -= orderValue;
    }

    if (mode === "SELL") {
      funds.balance += orderValue;
    }

    await funds.save();

    // =========================
    // UPDATE HOLDINGS
    // =========================

    if (mode === "BUY") {
      if (holding) {
        const oldValue = holding.avg * holding.qty;
        const newValue = orderPrice * quantity;
        const newQty = holding.qty + quantity;

        holding.avg =
          (oldValue + newValue) / newQty;

        holding.qty = newQty;
        holding.price = orderPrice;

        await holding.save();
      } else {
        holding = new HoldingsModel({
          userId: req.userId,
          name,
          qty: quantity,
          avg: orderPrice,
          price: orderPrice,
          net: "0.00%",
          day: "0.00%",
        });

        await holding.save();
      }
    }

    if (mode === "SELL") {
      holding.qty -= quantity;
      holding.price = orderPrice;

      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({
          userId: req.userId,
          name,
        });
      } else {
        await holding.save();
      }
    }

    // =========================
    // UPDATE POSITIONS
    // =========================

    let position = await PositionsModel.findOne({
      userId: req.userId,
      name,
    });

    if (mode === "BUY") {
      if (position) {
        const oldValue =
          position.avg * position.qty;

        const newValue =
          orderPrice * quantity;

        const newQty =
          position.qty + quantity;

        position.avg =
          (oldValue + newValue) / newQty;

        position.qty = newQty;
        position.price = orderPrice;
      } else {
        position = new PositionsModel({
          userId: req.userId,
          product: "CNC",
          name,
          qty: quantity,
          avg: orderPrice,
          price: orderPrice,
          net: "0.00%",
          day: "0.00%",
          isLoss: false,
        });
      }

      await position.save();
    }

    if (mode === "SELL") {
      if (position) {
        position.qty -= quantity;
        position.price = orderPrice;

        if (position.qty <= 0) {
          await PositionsModel.deleteOne({
            userId: req.userId,
            name,
          });
        } else {
          const pnl =
            (position.price - position.avg) *
            position.qty;

          position.net = "0.00%";
          position.day = "0.00%";
          position.isLoss = pnl < 0;

          await position.save();
        }
      }
    }

    // =========================
    // RESPONSE
    // =========================

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
      balance: funds.balance,
    });

  } catch (error) {
    console.error("Order error:", error);

    res.status(500).json({
      message: "Failed to place order",
    });
  }
});

app.get("/allOrders", authenticateUser, async (req, res) => {
  try {
    const orders = await OrdersModel.find({
      userId: req.userId,
    }).sort({ _id: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});

app.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await UserModel.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    console.error("Authentication error:", error);

    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
});


app.delete("/remove-old-positions", authenticateUser, async (req, res) => {
  try {
    const result = await PositionsModel.deleteMany({
      userId: req.userId,
      name: {
        $in: ["EVEREADY", "JUBLFOOD"],
      },
    });

    res.json({
      message: "Old positions removed successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Remove old positions error:", error);

    res.status(500).json({
      message: "Failed to remove old positions",
    });
  }
});

app.post("/syncPositions", authenticateUser, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({
      userId: req.userId,
    });

    // Remove existing positions for this user
    await PositionsModel.deleteMany({
      userId: req.userId,
    });

    // Create positions from current holdings
    const positions = holdings.map((holding) => ({
      userId: req.userId,
      product: "CNC",
      name: holding.name,
      qty: holding.qty,
      avg: holding.avg,
      price: holding.price,
      net: holding.net || "0.00%",
      day: holding.day || "0.00%",
      isLoss: false,
    }));

    if (positions.length > 0) {
      await PositionsModel.insertMany(positions);
    }

    res.json({
      message: "Positions synchronized successfully",
      count: positions.length,
    });
  } catch (error) {
    console.error("Position sync error:", error);

    res.status(500).json({
      message: "Failed to synchronize positions",
    });
  }
});

app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
});