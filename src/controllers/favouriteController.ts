import { Request, Response } from "express";
import { FavoriteService } from "../services/favouriteService";
import { validateUUID } from "../utils/validate";

export class FavoriteController {
  static getAllFavorites(req: Request, res: Response): void {
    const favorites = FavoriteService.getFavorites();
    res.status(200).json(favorites);
  }

  static addTrackToFavorites(req: Request, res: Response): void {
    const trackId = req.params.id;
    if (!validateUUID(trackId)) {
      res.status(400).json({ message: "Invalid Track Id" });
      return;
    }
    const result = FavoriteService.addTrackToFavorites(trackId);
    if (!result) {
      res.status(422).json({ message: "Track not found" });
    } else {
      res.status(201).json({ message: "Track added to favorites" });
    }
  }

  static removeTrackFromFavorites(req: Request, res: Response): void {
    const trackId = req.params.id;
    if (!validateUUID(trackId)) {
      res.status(400).json({ message: "Invalid Track Id" });
      return;
    }
    const result = FavoriteService.removeTrackFromFavorites(trackId);
    if (!result) {
      res.status(404).json({ message: "Track not in favorites" });
    } else {
      res.status(204).send();
    }
  }

  static addAlbumToFavorites(req: Request, res: Response): void {
    const albumId = req.params.id;
    if (!validateUUID(albumId)) {
      res.status(400).json({ message: "Invalid Album Id" });
      return;
    }
    const result = FavoriteService.addAlbumToFavorites(albumId);
    if (!result) {
      res.status(422).json({ message: "Album not found" });
    } else {
      res.status(201).json({ message: "Album added to favorites" });
    }
  }

  static removeAlbumFromFavorites(req: Request, res: Response): void {
    const albumId = req.params.id;
    if (!validateUUID(albumId)) {
      res.status(400).json({ message: "Invalid Album Id" });
      return;
    }
    const result = FavoriteService.removeAlbumFromFavorites(albumId);
    if (!result) {
      res.status(404).json({ message: "Album not in favorites" });
    } else {
      res.status(204).send();
    }
  }

  static addArtistToFavorites(req: Request, res: Response): void {
    const artistId = req.params.id;
    if (!validateUUID(artistId)) {
      res.status(400).json({ message: "Invalid Artist Id" });
      return;
    }
    const result = FavoriteService.addArtistToFavorites(artistId);
    if (!result) {
      res.status(422).json({ message: "Artist not found" });
    } else {
      res.status(201).json({ message: "Artist added to favorites" });
    }
  }

  static removeArtistFromFavorites(req: Request, res: Response): void {
    const artistId = req.params.id;
    if (!validateUUID(artistId)) {
      res.status(400).json({ message: "Invalid Artist Id" });
      return;
    }
    const result = FavoriteService.removeArtistFromFavorites(artistId);
    if (!result) {
      res.status(404).json({ message: "Artist not in favorites" });
    } else {
      res.status(204).send();
    }
  }
}
