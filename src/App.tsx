import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import GlobalStyles from './styles/Global';
import { ThemeProvider, styled } from 'styled-components';

import { useState } from 'react';

import SongSearch from './components/SongSearch/SongSearch';
import LyricsDisplay from './components/LyricsDisplay';
import { Word } from './types';
import TitleBar from './components/TitleBar';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from "./aws-exports"
import { spotifyGreen } from './styles/themes';

// const client_id = '269d6b0c0ffe4e32b0d055155b0f8e82';
// const redirect_uri = "https://main.d1tjf0r777xvgj.amplifyapp.com/"
// const redirect_uri = "https://localhost:3000/"

Amplify.configure(awsExports);
Auth.configure(awsExports);

// const api = SpotifyApi.withUserAuthorization(
//   client_id, redirect_uri
// );

// const auth = async () => {
//   await api.authenticate();
// }

// auth();

const AppContainer = styled.div`
  /* background: purple; */
  height: 100%;
  // Maybe have width scale with window dimensions in realtime rather than a binary option; more reactive change to window resizing 
  width: ${window.innerWidth < window.innerHeight ? "100vw" : "75vw"};

  margin: auto;
  box-sizing: border-box;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  gap: 20px;
`

function App() {
  const [status, setStatus] = useState("ok");
  const [lyrics, setLyrics] = useState<Array<Array<Word>>>([]);
  const [audio, setAudio] = useState("")

  return (
    <ThemeProvider theme={spotifyGreen}>
      <div className="App">
        <GlobalStyles />
        <AppContainer>
          <TitleBar text={"SPOTIFY KARAOKE"}/>
          <SongSearch setLyrics={setLyrics} setStatus={setStatus} setAudio={setAudio}/>
          <LyricsDisplay lyrics={lyrics} audio={audio} status={status}/>
        </AppContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
