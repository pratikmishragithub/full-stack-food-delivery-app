import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData:{type:Object,default:{}}
}, { minimize: false })  //for creating empty cart data.

const userModel = mongoose.models.user || mongoose.model("user", userSchema);  //if model not created then it will create model otherwise use predefined model.
export default userModel;