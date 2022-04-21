import {RequestHandler} from "express";
import {department_model, IDepartment} from "../models/department.model";
import {teacher_model} from "../models/teacher.model";

// Create department
export const create: RequestHandler = (req, res) => {
    const {name,head_department,description}: IDepartment = req.body;
    teacher_model.findOne({email: head_department})
        .then(data => {
            if (data) { // if teacher exist
                department_model.create({name, head_department,description})
                    .then(data =>
                        res.status(200).send({
                            data, status: 200, success: true, message: "Department created successfully!",
                        })
                    )
                    .catch(error => // Wrong input
                        res.status(400).send({
                            error, status: 400, success: false, message: "Could not create department!",
                        })
                    );
            }
            // Teacher doesn't exist
            else {
                res.status(404).send({
                    status: 404, success: false, message: "Teacher doesn't exist!",
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                error, status: 500, success: false, message: "Internal Server Error!"
            })
        });
};

// Remove department
export const remove: RequestHandler = (req, res) => {
    const {id} = req.params;
    department_model.findByIdAndRemove(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data, status, success: !!data, message: data ? "Department deleted" : "Department doesn't exist."
            });
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
};

// Get all
export const get_all: RequestHandler = (req, res) => {
    department_model.find({})
        .then(data => {
            const status = data.length ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data.length,
                message: data.length ? "All Departments!" : "Database empty",
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );

};

// Find one
export const get_one: RequestHandler = (req, res) => {
    const {id} = req.params;
    department_model.findById(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data,
                message: data ? "Department found!" : "Department doesn't exist."
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
};

// Update head department or description
export const update: RequestHandler = async (req, res) => {
    const {id} = req.params;
    const {head_department,description} = req.body;
    teacher_model.findOne({email: head_department})
        .then(data => {
            if (data) { // if teacher exist
                department_model.findByIdAndUpdate(id, {head_department,description}, {useFindAndModify: false})
                    .then(data => {
                        const status = data ? 200 : 404;
                        res.status(status).send({
                            data,
                            status,
                            success: !!data,
                            message: data ? "Head department updated!" : "Department doesn't exist.",
                        })
                    })
                    .catch(error => // Wrong input
                        res.status(400).send({
                            error, status: 400, success: false, message: "Could not update department!",
                        })
                    );
            }
            // Teacher doesn't exist
            else {
                res.status(404).send({
                    status: 404, success: false, message: "Teacher doesn't exist!",
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                error, status: 500, success: false, message: "Internal Server Error!"
            })
        });


};
