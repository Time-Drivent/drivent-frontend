import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function NotRemoteOptions({ hasHotel, setHasHotel, hasSelected, setHasSelected, ticketTypes }) {
  const [ticket, setTicket] = useState([]);
  const optionSelected = useState(false);
  useEffect(() => {
    let noHotelPrice = 0;
    const modalities = ticketTypes
      .filter((t) => !t.isRemote)
      .map((t) => {
        if (!t.includesHotel) noHotelPrice = t.price;
        return {
          text: t.includesHotel ? 'Com Hotel' : 'Sem Hotel',
          value: t.includesHotel ? t.price : 0,
          id: t.id,
        };
      })
      .map((t) => (t.text === 'Com Hotel' ? { ...t, value: t.value - noHotelPrice } : t));
    setTicket(() => modalities);
  }, [ticketTypes]);

  return (
    <Container>
      <h1>Ótimo! Agora escolha sua modalidade de hospedagem</h1>
      <OptionsContainer>
        {ticket.map((item, index) => (
          <OptionBox
            key={index}
            info={item}
            hasHotel={hasHotel}
            setHasHotel={setHasHotel}
            hasSelected={hasSelected}
            setHasSelected={setHasSelected}
            selected={optionSelected}
          ></OptionBox>
        ))}
      </OptionsContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #8e8e8e;
  }
  gap: 16px;
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  align-items: center;
  width: 145px;
  height: 145px;
  border: 1px solid #cecece;
  border-radius: 20px;
  background: ${(props) => (props.isSelected ? '#FFEED2' : '#fff')};
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #454545;
  }
  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #898989;
  }
  :hover {
    cursor: pointer;
  }
`;

function OptionBox({ info, hasHotel, setHasHotel, hasSelected, setHasSelected }) {
  function handleSelection() {
    setHasSelected(info);
    if (info.text === 'Com Hotel') {
      setHasHotel(false);
    } else {
      setHasHotel(true);
    }
  }

  return (
    <Option isSelected={hasSelected?.text === info.text} onClick={handleSelection}>
      <h1>{info.text}</h1>
      <h2>+ R$ {info.value}</h2>
    </Option>
  );
}
