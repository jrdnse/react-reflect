import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { CssBaseline, Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withAuthorization } from '../Session';
import CardLayout from './Card';

const CardsPage = () => {
  const [activeItemIndex, setactiveItemIndex] = useState();

  return (
    <div>
      <CssBaseline />
      <h1>Cards</h1>
      <h2>This page is accessible only by authenticated users.</h2>

      <Container maxWidth="sm">
        <ItemsCarousel
          gutter={12}
          activePosition="center"
          chevronWidth={60}
          numberOfCards={1}
          slidesToScroll={1}
          outsideChevron
          activeItemIndex={activeItemIndex}
          requestToChangeActive={value => setactiveItemIndex(value)}
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
          {Array.from(new Array(10)).map((_, i) => (
            <div style={{ margin: 5 }}>
              <CardLayout />
            </div>
          ))}
        </ItemsCarousel>
      </Container>
    </div>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CardsPage);
