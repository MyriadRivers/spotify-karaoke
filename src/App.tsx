import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import GlobalStyles from './styles/Global';
import { styled } from 'styled-components';

import testLyrics from './assets/testLyrics.json'
import { useState } from 'react';

import SongSearch from './components/SongSearch/SongSearch';
import LyricsDisplay from './components/LyricsDisplay';
import { Word } from './types';
import TitleBar from './components/TitleBar';
import { Amplify } from 'aws-amplify';
import awsExports from "./aws-exports"

const client_id = '269d6b0c0ffe4e32b0d055155b0f8e82';
const redirect_uri = "https://main.d1tjf0r777xvgj.amplifyapp.com/"

Amplify.configure(awsExports);

const api = SpotifyApi.withUserAuthorization(
  client_id, redirect_uri
);

const auth = async () => {
  await api.authenticate();
}

auth();

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
  const [lyrics, setLyrics] = useState<Array<Array<Word>>>([]);
  const [audio, setAudio] = useState("")

  return (
    <div className="App">
      <GlobalStyles />
      <AppContainer>
        <TitleBar text={"SPOTIFY KARAOKE"}/>
        <SongSearch api={api} setLyrics={setLyrics} setAudio={setAudio}/>
        <LyricsDisplay lyrics={lyrics} audio={audio} />
      </AppContainer>
    </div>
  );
}

export default App;
