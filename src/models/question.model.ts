import {model, Schema} from "mongoose";

export interface IQuestion {
    content: string;
    user: string; // email of the user
    solved: boolean;
    hidden: boolean;
    department_id: string;
    subject_id: string;
    subject_sid: string;
    title: string;
}

const schema = new Schema<IQuestion>({
    content: {type: String, required: true},
    user: {type: String, required: true},
    solved: {type: Boolean, default: false},
    hidden: {type: Boolean, default: false},
    department_id: {type: String, required: true},
    subject_id: {type: String, required: true},
    votes: {type: Number, default: 0},
    title: {type: String, required: true}
}, {timestamps: true, autoIndex: true});

export const question_model = model<IQuestion>("question", schema);

