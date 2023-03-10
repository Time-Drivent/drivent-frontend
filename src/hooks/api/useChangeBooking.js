import useToken from '../useToken';
import useAsync from '../useAsync';

import * as bookingApi from '../../services/bookingApi';

export default function useChangeBooking() {
  const token = useToken();
  const {
    loading: changeBookingLoading,
    error: changeBookingError,
    act: changeBooking,
  } = useAsync((param, data) => bookingApi.changeBooking(param, data, token), false);

  return {
    changeBookingLoading,
    changeBookingError,
    changeBooking,
  };
}
