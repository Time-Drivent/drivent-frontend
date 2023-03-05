import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';
import useAsync from '../useAsync';

export default function useTicket() {
  const token = useToken();
  const {
    loading: getTicketLoading,
    error: getTicketError,
    act: getTicket,
  } = useAsync(() => ticketApi.getTicket(token), false);

  return {
    getTicketLoading,
    getTicketError,
    getTicket,
  };
}
