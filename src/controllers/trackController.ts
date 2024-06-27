import { Request, Response } from "express";
import { TrackService } from "../services/trackService";
import { validateUUID } from "../utils/validate";
import { TrackDto } from "../models/dto/track";

export class TrackController {
  static getAllTracks(req: Request, res: Response): void {
    const tracks = TrackService.getAllTracks();
    res.status(200).json(tracks || []);
  }

  static getTrackById(req: Request, res: Response): void {
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid Track Id" });
      return;
    }
    const track = TrackService.getTrackById(id);
    if (!track) {
      res.status(404).json({ message: "Track not found" });
      return;
    }
    res.status(200).json(track);
  }

  static createTrack(req: Request, res: Response): void {
    const { name, artistId, albumId, duration } = req.body as TrackDto;
    const track = TrackService.createTrack(name, artistId, albumId, duration);
    res.status(201).json(track);
  }

  static updateTrack(req: Request, res: Response): void {
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid Track Id" });
      return;
    }
    const { name, artistId, albumId, duration } = req.body as TrackDto;
    const updatedTrack = TrackService.updateTrack(
      id,
      name,
      artistId,
      albumId,
      duration
    );
    if (!updatedTrack) {
      res.status(404).json({ message: "Track not found" });
      return;
    }
    res.status(200).json(updatedTrack);
  }

  static deleteTrack(req: Request, res: Response): void {
    const id = req.params.id;
    if (!validateUUID(id)) {
      res.status(400).json({ message: "Invalid Track Id" });
      return;
    }
    const track = TrackService.deleteTrack(id);
    if (!track) {
      res.status(404).json({ message: "Track not found" });
      return;
    }
    res.status(204).send(`Track with id: ${id} deleted`);
  }
}
