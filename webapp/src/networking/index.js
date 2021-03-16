import axios from 'axios';

const endpoint = (path) => {
  return process.env.REACT_APP_API_URL + path;
};

export const getAllResultsFromEveryone = () => {
  return axios.get(endpoint('/results/everyone')).then((response) => response.data.data);
};

export const postResultForEveryone = (data) => {
  return axios.post(endpoint('/results/everyone'), data).then((response) => response.data.data);
};
