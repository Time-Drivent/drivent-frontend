import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBooking() {
  const token = useToken();

  const {
    loading: bookingLoading,
    error: bookingError,
    act: booking
  } = useAsync(() => bookingApi.getBooking(token), false);

  const {
    loading: UserbookingLoading,
    error: UserbookingError,
    act: Userbooking
  } = useAsync(() => bookingApi.getUserBooking(token), false);

  return {
    bookingLoading,
    bookingError,
    booking,
    UserbookingLoading,
    UserbookingError,
    Userbooking
  };
}
