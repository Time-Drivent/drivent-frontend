import { Typography } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import HotelInformation from '../../../components/HotelInformation';
import MessageContainer from '../../../components/MessageContainer';
import { toast } from 'react-toastify';
import useTicket from '../../../hooks/api/useTicket';
import HotelConfirm from '../../../components/HotelConfirm';
import UserContext from '../../../contexts/UserContext';
import { getUserBooking } from '../../../services/bookingApi';

export default function Hotel() {
  const [booking, setBooking] = useState(undefined);
  const [booked, setBooked] = useState(false);
  const [change, setChange] = useState(false);
  const [changed, setChanged] = useState(false);
  const messageContainerPhrases = {
    noPayment: ['Você precisa ter confirmado pagamento antes', 'de fazer a escolha de hospedagem'],
    noHotel: ['Sua modalidade de ingresso não inclui hospedagem', 'Prossiga para a escolha de atividades'],
    noTicket: ['Você precisa ter criado e pago seu ticket antes', 'de fazer a escolha de hospedagem'],
  };
  const [ticket, setTicket] = useState({});
  const { getTicket } = useTicket();
  const { userData } = useContext(UserContext);
  const token = userData.token;
  
  useEffect(() => {
    getUserBooking(token).then((res) => {
      setBooking(res);
    });
  }, [booked, changed]);

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
      {
        (!booking || change) ?
          <HotelInformation booking={booking} change={change} changed={changed} setBooked={setBooked} setChange={setChange} setChanged={setChanged} />
          : <HotelConfirm booking={booking} setChange={setChange} />
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
