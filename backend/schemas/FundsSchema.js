const { Schema } = require("mongoose");

const FundsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    balance: {
      type: Number,
      default: 50000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { FundsSchema };