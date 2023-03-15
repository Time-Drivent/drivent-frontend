import { Typography } from '@material-ui/core';
import useTicket from '../../../hooks/api/useTicket';
import { useEffect, useState } from 'react';
import MessageContainer from '../../../components/MessageContainer';
import ActivitiesInformation from '../../../components/ActivitiesInformation';
import useDay from '../../../hooks/api/useDay';
import styled from 'styled-components';

export default function Activities() {
  const { getTicket, getTicketLoading } = useTicket();
  const { getDay, getDayLoading } = useDay();
  const [Component, setComponent] = useState(null);
  const [days, setDays] = useState([]);

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
      const daysAux = await getDay();
      setDays([...daysAux]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Title>Primeiro, filtre pelo dia do evento:</Title>
      {!getTicketLoading ? Component : null}
      <DaysList>
        {days.map((day) => {
          return (
            <Day key={day.date}>
              <h1>
                {`${day.weekday}, ${new Date(day.date).toLocaleDateString('pt-br', {
                  day: 'numeric',
                  month: 'numeric',
                })}`}
              </h1>
            </Day>
          );
        })}
      </DaysList>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const DaysList = styled.div`
  display: flex;
  gap: 18px;
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 131px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #000;
  }
  :hover {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: #8e8e8e;
  margin-bottom: 22px;
  margin-top: 36px;
`;
