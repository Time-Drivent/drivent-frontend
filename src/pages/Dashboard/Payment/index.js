import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Confirmation } from '../../../components/Payment/Confirmation';
import NotRemoteOptions from '../../../components/Payment/NotRemote';
import ModalityTicket from '../../../components/ticket-payment/modality-ticket';
import useIsUserSubscribed from '../../../hooks/useIsUserSubscribed';
import MessageContainer from '../../../components/MessageContainer';
import { useTicketTypes } from '../../../hooks/api/useTicketType';
import useTicket from '../../../hooks/api/useTicket';

export default function Payment() {
  const [accessDenied, setAccessDenied] = useState(true);
  const { getUser, getUserLoading } = useIsUserSubscribed();
  const { getTicket, getTicketLoading } = useTicket();
  const messageContainerPhrases = [
    'Você precisa completar sua inscrição antes',
    'de prosseguir pra escolha de ingresso',
  ];
  const [ticket, setTicket] = useState([]);
  const [hasHotel, setHasHotel] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const { ticketType, ticketTypeLoading } = useTicketTypes();
  const [paymentPage, setPaymentPage] = useState(false);

  async function isTicketReserved() {
    const ticket = await getTicket();
    if (ticket) setPaymentPage(true);
  }

  useEffect(async() => {
    try {
      const response = await getUser();
      if (response !== undefined) setAccessDenied(() => false);

      const ticket = await ticketType();
      setTicket(() => ticket);

      await isTicketReserved();
    } catch(error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Title>Ingresso e pagamento</Title>
      { !paymentPage ? (  !ticketTypeLoading && !getUserLoading && !getTicketLoading && (accessDenied ? (
        <MessageContainer phrases={messageContainerPhrases} />
      ) : (
        <>
          <ModalityTicket ticketTypes={ticket} setHasSelected={setHasSelected} />
          {(hasSelected.text === 'Presencial' || hasSelected.text === 'Sem Hotel' || hasSelected.text === 'Com Hotel') && (
            <NotRemoteOptions
              ticketTypes={ticket}
              setHasSelected={setHasSelected}
              hasHotel={hasHotel}
              setHasHotel={setHasHotel}
              hasSelected={hasSelected}
            />
          )}
          {(hasSelected.text === 'Online' || hasSelected.text === 'Sem Hotel' || hasSelected.text === 'Com Hotel') && (
            <Confirmation
              ticketTypeId={hasSelected.id}
              price={ticket.filter((t) => t.id === hasSelected.id)[0].price}
              setPaymentPage={setPaymentPage}
            />
          )}
        </>
      ))) : 'Area de pagamento em breve' } 
    </>
  );
}

const Title = styled.div`
  font-size: 34px;
  font-weight: 400;
  line-height: 39.84px;
  color: #000000;
  font-family: 'Roboto', sans-serif;
  padding-bottom: 37px;
`;
