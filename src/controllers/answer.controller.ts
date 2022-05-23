import {RequestHandler} from "express";
import {answer_model, IAnswer} from "../models/answer.model";
import {question_model} from "../models/question.model";

export const create: RequestHandler = (req, res) => {
    const {content,user,question_id}: IAnswer = req.body;
    question_model.findById(question_id)
        .then(question => {
            if (question) {
                answer_model.create({content,user,question_id})
                    .then(data =>
                        res.status(200).send({
                            data, status: 200, success: true, message: "Answer published successfully!",
                        })
                    )
                    .catch(error => // Wrong input
                        res.status(400).send({
                            error, status: 400, success: false, message: "Could not publish answer!",
                        })
                    );
            } else { // Department doesn't exist
                res.status(404).send({
                    status: 404, success: false, message: "Question doesn't exist!",
                });
            }
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Internal Server Error!"
            }));
};


export const get_one : RequestHandler = (req, res) => {
    const {id} = req.params;
    answer_model.findById(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data,
                status,
                success: !!data,
                message: data ? "Answer found!" : "Answer doesn't exist."
            })
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
}


export const get_all: RequestHandler = (req, res) => {
    const {id} = req.params; // id of the question
    // Find department
    question_model.findById(id)
        .then(data => {
            if (data) { 
                answer_model.find({question_id: id})
                    .then(data => {
                        const status = data.length ? 200 : 404;
                        res.status(status).send({
                            data,
                            status,
                            success: !!data.length,
                            message: data.length ? "All answers!" : "Database empty",
                        })
                    })
            } else { 
                res.status(404).send({
                    status: 404, success: false, message: "Question doesn't exist!",
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
    answer_model.findByIdAndRemove(id)
        .then(data => {
            const status = data ? 200 : 404;
            res.status(status).send({
                data, status, success: !!data, message: data ? "Answer deleted" : "Answer doesn't exist."
            });
        })
        .catch(error =>
            res.status(500).send({
                error, status: 500, success: false, message: "Server side error!",
            })
        );
};