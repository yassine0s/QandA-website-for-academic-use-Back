import {RequestHandler} from "express";
import {teacher_model} from "../models/teacher.model";

// Create new teacher
export const create : RequestHandler = (req, res) => {
    const {bio, email, last_name, name} = req.body;
    try {
        teacher_model.create({bio, email, last_name, name})
            .then(data =>
                res.status(200).send({
                    data, status:200, success:true, message: "User added successfully!",
                })
            )
            .catch(error =>
                res.status(400).send({
                    error, status: 400, success: false, message: "Could not create user with id=" + email,
                })
            )
    } catch (error) {
        res.status(500).send({
            error, status: 500, success: false, message: "Internal Server Error!"
        });
    }
}

// Delete teacher
export const remove : RequestHandler = (req, res) => {
    const {email} = req.params;
    teacher_model.findOneAndDelete({email})
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data, status, success: !!data, message: data ? "User deleted" : "User doesn't exist."
            });
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}

// Update teacher
export const update : RequestHandler = (req, res) => {
    const {email} = req.params;
    const {last_name, name, bio, active, department, subject} = req.body;
    teacher_model.findOneAndUpdate({email}, {
        last_name,
        name,
        bio,
        active,
        department,
        subject
    }, {useFindAndModify: false})
        .then(data => {
                const status = data ? 200 : 404;
                res.status(status).send({
                    data, status, success: !!data, message: data ? "User updated!" : "User doesn't exist.",
                })
            }
        )
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );

}

// Find one
export const get_one : RequestHandler = (req, res) => {
    const {email} = req.params;
    teacher_model.findOne({email})
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data,
                message: data ? "User found!" : "User doesn't exist."
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}

// Get all
export const get_all : RequestHandler = (req, res) => {
    teacher_model.find({})
        .then(data => {
            const status = data.length ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data.length,
                message: data.length ? "All users!" : "Database empty",
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}

