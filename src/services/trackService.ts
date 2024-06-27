import { v4 as uuidv4 } from "uuid";
import { Track } from "../models/interfaces/track";
import { FavoriteService } from "./favouriteService";

let tracks: Track[] = [];

export class TrackService {
  static getAllTracks(): Track[] {
    return tracks;
  }

  static getTrackById(id: string): Track | undefined {
    return tracks.find((track) => track.id === id);
  }

  static createTrack(
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number
  ): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name,
      artistId,
      albumId,
      duration,
    };
    tracks.push(newTrack);
    return newTrack;
  }

  static updateTrack(
    id: string,
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number
  ): Track | null {
    const track = tracks.find((track) => track.id === id);
    if (track) {
      track.name = name;
      track.artistId = artistId;
      track.albumId = albumId;
      track.duration = duration;
      return track;
    }
    return null;
  }

  static deleteTrack(id: string): boolean {
    const trackIndex = tracks.findIndex((track) => track.id === id);
    if (trackIndex > -1) {
      tracks.splice(trackIndex, 1);
      FavoriteService.removeTrackFromFavorites(id);
      return true;
    }
    return false;
  }

  static nullifyArtistInTracks(artistId: string): void {
    tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  static nullifyAlbumInTracks(albumId: string): void {
    tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
