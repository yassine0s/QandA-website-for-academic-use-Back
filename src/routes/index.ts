import {Router} from "express";
import teacherRoutes from "./teacher.routes";
import departmentRoutes from "./department.routes";
import subjectRoutes from "./subject.routes";
import questionRoutes from "./question.routes";

const BaseRouter = Router();

BaseRouter.use("/api/user/teacher", teacherRoutes);
BaseRouter.use("/api/department", departmentRoutes);
BaseRouter.use("/api/subject", subjectRoutes);
BaseRouter.use("/api/question", questionRoutes);

export default BaseRouter;
