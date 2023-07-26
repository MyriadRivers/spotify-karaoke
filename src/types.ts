import { Image } from "@spotify/web-api-ts-sdk";

type SongInfo = {
    name: string,
    artists: string[],
    image: Image
    /**
     * Length of song in seconds.
     */
    duration: number;
    id: string
}

export default SongInfo;