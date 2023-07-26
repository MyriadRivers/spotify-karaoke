import { Image } from "@spotify/web-api-ts-sdk";

type SongInfo = {
    name: String,
    artists: String[],
    image: Image
    id: String
}

export default SongInfo;