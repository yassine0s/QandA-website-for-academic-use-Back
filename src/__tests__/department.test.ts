import supertest from "supertest";
import app from "../utils/app";
import {clear, connect, close} from "./config/database";
import {Types} from "mongoose";
import {department_model, IDepartment} from "../models/department.model";
import {ITeacher, teacher_model} from "../models/teacher.model";

const mock_teacher: ITeacher = {
    department_id: null, subject_id: null,
    name: "Ali",
    bio: "Random Bio",
    email: "alisbiaazayen@gmail.com",
    last_name: "Sbiaa Zayen"
};

const mock_department: IDepartment = {
    head_department: "alisbiaazayen@gmail.com",
    name: "Department 1",
    description: "short description",
};

describe('Department',  () =>{
    // jest.setTimeout(30000);

    beforeAll(async () => await connect());
    afterEach(async () => await clear());
    afterAll(async () => await close());


    describe('/get_one /:id', () => {
        describe('given the department doesn\'t exist' , () => {
            it('should return 404', async () => {
                const id = Types.ObjectId().toString(); // generating a random string
                const {statusCode} = await supertest(app).get(`/api/department/${id}`);
                expect(statusCode).toBe(404);
            });
        })
        describe('given the department exist' , () => {
            it('should return 200', async () => {
                await teacher_model.create(mock_teacher);
                const temp_depart = await department_model.create(mock_department);
                const {statusCode} = await supertest(app).get(`/api/department/${temp_depart._id}`);
                expect(statusCode).toBe(200);
            });
        })
    })

    describe('/get_all', () => {
        describe('given the database is empty' , () => {
            it('should return 404', async () => {
                const {statusCode} = await supertest(app).get(`/api/department`);
                expect(statusCode).toBe(404);
            });
        })
        describe('given the database is not empty' , () => {
            it('should return 200', async () => {
                await teacher_model.create(mock_teacher);
                await department_model.create(mock_department);
                const {statusCode,body} = await supertest(app).get(`/api/department`);
                expect(statusCode).toBe(200);
                expect(body.data.length).toBe(1);
            });
        })
    })

    describe('/create', () => {
        describe('given a correct input' , () => {
            it('should return 200', async () => {
                await teacher_model.create(mock_teacher);
                const {statusCode} = await supertest(app)
                    .post(`/api/department`)
                    .send(mock_department);
                expect(statusCode).toBe(200);
            });
        })
        describe('given a wrong input' , () => {
            it('should return 400', async () => {
                await teacher_model.create(mock_teacher);
                const {statusCode} = await supertest(app)
                    .post(`/api/department`)
                    .send({head_department: "alisbiaazayen@gmail.com"});
                expect(statusCode).toBe(400);
            });
        })
        describe('given the teacher doesnt exist' , () => {
            it('should return 404', async () => {
                const {statusCode} = await supertest(app)
                    .post(`/api/department`)
                    .send(mock_department);
                expect(statusCode).toBe(404);
            });
        })
    })

    describe('/delete /:id', () => {
        describe('given the department exist' , () => {
            it('should return 200', async () => {
                await teacher_model.create(mock_teacher);
                const temp_depart = await department_model.create(mock_department);
                const {statusCode} = await supertest(app).delete(`/api/department/${temp_depart._id}`);
                expect(statusCode).toBe(200);
            });
        })
        describe('given the department doesnt exist' , () => {
            it('should return 404', async () => {
                const id = Types.ObjectId().toString(); // generating a random string
                const {statusCode} = await supertest(app).delete(`/api/department/${id}`);
                expect(statusCode).toBe(404);
            });
        })
    })

    describe('/update /:id', () => {
        describe('given the teacher doesnt exist' , () => {
            it('should return 404', async () => {
                // await teacher_model.create(mock_teacher);
                const temp_depart = await department_model.create(mock_department);
                const {statusCode} = await supertest(app)
                    .put(`/api/department/${temp_depart._id}`)
                    .send({head_department: "wronguser"});
                expect(statusCode).toBe(404);
            });
        })
        describe('given the department doesnt exist' , () => {
            it('should return 404', async () => {
                await teacher_model.create(mock_teacher);
                const id = Types.ObjectId().toString(); // generating a random string
                const {statusCode} = await supertest(app)
                    .put(`/api/department/${id}`)
                    .send({head_department: mock_teacher.email});
                expect(statusCode).toBe(404);
            });
        })
        describe('given the input is correct' , () => {
            it('should return 200', async () => {
                // create a user to avoid the 404 status error
                await teacher_model.create(mock_teacher);
                // create the model we want to update
                const temp_depart = await department_model.create({name: "New department name", head_department:"wronguser"});
                const {statusCode} = await supertest(app)
                    .put(`/api/department/${temp_depart._id}`)
                    .send({head_department: mock_teacher.email});
                expect(statusCode).toBe(200);
            });
        })
    })


});
