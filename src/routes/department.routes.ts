import {Router} from "express";
import {create, get_one, get_all, remove, update} from "../controllers/department.controller";

const router = Router();

// Create new department
router.post("/", create);

// Find one
router.get("/:id", get_one);

// Find all
router.get("/", get_all);

// Delete department
router.delete("/:id", remove);

// Set head department
router.put("/:id", update);

export default router;
