import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import SongSearch from './components/SongSearch/SongSearch';
import GlobalStyles from './styles/Global';
import { styled } from 'styled-components';

import lyrics from './assets/lyrics.json'

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
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  gap: 20px;
`

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <AppContainer>
        <SongSearch api={api}/>
        {lyrics.text}
      </AppContainer>
    </div>
  );
}

export default App;
