import styled from 'styled-components';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { toast } from 'react-toastify';
import { green, red } from '@mui/material/colors';
import useToken from '../../hooks/useToken';
import { postActivityBooking } from '../../services/activityApi';
import { useEffect, useState } from 'react';

export default function SubscribeButton({ isSubscribed, availableSpots, activityId, update, setUpdate }) {
  const token = useToken();
  const [subscribe, setSubscribe] = useState(isSubscribed);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(async() => {
    setSubscribe(isSubscribed);
  }, [isSubscribed]);

  async function subscribeActivity() {
    if (isDisabled) {
      return;
    }
    setIsDisabled(true);
    try {
      await postActivityBooking(token, activityId);
      setUpdate(!update);
      setSubscribe(true);
      toast('Inscrição realizada com sucesso');
      setIsDisabled(false);
    } catch (err) {
      toast('Não foi possível se inscrever');
      setIsDisabled(false);
    }
  }
  return (
    <>
      <Container>
        {
          !subscribe ?
            (
              availableSpots ?
                (
                  <span onClick={() => { subscribeActivity(); }} disabled={isDisabled}>
                    <LoginOutlinedIcon sx={{ fontSize: 30, color: green[600] }} />
                    <Spots color={availableSpots}>{availableSpots} vaga{availableSpots>1 ? 's' : ''}</Spots>
                  </span>
                )
                :
                (
                  <>
                    <HighlightOffRoundedIcon sx={{ fontSize: 30, color: red[600] }} />
                    <Spots color={availableSpots}>Esgotado</Spots>
                  </>
                )
            )
            :
            <>
              <CheckCircleOutlinedIcon sx={{ fontSize: 30, color: green[600] }} />
              <Spots color={true}>Inscrito</Spots>
            </>
        }
      </Container>
    </>);
}

const Container = styled.div`
  width: 100% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span{
    z-index: 5px;
  }
`;

const Spots = styled.p`  
  font-size: 10px !important;
  color: ${props => (props.color ? '#43a047' : '#e93535')} !important;

  font-family: 'Roboto', sans-serif;
`;
