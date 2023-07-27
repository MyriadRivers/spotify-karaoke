import { styled } from "styled-components";

const LyricsDisplayStyled = styled.div`
    background: salmon;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .lyrics {
        background: lime;
        white-space: pre-line;
        overflow: auto;
    }
`

const LyricsDisplay = ({lyrics, audio}: {lyrics: string, audio: string}) => {
    return (
        <LyricsDisplayStyled>
            <div className="lyrics">
                {lyrics}
            </div>
            <audio controls src={audio}></audio>
        </LyricsDisplayStyled>
    )
}

export default LyricsDisplay;