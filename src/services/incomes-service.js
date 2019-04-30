import config from '../config';
import TokenService from './token-service';

const getAllIncomes = function () {

  return fetch(`${config.API_ENDPOINT}/incomes`, {
    method: 'GET',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
    },
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  });
};

const getIncome = function (id) {

  return fetch(`${config.API_ENDPOINT}/incomes/${id}`, {
    method: 'GET',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
    },
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  });
};

const createIncome = function (payload) {

  return fetch(`${config.API_ENDPOINT}/incomes`, {
    method: 'POST',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
      "content-type"  : "application/json"
    },
    body: JSON.stringify(payload),
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  });
};

const updateIncome = function (id, payload) {

  return fetch(`${config.API_ENDPOINT}/incomes/${id}`, {
    method: 'PATCH',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
      "content-type"  : "application/json"
    },
    body: JSON.stringify(payload),
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  });
};

const deleteIncome = function (id) {

  return fetch(`${config.API_ENDPOINT}/incomes/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
    },
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  });
};

export {
  getAllIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
}
