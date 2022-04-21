import {RequestHandler} from "express";
import {department_model} from "../models/department.model";
import {ISubject, subject_model} from "../models/subject.model";


export const create: RequestHandler = (req, res) => {
    const {department_id, name} : ISubject = req.body;
    // Find department first
    department_model.findById(department_id)
        .then(department => {
            if (department) {
                subject_model.create({name, department_id})
                    .then(data =>
                        res.status(200).send({
                            data, status: 200, success: true, message: "Subject created successfully!",
                        })
                    )
                    .catch(error => // Wrong input
                        res.status(400).send({
                            error, status: 400, success: false, message: "Could not create subject!",
                        })
                    );
            } else { // Department doesn't exist
                res.status(404).send({
                    status: 404, success: false, message: "Department doesn't exist!",
                });
            }
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Internal Server Error!"
            }));



};

export const get_one: RequestHandler = (req, res) => {
    const {id} = req.params;
    subject_model.findById(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data,
                message: data ? "Subject found!" : "Subject doesn't exist."
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
};

export const get_all: RequestHandler = (req, res) => {
    const {id} = req.params; // id of the department
    // Find department
    department_model.findById(id)
        .then(data => {
            if (data) { // Department exist
                subject_model.find({department_id: id})
                    .then(data => {
                        const status = data.length ? 200 : 404;
                        res.status(status).send({
                            data,
                            status,
                            success: !!data.length,
                            message: data.length ? "All subjects!" : "Database empty",
                        })
                    })
            } else { // Department doesn't exist
                res.status(404).send({
                    status: 404, success: false, message: "Department doesn't exist!",
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        });

};

export const remove: RequestHandler = (req, res) => {
    const {id} = req.params;
    subject_model.findByIdAndRemove(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data, status, success: !!data, message: data ? "Subject deleted" : "Subject doesn't exist."
            });
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
};
