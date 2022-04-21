import {model, Schema} from "mongoose";

export interface IDepartment {
    name: string;
    description: string;
    head_department: string; // email of the teacher
}


const schema = new Schema<IDepartment>({
    name : {type : String, required : true, unique: true},
    description : {type : String, required : true},
    head_department : {type: String, required: true, unique: true}
});

export const department_model = model<IDepartment>("department", schema);
