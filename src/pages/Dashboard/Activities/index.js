import { Typography, styled } from '@material-ui/core';
import useTicket from '../../../hooks/api/useTicket';
import { useEffect, useState } from 'react';
import MessageContainer from '../../../components/MessageContainer';
import ActivitiesInformation from '../../../components/ActivitiesInformation';

export default function Activities() {
  const { getTicket, getTicketLoading } = useTicket();
  const [Component, setComponent] = useState(null);

  useEffect(async() => {
    try {
      const ticket = await getTicket();
      if (ticket.status === 'RESERVED') {
        const noPaymentPhrases = ['Você precisa ter confirmado pagamento antes', 'de fazer a escolha de atividades'];
        setComponent(() => <MessageContainer phrases={noPaymentPhrases} />);
        return;
      } 
      if (ticket.TicketType.isRemote) {
        const noPaymentPhrases = ['Sua modalidade de ingresso não necessita escolher', 'atividade. Você terá acesso a todas as atividades.'];
        setComponent(() => <MessageContainer phrases={noPaymentPhrases} />);
        return;
      }

      setComponent(() => <ActivitiesInformation />);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      { !getTicketLoading ? Component : null  }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
