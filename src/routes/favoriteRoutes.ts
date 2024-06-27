import { Router } from "express";
import { FavoriteController } from "../controllers/favouriteController";

const router = Router();

router.get("/", FavoriteController.getAllFavorites);
router.post("/track/:id", FavoriteController.addTrackToFavorites);
router.delete("/track/:id", FavoriteController.removeTrackFromFavorites);
router.post("/album/:id", FavoriteController.addAlbumToFavorites);
router.delete("/album/:id", FavoriteController.removeAlbumFromFavorites);
router.post("/artist/:id", FavoriteController.addArtistToFavorites);
router.delete("/artist/:id", FavoriteController.removeArtistFromFavorites);

export default router;
