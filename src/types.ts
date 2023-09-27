import { Image } from "@spotify/web-api-ts-sdk";

export type SongInfo = {
    name: string,
    artists: string[],
    image: Image,
    /**
     * Length of song in seconds.
     */
    duration: number,
    id: string
}

export type Song = {
    name: string,
    artists: string[],
    duration: number,
    id: string,
    lyrics: {},
    url: string
}