import { Request, Response } from "express";
import { AlbumService } from "../services/albumService";
import { validateUUID } from "../utils/validate";
import { AlbumDto } from "../models/dto/album";

export class AlbumController {
  static getAllAlbums(req: Request, res: Response): void {
    const albums = AlbumService.getAllAlbums();
    res.status(200).json(albums || []);
  }

  static getAlbumById(req: Request, res: Response): void {
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid Album Id" });
      return;
    }
    const album = AlbumService.getAlbumById(id);
    if (!album) {
      res.status(404).json({ message: "Album not found" });
      return;
    }
    res.status(200).json(album);
  }

  static createAlbum(req: Request, res: Response): void {
    const { name, year, artistId } = req.body as AlbumDto;
    const album = AlbumService.createAlbum(name, year, artistId);
    res.status(201).json(album);
  }

  static updateAlbumById(req: Request, res: Response): void {
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid Album Id" });
      return;
    }
    const { name, year, artistId } = req.body as AlbumDto;
    const updatedAlbum = AlbumService.updateAlbum(id, name, year, artistId);
    if (!updatedAlbum) {
      res.status(404).json({ message: "Album not found" });
      return;
    }
    res.status(200).json(updatedAlbum);
  }

  static deleteAlbumById(req: Request, res: Response): void {
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid Album Id" });
      return;
    }
    const album = AlbumService.deleteAlbum(id);
    if (!album) {
      res.status(404).json({ message: "Album not found" });
      return;
    }
    res.status(204).send(`Album with id: ${id} deleted`);
  }
}
