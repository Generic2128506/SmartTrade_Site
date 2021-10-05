import http from './http';

export const invoices = async (params) => {
  const result = await http.get('/invoices', { params });
  return result.data;
};

export const invoiceDetails = async (invoiceId) => {
  const result = await http.get('/invoices/details', { params: { invoiceId } });
  return result.data;
};
