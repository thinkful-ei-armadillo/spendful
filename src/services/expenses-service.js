import config from '../config';
import TokenService from './token-service';

const getAllExpenses = function () {

  return fetch(`${config.API_ENDPOINT}/expenses`, {
    method: 'GET',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
    },
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  });
};

const getExpense = function (id) {

  return fetch(`${config.API_ENDPOINT}/expenses/${id}`, {
    method: 'GET',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
    },
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  });
};

const createExpense = function (payload) {

  return fetch(`${config.API_ENDPOINT}/expenses`, {
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

const updateExpense = function (id, payload) {

  return fetch(`${config.API_ENDPOINT}/expenses/${id}`, {
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

const deleteExpense = function (id) {

  return fetch(`${config.API_ENDPOINT}/expenses/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
    },
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  });
};

export default {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
}
