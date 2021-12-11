import clientREST from "./clientREST";

  const getAllPlayers = () => {
    return clientREST.get("/player");
  }

  const getPlayer = (id) => {
    return clientREST.get(`/player/${id}`);
  }

  const createPlayer = (playerDto) => {
    return clientREST.post("/player", playerDto);
  }

  const updatePlayer = (playerDto) => {
    return clientREST.put("/player", playerDto);
  }

  const deletePlayer = (id) => {
    return clientREST.delete(`/player/${id}`);
  }

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer
}