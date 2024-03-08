import mongoose, { Schema } from "mongoose";

const myproductSchema=new Schema({
    name:{
        type:String,
        required:[true,'name is missing'],
        trim:true, // empty space remove
        maxlenght:[31, 'Title should be under 31'],
    },
    description:{
        type:String,
        required:[true,'Description is missing'],
        trim:true,
    },
    weight:{
        type:String,
        required:[true,'weight is missing'],
        trim:true, // empty space remove
    },
    color:{
        type:String,
        required:[true,'color is missing'],
        trim:true, // empty space remove
    },
    price:{
        type:Number,
        required:[true,'price is missing'],
        trim:true, // empty space remove
    },
        Refillprice:{
        type:Number,
        required:[true,'price is missing'],
        trim:true, // empty space remove
    },
    rating:{
        type:Number,
        required:[true,'condition is missing'],
        trim:true, // empty space remove
    },
    img1:{
        type:String,
        default:"" // empty space remove
    },
    img2:{
        type:String,
        default:"" // empty space remove
    },
    img3:{
        type:String,
        default:"" // empty space remove
    },

},
{timestamps :true}// when this data create or update
);


export const MyProductMolel =mongoose.model('myProduct',myproductSchema)
