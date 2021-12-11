import clientREST from "./clientREST";

  const getAllTeams = () => {
    return clientREST.get("/team");
  }

  const getTeam = (id) => {
    return clientREST.get(`/team/${id}`);
  }

  const createTeam = (teamDto) => {
    return clientREST.post("/team", teamDto);
  }

  const updateTeam = (teamDto) => {
    return clientREST.put("/team", teamDto);
  }

  const deleteTeam = (id) => {
    return clientREST.delete(`/team/${id}`);
  }

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam
}