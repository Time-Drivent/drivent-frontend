import api from './api';

export async function getBooking(token) {
  const booking = await api.get('/booking', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return booking.data;
}

export async function saveBooking(body, token) {
  const booking = await api.post('/booking', body, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return booking.data;
}