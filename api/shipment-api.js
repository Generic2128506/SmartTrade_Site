import http from './http';

/*
  Shipment
 */
export const order = async (data) => {
  const response = await http.post('/shipment/order', data);
  return response.data;
};
