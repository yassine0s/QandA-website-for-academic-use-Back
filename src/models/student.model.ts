import {model, Schema} from "mongoose";

interface IStudent {
    email: string;
    name: string;
    last_name: string;
    bio?: string;
    banned: boolean;
}

const schema = new Schema<IStudent>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    last_name: {type: String, required: true},
    bio: {type: String},
    banned: {type: Boolean, default: false},
}, {timestamps: true, autoIndex: true});

export const student_model = model<IStudent>("student", schema);
