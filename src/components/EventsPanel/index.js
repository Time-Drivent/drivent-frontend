import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';
import { getEvents } from '../../services/activityApi';
import { useContext, useEffect, useState } from 'react';
import SubscribeButton from '../SubscribeButton';
import UserContext from '../../contexts/UserContext';

export default function EventsPanel({ eventDaysId }) {
  const token = useToken();
  const [eventData, setEventData] = useState();
  const [update, setUpdate] = useState(false);
  const { userData } = useContext(UserContext);

  async function getDayEvents() {
    try {
      const events = await getEvents(token, eventDaysId);
      setEventData(events);
    }catch(error) {
      return toast('Desculpe, houve um erro.');
    }
  };

  useEffect(async() => {
    if(!eventDaysId) {
      return '';
    }else {
      getDayEvents();
    }
  }, [eventDaysId, update]);
  if(!eventData) return '';
  
  function getBoxSize(startTime, endTime) {
    const startNumber = Number(startTime.slice(0, 2));
    const endNumber = Number(endTime.slice(0, 2));
    return ((endNumber - startNumber)* 80);
  }
  
  function isSubscribed(Reservation) {
    for (let i = 0; i < Reservation.length; i++) {
      if (Reservation[i].userId === userData.id) {
        return true;
      }
    }
    return false;
  }
  return(
    <Main>
      {eventData.map((i, index) => 
        (<SubMain key={index} >
          <h2>{i.Venue.name}</h2>
          <EventsContainer>
            <Aside key={index} backgroundColor={isSubscribed(i.Reservation)} boxSize={getBoxSize(i.startTime, i.endTime)}>
              <div>
                <h3>{i.name}</h3>
                <p>{i.startTime} - {i.endTime}</p>
              </div>
              <header>
                <SubscribeButton
                  key={i.id}
                  isSubscribed={isSubscribed(i.Reservation)}
                  availableSpots={i.capacity}
                  activityId={i.id}
                  update={update}
                  setUpdate={setUpdate} />
              </header>
            </Aside>
          </EventsContainer>
        </SubMain>)
      )}
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 74%;
  display: flex;
  align-items:flex-start;
  justify-content: flex-start;
  padding-top: 50px;
  overflow-x: scroll;
::-webkit-scrollbar {
  display: none;
}
`;

const SubMain = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: flex-start;
h2{
    font-size: 17px;
    font-weight: 400;
    color: #7B7B7B;
    font-family: 'Roboto', sans-serif;
    text-align: center;
}
`;

const EventsContainer = styled.nav`
    min-width: 265px;
    border: 1px solid #D7D7D7;
    padding-top: 12px;
    margin-top: 9.96px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 11px 14px 10px 11px;
    gap: 9px;
    height: 100%;
    min-height: 265px;
    line-height: normal;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px white; 
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background:#CFCFCF;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background:#e6e3e3;
    }
`;

const Aside = styled.div`
    width: 265px;
    min-height: ${props => (props.boxSize)}px;
    background-color: ${props => (props.backgroundColor ? '#D0FFDB' : '#F1F1F1')} !important; // AQUI VAI MUDAR A COR DO BOTÃO PRA VERDE QUANDO INSCRITO
    border-radius: 5px;
    padding-top: 10px;
    padding-left: 12px;
    padding-right:14px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    word-break: break-all;
    header{
        flex-wrap: wrap;
        word-break: break-all;
        border-left: 1px solid #CFCFCF;
        width: 70px;
        height: 90%;
        padding-left: 15px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      h4{
        color: #343434;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 12px;
        }
        h6{
        color: #343434;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 12px; 
        }}
        div{
        display: flex;
        flex-direction: column;
        padding-top: 2px;
        gap: 5px;
        width: 65%;
        h3{
        color: #343434;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 12px;
        line-break: strict;
        word-break: break-word;
        }
        p{
        color: #343434;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 12px; 
        word-break: break-word;
        }
    }
`;
