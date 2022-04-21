import {model, Schema} from "mongoose";

export interface ISubject {
    name: string;
    department_id: string;
}

const schema = new Schema<ISubject>({
    name: {type: String, required: true, unique: true},
    department_id: {type: String, required: true},
}, {timestamps: true, autoIndex: true});

export const subject_model = model<ISubject>("subject", schema);

