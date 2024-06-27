import { Router } from "express";
import { TrackController } from "../controllers/trackController";
import { validateTrack } from "../models/dto/track";

const router = Router();

router.get("/", TrackController.getAllTracks);
router.get("/:id", TrackController.getTrackById);
router.post("/", validateTrack, TrackController.createTrack);
router.put("/:id", validateTrack, TrackController.updateTrack);
router.delete("/:id", TrackController.deleteTrack);

export default router;
