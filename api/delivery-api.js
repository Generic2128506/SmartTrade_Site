import http from './http';

export const deliveries = async (onlyActive, onlySorting) => {
  const result = await http.get('/delivery/deliveries', null, {
    params: {onlyActive: onlyActive, onlySorting: onlySorting}
  });
  return result.data;
};
