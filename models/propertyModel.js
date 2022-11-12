const mongoose = require("mongoose");
const propertySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    price:{
        type:Number,
        required: [true, "please add price"],
    },
    location:{
        type: String,
        required: [true, "please add a location"],
    },
    image: {
        type: String,
      },
  },
  {
    timestamps: true,
  }
);

propertyModel = mongoose.model("Property", propertySchema);
module.exports = propertyModel;