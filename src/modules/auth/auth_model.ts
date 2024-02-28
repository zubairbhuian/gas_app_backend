import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IAuthModel extends Document {
    email: string;
    name: string;
    phone: string;
    password: string;
    addreass: string;
    photoURL: string;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

const authSchema = new Schema<IAuthModel>({
    name: {
        type: String,
        trim: true,
        required: [true, 'User Name is missing'],
        default: ''
    },
    email: {
        type: String,
        required: [true, 'User email is missing'],
        trim: true, // empty space remove
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    addreass: {
        type: String,
        trim: true,
        default: ''
    },
    password: {
        type: String,
        required: [true, 'User password is missing'],
        minlength: [6, 'User password should be at least 6 characters'],
        set: (value: string) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)),
    },
    photoURL: {
        type: String,
        default: ''
    },
}, { timestamps: true });

// Add comparePassword method
authSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

export const authModel = mongoose.model<IAuthModel>('users', authSchema);


