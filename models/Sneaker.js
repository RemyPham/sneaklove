const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ref: {
        type: String,
        required: true
    },
    sizes: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["men", "women", "kids"],
        required: true
    },
    id_tags: {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true
    },
    imgPath: {
        type: String,
        required: true
    }
})

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;