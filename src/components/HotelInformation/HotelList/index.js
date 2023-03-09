import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function HotelList({ hotels, selected, handleSelect }) {
  return <>
    <Title>Primeiro, escolha seu hotel</Title>
    <ContainerHotelList>
      { hotels.map((hotel, i) => <HotelItem key={hotel.id} selected={selected} handleSelect={() => handleSelect(hotel.id, hotel.Rooms)} info={hotel} />) }
    </ContainerHotelList>
  </>;
}

function HotelItem({ handleSelect, info, selected }) {
  const [capacityType, setCapacityType] = useState([]);

  function handleCapacityType() {
    let capacityTypes = ['Single', 'Double', 'Triple'];

    let diffCapacities = info.Rooms.reduce((prev, curr) => {
      const { capacity } = curr;
      if(!prev.includes(capacity))
        prev.push(capacity);
      return prev;
    }, []);

    diffCapacities = diffCapacities.sort((a, b) => a < b ? -1 : 1);

    diffCapacities.forEach((v) => {
      const curr = capacityTypes[v - 1];
      setCapacityType((prev) => !prev.includes(curr) ? [...prev, curr] : prev);
    });
    
    setCapacityType((prev) => {
      if(prev.reduce !== undefined)
        return prev.reduce((p, c, i) => {
          if(i === 0) return c;
          return i === prev.length - 1 ? `${p} e ${c}` : `${p}, ${c}`;
        }, '');
    
      return prev;
    });
  }

  useEffect(() => {
    handleCapacityType();
  }, []);
  
  return <ContainerHotelItem selected={selected === info.id} onClick={handleSelect}>
    <img src={info.image} alt={'Imagem do hotel'} />
    <h2 variant='subtitle1'>{info.name}</h2>
    <div>
      <h3>Tipos de acomodação:</h3>
      <span>{ capacityType }</span>
    </div>
    <div>
      <h3>Vagas disponíveis:</h3>
      <span>{ info.Rooms.reduce((prev, curr) => prev + curr.capacity - curr._count.Booking, 0) }</span>
    </div>
  </ContainerHotelItem>;
}

const Title = styled.h2`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #8E8E8E;
    padding-bottom: 15px;
`;

const ContainerHotelList = styled.div`
    display: flex;
    gap: 10px;
`;

const ContainerHotelItem = styled.div`
    width: 100%;
    max-width: 196px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
    background: ${(props) => props.selected ? '#FFEED2' : '#F1F1F1'};
    img {
        width: 100%;
        height: 110px;
        object-fit: cover;
        border-radius: 5px;
    }
    h2 {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 16px;
        color: #343434;
    }
    h3 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        color: #3C3C3C;
    }
    span {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        color: #3C3C3C;
    }
    padding: 16px 14px 22px 14px;
    border-radius: 10px;
`;
