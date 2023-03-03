import Button from '../Form/Button';

import styled from 'styled-components';

export function Confirmation({ price }) {
  return (
    <ConfirmationContainer>
      <div>Fechado! O total ficou em R$ {price}. Agora é só confirmar:</div>

      <Button type="submit">RESERVAR INGRESSO</Button>
    </ConfirmationContainer>
  );
}

const ConfirmationContainer = styled.div`
  color: #8e8e8e;
  font-family: 'Roboto';
  font-size: 20px;
  line-height: 23px;
  margin-top: 40px;

  div {
    margin-bottom: 10px;
  }
`;
