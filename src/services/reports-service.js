import config from '../config';
import TokenService from './token-service';



const getMonthlyReport = function (year, month) {

  return fetch(`${config.API_ENDPOINT}/reports/${year}/${month}`, {
    method: 'GET',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
    },
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  });
};


export default {
  getMonthlyReport,
}
