import mongoose, { Schema } from "mongoose";


const productSchema = new mongoose.Schema({
      productName: {
        type: String,
        required: true
    }, 
    productPhoto: {
        type: String,
    },
    productQuantity: {
        type: String,
        required: [true, 'There is no fun without nay thumbnail']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
   
},{timestamps: true});

export const Product = mongoose.model("Product", productSchema);