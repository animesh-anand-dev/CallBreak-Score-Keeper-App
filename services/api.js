import axios from "axios";

const BACKEND_URL =
  "https://call-break-score-keeper-backend.onrender.com/api/v1";

export async function fetchAllGames(deviceID) {
  const requestBody = {
    deviceID: deviceID,
  };
  const response = await axios.post(BACKEND_URL + "/game", requestBody);
  return response;
}

export async function fetchAllScores(gameId) {
  const requestBody = {
    gameId: gameId,
  };
  const response = await axios.post(BACKEND_URL + "/allScore", requestBody);
  return response.data;
}

export async function fetchTotalScores(gameId) {
  const requestBody = {
    gameId: gameId,
  };
  const response = await axios.post(BACKEND_URL + "/score", requestBody);
  return response.data;
}

export async function addPlayers(playersData, device, deviceID) {
  const requestBody = {
    ...playersData,
    ...device,
    deviceID: deviceID,
  };
  console.log(requestBody);
  const response = await axios.post(BACKEND_URL + "/player", requestBody);
  return response.data;
}

export async function addRound(roundData) {
  const response = await axios.post(BACKEND_URL + "/round", roundData);
  return response.data;
}

export async function fetchRound(roundID) {
  const requestBody = {
    roundID: roundID,
  };
  const response = await axios.post(BACKEND_URL + "/roundStatus", requestBody);
  return response.data;
}

export async function updateRound(roundData) {
  const response = await axios.put(BACKEND_URL + "/round", roundData);
  return response.data;
}
