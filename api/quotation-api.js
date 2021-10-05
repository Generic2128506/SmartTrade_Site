import http from './http';

/*
  Quotation
 */
export const process = async (query, maxDays, quotationId) => {
  const response = await http.post('/quotation/process', query, {
    params: { maxDays: maxDays, quotationId: quotationId },
  });
  return response.data;
};

export const confirm = async (quotationId, data) => {
  await http.post('/quotation/confirm', data, {
    params: { quotationId },
  });
};

export const toBasket = async (quotationId) => {
  await http.post('/quotation/toBasket', null, {
    params: { quotationId },
  });
};

export const confirmAndToBasket = async (quotationId, data = []) => {
  if (!data.length) return;
  await confirm(quotationId, data);
  await toBasket(quotationId);
};
