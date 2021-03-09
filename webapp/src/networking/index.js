import axios from 'axios';

const endpoint = (path) => {
  return process.env.REACT_APP_API_URL + path;
};

export const getAllResults = () => {
  return axios.get(endpoint('/results')).then((response) => response.data.data);
};

export const postResult = (data) => {
  return axios.post(endpoint('/result'), data).then((response) => response.data.data);
};
