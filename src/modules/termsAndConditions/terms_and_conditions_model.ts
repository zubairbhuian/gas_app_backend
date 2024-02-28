import mongoose, { Schema } from "mongoose";

const termsAndConditionsSchema=new Schema({
    title:{
        type:String,
        required:[true,'Title is missing'],
        trim:true, // empty space remove
        maxlenght:[31, 'Title should be under 31'],
    },
    description:{
        type:String,
        required:[true,'Description is missing'],
        trim:true,
        maxlenght:[1000, 'Title should be under 31'],
    },
},
{timestamps :true}// when this data create or update
);


export const TermsAndConditionsMolel =mongoose.model('termsAndConditions',termsAndConditionsSchema)
