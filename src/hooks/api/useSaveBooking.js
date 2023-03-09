import useToken from '../useToken';
import useAsync from '../useAsync';

import * as bookingApi from '../../services/bookingApi';

export default function useSaveBooking() {
  const token = useToken();
  const {
    loading: saveBookingLoading,
    error: saveBookingError,
    act: saveBooking,
  } = useAsync((data) => bookingApi.saveBooking(data, token), false);

  return {
    saveBookingLoading,
    saveBookingError,
    saveBooking,
  };
}
