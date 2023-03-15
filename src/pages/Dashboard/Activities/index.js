import { Typography } from '@material-ui/core';
import useTicket from '../../../hooks/api/useTicket';
import { useEffect, useState } from 'react';
import MessageContainer from '../../../components/MessageContainer';
import ActivitiesInformation from '../../../components/ActivitiesInformation';
// import useDay from '../../../hooks/api/useDay';
import styled from 'styled-components';

export default function Activities() {
  const { getTicket, getTicketLoading } = useTicket();
  const [Component, setComponent] = useState(null);

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    try {
      const ticket = await getTicket();
      if (ticket.status === 'RESERVED') {
        const noPaymentPhrases = ['Você precisa ter confirmado pagamento antes', 'de fazer a escolha de atividades'];
        setComponent(() => <MessageContainer phrases={noPaymentPhrases} />);
        return;
      }
      if (ticket.TicketType.isRemote) {
        const noPaymentPhrases = [
          'Sua modalidade de ingresso não necessita escolher',
          'atividade. Você terá acesso a todas as atividades.',
        ];
        setComponent(() => <MessageContainer phrases={noPaymentPhrases} />);
        return;
      }

      setComponent(() => <ActivitiesInformation />);
    } catch (error) {
    // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {!getTicketLoading ? Component : null}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

