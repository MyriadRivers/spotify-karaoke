import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import SongSearch from './components/SongSearch/SongSearch';
import GlobalStyles from './styles/Global';
import { styled } from 'styled-components';

import testLyrics from './assets/testLyrics.json'
import { useState } from 'react';

const client_id = '269d6b0c0ffe4e32b0d055155b0f8e82';
const redirect_uri = "http://localhost:3000/"

const api = SpotifyApi.withUserAuthorization(
  client_id, redirect_uri
);

const auth = async () => {
  await api.authenticate();
}

auth();

const AppContainer = styled.div`
  background: silver;
  height: 100%;
  width: 70%;

  margin: auto;
  box-sizing: border-box;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  gap: 20px;

  overflow: auto;
`

function App() {
  const [lyrics, setLyrics] = useState(testLyrics.text);

  return (
    <div className="App">
      <GlobalStyles />
      <AppContainer>
        <SongSearch api={api} setLyrics = {setLyrics}/>
        <div style={{whiteSpace: "pre-line"}}>
          {lyrics}
        </div>
      </AppContainer>
    </div>
  );
}

export default App;
