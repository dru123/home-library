import express from "express";
import { ArtistController } from "../controllers/artistController";
import { validateArtist } from "../models/dto/artist";

const router = express.Router();

router.get("/", ArtistController.getAllArtist);

router.get("/:id", ArtistController.getArtistById);

router.post("/", validateArtist, ArtistController.createArtist);

router.put("/:id", validateArtist, ArtistController.updateArtistById);

router.delete("/:id", ArtistController.deleteArtistById);

export default router;
