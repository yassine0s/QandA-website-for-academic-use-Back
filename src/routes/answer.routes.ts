import {Router} from "express";
import {create, get_all, get_one, remove} from "../controllers/answer.controller";


const router = Router();

// Publish answer
router.post("/", create);

// Get one
router.get("/get_one/:id", get_one);

// Get all
router.get("/get_all/:id", get_all);

// Delete one
router.delete("/:id", remove);

export default router;