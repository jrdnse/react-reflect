import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import ItemsCarousel from 'react-items-carousel';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import CardLayout from './Card';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: 240,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  }
}));

const Cards = () => {
  const classes = useStyles();

  return (
    <Container fixed className={classes.container}>
      <CssBaseline />
      <h1>Cards</h1>
      <CardsForm />
    </Container>
  );
};

const CardsFormBase = props => {
  const { firebase } = props;

  const [activeItemIndex, setactiveItemIndex] = useState();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState();

  const getCards = () => {
    setLoading(true);
    const uid = firebase.getUserID();
    let cCards = [];

    const dbRef = firebase.db.ref(`day_collections/${uid}/`);

    dbRef
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const cardsObject = snapshot.val();
          Object.keys(cardsObject).forEach(card => {
            const cCard = {
              date: card,
              mood: cardsObject[card].mood,
              q1: cardsObject[card].question1,
              q2: cardsObject[card].question2,
              q3: cardsObject[card].question3
            };
            cCards = [...cCards, cCard];
          });
          setCards(cCards);
          // console.log(cCards);
        }
        if (!snapshot.exists()) {
          // TODO: Show message on screen
          console.log('no cards in the db');
        }
      })
      .then(() => {
        setLoading(false);
        dbRef.off();
      });
  };

  useEffect(() => getCards(), []);

  return (
    <Container maxWidth="sm">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
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
              {cards.map(card => (
                <div style={{ margin: 5 }} key={card.date}>
                  <CardLayout
                    date={card.date}
                    mood={card.mood}
                    q1={card.q1}
                    q2={card.q2}
                    q3={card.q3}
                  />
                </div>
              ))}
            </ItemsCarousel>
          }
        </div>
      )}
    </Container>
  );
};

// q1={card[q1]} q2={card[q2]} q3={card[q3]}

const condition = authUser => !!authUser;

const CardsForm = compose(
  withRouter,
  withFirebase,
  withAuthorization(condition)
)(CardsFormBase);

export default Cards;
