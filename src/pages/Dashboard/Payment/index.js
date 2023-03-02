import styled from 'styled-components';

export default function Payment() {
  return (
    <TicketConfirm>
      Fechado! O total ficou em R$ 100. Agora é só confirmar:

      <TicketConfirmButton>
        RESERVAR INGRESSO
      </TicketConfirmButton>
    </TicketConfirm>
  );
}

const TicketConfirm = styled.div`
  color: #8E8E8E;
  font-family: 'Roboto';
  font-size: 20px;
  line-height: 23px;
`;

const TicketConfirmButton = styled.div`
  align-items: center;
  background-color: #E0E0E0;
  color: #000000;
  cursor: pointer;
  display: flex;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-family: 'Roboto';
  font-size: 14px;
  height: 37px;
  justify-content: center;
  line-height: 16px;
  margin-top: 17px;
  width: 162px;
`;
