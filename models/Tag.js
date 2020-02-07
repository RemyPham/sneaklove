const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    label: {
        type: String,
        unique: true,
        required: true,
    }
})

const tagModel = mongoose.model("Tag", tagSchema);

module.exports = tagModel;