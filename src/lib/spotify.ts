import SpotifyWebApi from "spotify-web-api-node";

export class SpotifyAPI {
  private static instance: SpotifyWebApi;

  static getInstance(): SpotifyWebApi {
    if (!this.instance) {
      this.instance = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      });
    }
    return this.instance;
  }

  static async createPlaylist(
    userId: string,
    accessToken: string,
    name: string,
    description: string,
    tracks: string[]
  ) {
    const spotify = this.getInstance();
    spotify.setAccessToken(accessToken);

    try {
      const playlist = await spotify.createPlaylist(name, {
        description,
        public: false,
      });

      if (tracks.length > 0) {
        await spotify.addTracksToPlaylist(playlist.body.id, tracks);
      }

      return playlist.body;
    } catch (error) {
      console.error("Error creating playlist:", error);
      throw error;
    }
  }

  static async searchTracks(accessToken: string, query: string, limit = 20) {
    const spotify = this.getInstance();
    spotify.setAccessToken(accessToken);

    try {
      const results = await spotify.searchTracks(query, { limit });
      return results.body.tracks?.items || [];
    } catch (error) {
      console.error("Error searching tracks:", error);
      throw error;
    }
  }

  static async getRecommendations(
    accessToken: string,
    seedTracks: string[],
    seedArtists: string[] = [],
    limit = 20
  ) {
    const spotify = this.getInstance();
    spotify.setAccessToken(accessToken);

    try {
      const recommendations = await spotify.getRecommendations({
        seed_tracks: seedTracks.slice(0, 5),
        seed_artists: seedArtists.slice(0, 5),
        limit,
      });

      return recommendations.body.tracks;
    } catch (error) {
      console.error("Error getting recommendations:", error);
      throw error;
    }
  }

  static async getUserTopTracks(accessToken: string, limit = 20) {
    const spotify = this.getInstance();
    spotify.setAccessToken(accessToken);

    try {
      const topTracks = await spotify.getMyTopTracks({ limit });
      return topTracks.body.items;
    } catch (error) {
      console.error("Error getting user top tracks:", error);
      throw error;
    }
  }

  static async getUserTopArtists(accessToken: string, limit = 20) {
    const spotify = this.getInstance();
    spotify.setAccessToken(accessToken);

    try {
      const topArtists = await spotify.getMyTopArtists({ limit });
      return topArtists.body.items;
    } catch (error) {
      console.error("Error getting user top artists:", error);
      throw error;
    }
  }
} 