import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';
import useAsync from '../useAsync';

export function useTicketTypes() {
  const token = useToken();
  const {
    loading: ticketTypeLoading,
    error: ticketTypeError,
    act: ticketType,
  } = useAsync(() => ticketApi.getTicketTypes(token), false);

  return {
    ticketTypeLoading,
    ticketTypeError,
    ticketType,
  };
}
