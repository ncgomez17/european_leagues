import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import Home from './components/home'
import TeamList from "./components/clientes/team/teamList";
import DetailTeam from "./components/clientes/team/detailTeam";
import PlayerList from "./components/clientes/player/playerList";
import DetailPlayer from "./components/clientes/player/detailPlayer";
import IncidentList from "./components/clientes/incident/incidentList";
import DetailIncident from "./components/clientes/incident/detailIncident";
import MatchList from "./components/clientes/match/matchList";
import DetailMatch from "./components/clientes/match/detailMatch";
import ShotList from "./components/clientes/shot/shotList";
import DetailShot from "./components/clientes/shot/detailShot";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
//import './App.css';

function App() {
  return (
    <div>

      <BrowserRouter>

        <nav className="flex">
          <NavLink to="/" className="px-5 py-3 no-underline text-900 text-xl border-bottom-2 border-300 hover:border-500">Home</NavLink>
          <NavLink to="/teams" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Teams</NavLink>
          <NavLink to="/players" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Players</NavLink>
          <NavLink to="/incidents" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Incidents</NavLink>
          <NavLink to="/matchs" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Matchs</NavLink>
          <NavLink to="/shots" className="px-5 py-3 no-underline text-700 text-xl border-bottom-2 border-300 hover:border-500">Shots</NavLink>
        </nav>

        <div className="p-5">
          <Routes>
            <Route path="/" element={<Home mensaje="HomePage" />} />
            <Route path="teams" >
              <Route index element={<TeamList />} />
              <Route path="new" element={<DetailTeam />} />
              <Route path=":id" element={<DetailTeam />} />
            </Route>

            <Route path="players" >
              <Route index element={<PlayerList/>} />
              <Route path="new" element={<DetailPlayer/>} />
              <Route path=":id" element={<DetailPlayer/>} />
            </Route>

            <Route path="incidents" >
              <Route index element={<IncidentList/>} />
              <Route path="new" element={<DetailIncident/>} />
              <Route path=":id" element={<DetailIncident/>} />
            </Route>

            <Route path="matchs" >
              <Route index element={<MatchList/>} />
              <Route path="new" element={<DetailMatch/>} />
              <Route path=":id" element={<DetailMatch/>} />
            </Route>

            <Route path="shots" >
            <Route index element={<ShotList/>} />
              <Route path="new" element={<DetailShot/>} />
              <Route path=":id" element={<DetailShot/>} />
            </Route>

          </Routes>
        </div>

      </BrowserRouter >
    </div >
  );
}

export default App;