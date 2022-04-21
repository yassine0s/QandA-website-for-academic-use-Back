import {model, Schema} from "mongoose";

interface IAnswer {
    content: string;
    user: string; // email of the user
    approved: boolean; // only teacher can approve
    question_id: string;
    credibility: number;
}

const schema = new Schema<IAnswer>({
    content: {type: String, required: true},
    user: {type: String, required: true},
    approved: {type: Boolean, default: false},
    question_id: {type: String, required: true},
    credibility: {type: Number, default: 0},
}, {timestamps: true, autoIndex: true});

export const answer_model = model<IAnswer>("answer", schema);
