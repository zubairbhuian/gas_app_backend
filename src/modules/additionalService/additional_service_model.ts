import mongoose, { Schema } from "mongoose";

const additionalServiceSchema=new Schema({
    title:{
        type:String,
        required:[true,'name is missing'],
        trim:true,
        maxlenght:[31, 'Title should be under 31'],
    },
    description:{
        type:String,
        required:[true,'Description is missing'],
        trim:true,
    },
    price:{
        type:Number,
        required:[true,'price is missing'],
        trim:true,
    },
},
{timestamps :true}
);


export const AdditionalService =mongoose.model('additionalService',additionalServiceSchema)
