import {model, Schema} from "mongoose";

export interface IAnswer {
    content: string;
    user: string; // email of the user
    votes: number; 
    question_id: string;
}

const schema = new Schema<IAnswer>({
    content: {type: String, required: true},
    user: {type: String, required: true},
    votes: {type: Number, default: 0},
    question_id: {type: String, required: true},
}, {timestamps: true, autoIndex: true});

export const answer_model = model<IAnswer>("answer", schema);