import { v4 as uuidv4 } from "uuid";
// import { AlbumService } from "./albumService";
// import { TrackService } from "./trackService";
// import { FavoriteService } from "./favoriteService";
import { Artist } from "../models/interfaces/artist";
import { AlbumService } from "./albumService";
import { TrackService } from "./trackService";
import { FavoriteService } from "./favouriteService";

let artists: Artist[] = [];

export class ArtistService {
  static getAllArtists(): Artist[] {
    return artists;
  }

  static getArtistById(id: string): Artist | undefined {
    return artists.find((artist) => artist.id === id);
  }

  static createArtist(name: string, grammy: boolean): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    artists.push(newArtist);
    return newArtist;
  }

  static updateArtistById(
    id: string,
    name: string,
    grammy: boolean
  ): Artist | null {
    const artist = artists.find((artist) => artist.id === id);
    if (artist) {
      artist.name = name;
      artist.grammy = grammy;
      return artist;
    }
    return null;
  }

  static deleteArtistById(id: string): boolean {
    const artistIndex = artists.findIndex((artist) => artist.id === id);
    if (artistIndex > -1) {
      artists.splice(artistIndex, 1);
      AlbumService.nullifyArtistInAlbums(id);
      TrackService.nullifyArtistInTracks(id);
      FavoriteService.removeArtistFromFavorites(id);
      return true;
    }
    return false;
  }
}
