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

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllShots,
  getShot,
  createShot,
  updateShot,
  deleteShot
}