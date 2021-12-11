import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import Home from './components/home'
import TeamList from "./components/clientes/teamList";
import DetailTeam from "./components/clientes/detailTeam";

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
              <Route index element={<Home mensaje="View of players <pending>" />} />
              <Route path=":id" element={<Home mensaje="View of players <pending>" />} />
            </Route>

            <Route path="incidents" >
              <Route index element={<Home mensaje="View of incidents <pending>" />} />
              <Route path=":id" element={<Home mensaje="View of incidents <pending>" />} />
            </Route>

            <Route path="matchs" >
              <Route index element={<Home mensaje="View of matchs <pending>" />} />
              <Route path=":id" element={<Home mensaje="View of matchs <pending>" />} />
            </Route>

            <Route path="shots" >
              <Route index element={<Home mensaje="View of shots <pending>" />} />
              <Route path=":id" element={<Home mensaje="View of shots <pending>" />} />
            </Route>

          </Routes>
        </div>

      </BrowserRouter >
    </div >
  );
}

export default App;