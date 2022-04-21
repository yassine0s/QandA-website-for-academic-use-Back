import {model, Schema} from "mongoose";

export interface ITeacher{
    email: string;
    name: string;
    last_name: string;
    bio?: string;
    department_id: string | null;
}

const schema = new Schema<ITeacher>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    last_name: {type: String, required: true},
    bio: {type: String},
    department_id: {type: String,default: null},
}, {timestamps: true, autoIndex: true});

export const teacher_model = model<ITeacher>("teacher", schema);
