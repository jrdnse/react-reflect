/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import ItemsCarousel from 'react-items-carousel';
import CardLayout from './Card';

const CardsCarousel = props => {
  const { cards } = props;

  const [activeItemIndex, setActiveItemIndex] = useState();

  return (
    <div>
      {
        <ItemsCarousel
          gutter={12}
          activePosition="center"
          chevronWidth={60}
          numberOfCards={1}
          slidesToScroll={1}
          outsideChevron
          activeItemIndex={activeItemIndex}
          requestToChangeActive={value => setActiveItemIndex(value)}
          rightChevron={
            <IconButton aria-label="right chevron">
              <SvgIcon>
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </SvgIcon>
            </IconButton>
          }
          leftChevron={
            <IconButton aria-label="left chevron">
              <SvgIcon>
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </SvgIcon>
            </IconButton>
          }
        >
          {cards.map(card => (
            <div style={{ margin: 5 }} key={card.date}>
              <CardLayout date={card.date} mood={card.mood} q1={card.q1} q2={card.q2} q3={card.q3} />
            </div>
          ))}
        </ItemsCarousel>
      }
    </div>
  );
};

export default CardsCarousel;

CardsCarousel.propTypes = {
  cards: PropTypes.array.isRequired
};
