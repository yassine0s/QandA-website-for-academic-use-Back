import {Router} from "express";
import {create, get_all, get_one, remove, update} from "../controllers/teacher.controller";

const router = Router();

// Create new teacher
router.post("/", create);

// Delete teacher
router.delete("/:email", remove);

// Update teacher
router.put("/:email", update);

// Find one
router.get("/:email", get_one);

// Find all
router.get("", get_all);

export default router;
