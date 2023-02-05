import axios from "axios";

const instance = axios.create({
  baseURL: "https://mks-challenge-api-frontend.herokuapp.com/api/v1",
});

export default instance;
