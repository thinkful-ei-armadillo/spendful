import config from '../config';
import TokenService from './token-service';

const getAllCategories = function () {

  return fetch(`${config.API_ENDPOINT}/categories`, {
    method: 'GET',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
    },
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  });
};

const getCategory = function (id) {

  return fetch(`${config.API_ENDPOINT}/categories/${id}`, {
    method: 'GET',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
    },
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json();
  });
};

const createCategory = function (payload) {

  return fetch(`${config.API_ENDPOINT}/categories`, {
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

const updateCategory = function (id, payload) {

  return fetch(`${config.API_ENDPOINT}/categories/${id}`, {
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

const deleteCategory = function (id) {

  return fetch(`${config.API_ENDPOINT}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization" : `bearer ${TokenService.getAuthToken()}`,
    },
  })
  .then(res =>{
    return (!res.ok) ? res.json().then(e => Promise.reject(e)) : true;
  });
};

export {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
