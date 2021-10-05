import http from './http';

export const orders = async () => {
  const result = await http.get('/orders');
  return result.data;
};

export const readyBoxes = async (sortingId) => {
  const result = await http.get('/orders/ready/boxes', {
    params: { sortingId },
  });
  return result.data;
};

export const readyItems = async (boxId) => {
  const result = await http.get('/orders/ready/items', {
    params: {
      boxId,
    },
  });
  return result.data;
};

export const readyTotals = async () => {
  const result = await http.get('/orders/ready/totals');
  return result.data;
};

export const states = async (query) => {
  const result = await http.post('/orders/states', query);
  return result.data;
};
