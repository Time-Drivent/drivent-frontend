import { useEffect, useState } from 'react';
import useDay from '../../hooks/api/useDay';
import styled from 'styled-components';

export default function ActivitiesInformation() {
  // eslint-disable-next-line no-unused-vars
  const { getDay, getDayLoading } = useDay();
  const [days, setDays] = useState([]);
  const [selectedDayId, setSelectedDayId] = useState();

  function handleDaySelection(id) {
    setSelectedDayId(id);
  }

  useEffect(async() => {
    try {
      const daysAux = await getDay();
      setDays([...daysAux]);
    } catch(error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  return <>
    <Title>Primeiro, filtre pelo dia do evento:</Title>
      
    <DaysList>
      {days.map((day) => {
        return (
          <Day key={day.date} selectedDayId={selectedDayId} dayId={day.id} onClick={() => handleDaySelection(day.id)}>
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
  </>;
}

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
  background: ${(props) => (props.selectedDayId === props.dayId ? '#FFD37D' : '#e0e0e0')};
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
