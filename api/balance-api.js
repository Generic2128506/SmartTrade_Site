import http from './http';

export const totals = async () => {
  const result = await http.get('/balance/totals');
  return result.data;
};
