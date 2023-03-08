import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotel() {
  const token = useToken();

  const {
    loading: hotelLoading,
    error: hotelError,
    act: hotels
  } = useAsync(() => hotelApi.getHotels(token), false);

  return {
    hotelLoading,
    hotelError,
    hotels
  };
}
