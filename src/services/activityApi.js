import api from './api';

export async function getEvents(token, eventDayId) {
  const response = await api.get(`/dates/events?eventDayId=${eventDayId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postActivityBooking(token, activityId) {
  const response = await api.post('/dates', { activityId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
