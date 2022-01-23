import clientREST from "./clientREST";

  const getAllShots = () => {
    return clientREST.get("/shot");
  }

  const getShot = (id) => {
    return clientREST.get(`/shot/${id}`);
  }

  const createShot = (shotDto) => {
    return clientREST.post("/shot", shotDto);
  }

  const updateShot = (shotDto) => {
    return clientREST.put("/shot", shotDto);
  }

  const deleteShot = (id) => {
    return clientREST.delete(`/shot/${id}`);
  }

  const searchShotByPlayerName = (playerName) => {
    return clientREST.get(`/shot/search/${playerName}`);
  }

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllShots,
  getShot,
  createShot,
  updateShot,
  deleteShot,
  searchShotByPlayerName
}