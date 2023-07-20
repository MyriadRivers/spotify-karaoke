import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import SongSearch from './components/SongSearch';

const client_id = '269d6b0c0ffe4e32b0d055155b0f8e82';
const redirect_uri = "http://localhost:3000/"

const api = SpotifyApi.withUserAuthorization(
  client_id, redirect_uri
);

const auth = async () => {
  await api.authenticate();
}

auth();

function App() {
  return (
    <div className="App">
      <SongSearch api={api}/>
    </div>
  );
}

export default App;
