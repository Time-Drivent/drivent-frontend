import api from '../services/api';

export async function getDays(token) {
  const response = await api.get('/dates', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
