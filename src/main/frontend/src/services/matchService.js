import clientREST from "./clientREST";

  const getAllMatchs = () => {
    return clientREST.get("/match");
  }

  const getMatch = (id) => {
    return clientREST.get(`/match/${id}`);
  }

  const createMatch = (matchDto) => {
    return clientREST.post("/match", matchDto);
  }

  const updateMatch = (matchDto) => {
    return clientREST.put("/match", matchDto);
  }

  const deleteMatch = (id) => {
    return clientREST.delete(`/match/${id}`);
  }


/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllMatchs,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch
}