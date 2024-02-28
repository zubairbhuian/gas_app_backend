import mongoose, { Schema } from "mongoose";

const gasBannerSchema=new Schema({
    imgURL:{
        type:String,
        default:''
    },
},
{timestamps :true}// when this data create or update
);


export const GasBannerMolel =mongoose.model('gasBanner',gasBannerSchema)
