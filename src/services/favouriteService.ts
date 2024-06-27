import { ArtistService } from "./artistService";
import { AlbumService } from "./albumService";
import { TrackService } from "./trackService";
import { Favorites } from "../models/interfaces/favourites";

let favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};

export class FavoriteService {
  static getFavorites(): Favorites {
    return favorites;
  }

  static addArtistToFavorites(artistId: string): boolean {
    const artist = ArtistService.getArtistById(artistId);
    if (artist && !favorites.artists.includes(artistId)) {
      favorites.artists.push(artistId);
      return true;
    }
    return false;
  }

  static removeArtistFromFavorites(artistId: string): boolean {
    const index = favorites.artists.indexOf(artistId);
    if (index > -1) {
      favorites.artists.splice(index, 1);
      return true;
    }
    return false;
  }

  static addAlbumToFavorites(albumId: string): boolean {
    const album = AlbumService.getAlbumById(albumId);
    if (album && !favorites.albums.includes(albumId)) {
      favorites.albums.push(albumId);
      return true;
    }
    return false;
  }

  static removeAlbumFromFavorites(albumId: string): boolean {
    const index = favorites.albums.indexOf(albumId);
    if (index > -1) {
      favorites.albums.splice(index, 1);
      return true;
    }
    return false;
  }

  static addTrackToFavorites(trackId: string): boolean {
    const track = TrackService.getTrackById(trackId);
    if (track && !favorites.tracks.includes(trackId)) {
      favorites.tracks.push(trackId);
      return true;
    }
    return false;
  }

  static removeTrackFromFavorites(trackId: string): boolean {
    const index = favorites.tracks.indexOf(trackId);
    if (index > -1) {
      favorites.tracks.splice(index, 1);
      return true;
    }
    return false;
  }
}
