import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HotelInformation from '../../../components/HotelInformation';
import MessageContainer from '../../../components/MessageContainer';
import { toast } from 'react-toastify';
import useTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const messageContainerPhrases = {
    noPayment: ['Você precisa ter confirmado pagamento antes', 'de fazer a escolha de hospedagem'],
    noHotel: ['Sua modalidade de ingresso não inclui hospedagem', 'Prossiga para a escolha de atividades'],
    noTicket: ['Você precisa ter criado e pago seu ticket antes', 'de fazer a escolha de hospedagem'],
  };
  const [ticket, setTicket] = useState({});
  const { getTicket, getTicketLoading } = useTicket();
  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    try {
      const ticket = await getTicket();
      setTicket(ticket);
    } catch (error) {
      if (error.response.status === 404) setTicket({ noTicket: true });
      toast('Não foi possível encontrar as informações do seu Ticket');
    }
  }, []);
  return (
    <>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography> 
      {ticket.noTicket ? (
        <MessageContainer phrases={messageContainerPhrases.noTicket} />
      ) : ticket.status === 'PAID' ? (
        ticket.TicketType.includesHotel ? (
          <></>
        ) : (
          <MessageContainer phrases={messageContainerPhrases.noHotel} />
        )
      ) : (
        <MessageContainer phrases={messageContainerPhrases.noPayment} />
      )}
  
      <HotelInformation />

    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
