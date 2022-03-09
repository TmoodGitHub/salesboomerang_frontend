import http from '../http-common';
import authHeader from './auth-header';

const getAll = () => {
  return http.get('/housing');
};

const getSold = () => {
  return http.get('/housing/sold');
};

const getNotSold = () => {
  return http.get('/housing/notsold');
};

const get = (id) => {
  return http.get(`/housing/${id}`);
};

const create = (data) => {
  return http.post('/housing', data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/housing/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/housing/${id}`, { headers: authHeader() });
};

const findByTitle = (title) => {
  return http.get(`/housing?title=${title}`);
};

const HousingService = {
  getAll,
  getSold,
  getNotSold,
  get,
  create,
  update,
  remove,
  findByTitle,
};

export default HousingService;
