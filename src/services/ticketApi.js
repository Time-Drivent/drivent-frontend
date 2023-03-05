import useToken from '../hooks/useToken';
import api from './api';

export async function getTicketTypes(token) {
  const ticketsTypes = await api.get('/tickets/types', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return ticketsTypes.data;
}

export async function getTicket(token) {
  const ticketsTypes = await api.get('/tickets', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return ticketsTypes.data;
}

export async function saveTicket(body, token) {
  const ticketsTypes = await api.post('/tickets', body, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return ticketsTypes.data;
}
