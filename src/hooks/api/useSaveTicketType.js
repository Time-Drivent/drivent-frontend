import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';
import useAsync from '../useAsync';

export default function useSaveTicketType() {
  const token = useToken();
  const {
    loading: saveTicketTypeLoading,
    error: saveTicketTypeError,
    act: saveTicketType,
  } = useAsync((data) => ticketApi.saveTicket(data, token), false);

  return {
    saveTicketTypeLoading,
    saveTicketTypeError,
    saveTicketType,
  };
}
