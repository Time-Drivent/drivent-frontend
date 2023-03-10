import styled from 'styled-components';

export default function HotelConfirm({ booking, setChange }) {
  return (
    <Wrapper>
      <h1>Você já escolheu seu quarto:</h1>
      <Container>
        <Booking>
          <img src={booking.Room?.Hotel.image} alt={'hotel'} />
          <div>
            <h2>{booking.Room?.Hotel.name}</h2>
            <h3>Quarto reservado</h3>
            <h4>
              {booking.Room?.name}
              {booking.Room?.capacity === 1
                ? ' (Single)'
                : booking.Room?.capacity === 2
                  ? ' (Double)'
                  : ' (Triple)'}
            </h4>
            <h3>Pessoas no seu quarto</h3>
            <h4>{booking.Room?.Booking === 1 ? 'Apenas você' : `Você e mais ${booking.Room?.Booking - 1}`}</h4>
          </div>
        </Booking>
      </Container>

      <Button onClick={() => setChange(true)} >
        TROCAR DE QUARTO
      </Button>

    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  h1 {
    margin-bottom: 35px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Booking = styled.div`
  width: 196px;
  height: 264px;
  background: #ffeed2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 15px;
  margin-bottom: 45px;
  img {
    width: 100%;
    height: 45%;
  }
  div {
    margin-top: 10px;
  }
  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #343434;
  }
  h3 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #3c3c3c;
    margin-top: 15px;
  }
  h4 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #3c3c3c;
  }
`;

const Button = styled.div`
  width: 182px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  background-color: #e0e0e0;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  cursor: pointer;
`;
