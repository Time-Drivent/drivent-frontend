import api from './api';

export async function changeBooking(param, body, token) {
  const booking = await api.put(`/booking/${param}`, body, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return booking.data;
}

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

export async function getUserBooking(token) {
  const response = await api.get('/booking/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
