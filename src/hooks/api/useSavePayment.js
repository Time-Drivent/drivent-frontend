import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useSavePayment() {
  const token = useToken();

  const {
    loading: savePaymentLoading,
    error: savePaymentError,
    act: savePayment
  } = useAsync((ticketId, cardData) => paymentApi.save(ticketId, cardData, token), false);

  return {
    savePaymentLoading,
    savePaymentError,
    savePayment
  };
}
