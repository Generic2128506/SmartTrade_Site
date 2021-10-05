import http from './http';

export const addUpdate = async (items) => {
  const result = await http.post('/basket/addUpdate', items);
  return result.data;
};

export const confirm = (items, isConfirmed) => {
  return http.post(
    '/basket/confirm',
    items.map((item) => ({ id: item.id, isConfirmed }))
  );
};

export const delete_ = (items) => {
  return http.post(
    '/basket/delete',
    items.map((item) => ({ id: item.id }))
  );
};

export const select = async () => {
  const result = await http.get('/basket/select');
  return result.data;
};

export const toOrder = () => {
  return http.post('/basket/toOrder');
};

export const order = () => {
  toOrder();
};
