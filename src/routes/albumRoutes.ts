import express from "express";
import { AlbumController } from "../controllers/albumController";
import { validateAlbum } from "../models/dto/album";

const router = express.Router();

router.get("/", AlbumController.getAllAlbums);

router.get("/:id", AlbumController.getAlbumById);

router.post("/", validateAlbum, AlbumController.createAlbum);

router.put("/:id", validateAlbum, AlbumController.updateAlbumById);

router.delete("/:id", AlbumController.deleteAlbumById);

export default router;
