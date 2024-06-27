import { v4 as uuidv4 } from "uuid";
import { FavoriteService } from "./favouriteService";
import { Album } from "../models/interfaces/album";

let albums: Album[] = [];

export class AlbumService {
  static getAllAlbums(): Album[] {
    return albums;
  }

  static getAlbumById(id: string): Album | undefined {
    return albums.find((album) => album.id === id);
  }

  static createAlbum(
    name: string,
    year: number,
    artistId: string | null
  ): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId,
    };
    albums.push(newAlbum);
    return newAlbum;
  }

  static updateAlbum(
    id: string,
    name: string,
    year: number,
    artistId: string | null
  ): Album | null {
    const album = albums.find((album) => album.id === id);
    if (album) {
      album.name = name;
      album.year = year;
      album.artistId = artistId;
      return album;
    }
    return null;
  }

  static deleteAlbum(id: string): boolean {
    const albumIndex = albums.findIndex((album) => album.id === id);
    if (albumIndex > -1) {
      albums.splice(albumIndex, 1);
      FavoriteService.removeAlbumFromFavorites(id);
      return true;
    }
    return false;
  }

  static nullifyArtistInAlbums(artistId: string): void {
    albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
