import { Image } from "@spotify/web-api-ts-sdk";

type SongInfo = {
    name: String,
    artists: String[],
    image: Image
}

export default SongInfo;