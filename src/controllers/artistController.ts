import { Request, Response } from "express";
import { ArtistService } from "../services/artistService";
import { validateUUID } from "../utils/validate";
import { ArtistDto } from "../models/dto/artist";
import { Artist } from "../models/interfaces/artist";

export class ArtistController {
  static getAllArtist(req: Request, res: Response): void {
    const artistData = ArtistService.getAllArtists();
    res.status(200).json(artistData || []);
  }

  static getArtistById(req: Request, res: Response): void {
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid User Id" });
      return;
    }
    const artist = ArtistService.getArtistById(id);
    if (!artist) {
      res.status(404).json({ message: "Artist not found" });
      return;
    }
    res.status(200).json(artist);
  }

  static createArtist(req: Request, res: Response): void {
    const { name, grammy } = req.body as ArtistDto;
    const artist = ArtistService.createArtist(name, grammy);
    res.status(201).json(artist);
  }

  static updateArtistById(req: Request, res: Response): void {
    const { name, grammy } = req.body as Artist;
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid User Id" });
      return;
    }
    const artist = ArtistService.updateArtistById(id, name, grammy);
    if (!artist) {
      res.status(404).json({ message: "Artist not found" });
      return;
    }
    res.status(200).json(artist);
  }

  static deleteArtistById(req: Request, res: Response): void {
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid User Id" });
      return;
    }
    const user = ArtistService.deleteArtistById(id);
    if (!user) {
      res.status(404).json({ message: "Artist not found" });
      return;
    }
    res.status(204).send(`Artist with id: ${id} deleted`);
  }
}
