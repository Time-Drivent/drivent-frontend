import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function NotRemoteOptions({ hasHotel, setHasHotel, hasSelected, setHasSelected }) {
  const arr = [
    { text: 'Sem Hotel', value: 0 },
    { text: 'Com Hotel', value: 350 },
  ];
  return (
    <Container>
      <h1>Ótimo! Agora escolha sua modalidade de hospedagem</h1>
      <OptionsContainer>
        {arr.map((item, index) => (
          <OptionBox
            key={index}
            text={item.text}
            value={item.value}
            hasHotel={hasHotel}
            setHasHotel={setHasHotel}
            hasSelected={hasSelected}
            setHasSelected={setHasSelected}
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

function OptionBox({ text, value, hasHotel, setHasHotel, hasSelected, setHasSelected }) {
  const [isSelected, setSelected] = useState(false);
  function handleSelection() {
    if (!hasSelected || (value && !hasHotel) || (!value && hasHotel)) {
      setSelected(true);
      setHasSelected(true);
      if (!value) {
        setHasHotel(false);
      } else {
        setHasHotel(true);
      }
    }
  }
  useEffect(() => {
    if ((value && !hasHotel) || (!value && hasHotel)) setSelected(false);
  }, [hasSelected, hasHotel]);
  return (
    <Option isSelected={isSelected} onClick={handleSelection}>
      <h1>{text}</h1>
      <h2>+ R$ {value}</h2>
    </Option>
  );
}
