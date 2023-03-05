import Button from '../Form/Button';

import styled from 'styled-components';
import useSaveTicketType from '../../hooks/api/useSaveTicketType';
import { toast } from 'react-toastify';

export function Confirmation({ price, ticketTypeId, setPaymentPage }) {
  const { saveTicketType, saveTicketTypeLoading } = useSaveTicketType();
  async function handleSubmit() {
    try {
      await saveTicketType({ ticketTypeId });
      toast('Ticket criado com sucesso');
      setPaymentPage(true);
    } catch (error) {
      toast('Ocorreu um erro ao criar um ticket');
    }
  }

  return (
    <ConfirmationContainer>
      <div>Fechado! O total ficou em R$ {price}. Agora é só confirmar:</div>

      <Button type="submit" disabled={saveTicketTypeLoading} onClick={handleSubmit}>
        RESERVAR INGRESSO
      </Button>
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
