import mongoose, { Schema } from "mongoose";

const notificationSchema=new Schema({
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
        maxlenght:[200, 'Title should be under 31'],
    },
    icon:{
        type:String,
        default:''
    },
},
{timestamps :true}// when this data create or update
);


export const NotificationMolel =mongoose.model('notifications',notificationSchema)
