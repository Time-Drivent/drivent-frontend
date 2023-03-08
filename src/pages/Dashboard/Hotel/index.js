import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import MessageContainer from '../../../components/MessageContainer';
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
    </>
  );
}
