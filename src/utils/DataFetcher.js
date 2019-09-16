import axios from 'axios';

const url = process.env.REACT_APP_REPORT_SERVER_ENDPOINT || '';
const urlAuth = process.env.REACT_APP_AUTHORIZATION_ENDPOINT || '';

export default {
  getRegisteredFeed() {
    return axios.get(`${url}/api/registeredFeed/feeds`);
  },

  getFeedInStorage() {
    return axios.get(`${url}/api/inStorage/feeds`);
  },

  getRegisteredSubstrates() {
    return axios.get(`${url}/api/registeredSubstrate/substrates`);
  },

  getSubstratesInStorage() {
    return axios.get(`${url}/api/inStorage/substrates`);
  },

  getRegisteredEquipment() {
    return axios.get(`${url}/api/carryUnits`);
  },

  getOperations() {
    return axios.get(`${url}/api/operations`);
  },

  getFCRBarChart() {
    return axios.get(`${url}/performance/fcr-chart`);
  },

  getFCRTable() {
    return axios.get(`${url}/api/performance/fcr`);
  },

  getHatchRate() {
    return axios.get(`${url}/api/performance/hatchRate`);
  },

  getYield() {
    return axios.get(`${url}/api/performance/yield`);
  },

  getYieldBarChart() {
    return axios.get(`${url}/performance/yield-chart`);
  },

  resetPassword(email) {
    return axios.post(`${urlAuth}/api/userAuths/resetPasswordRequest`, { email });
  },
};
