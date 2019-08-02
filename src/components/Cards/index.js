import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import Firebase, { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

const CardsCarousel = React.lazy(() => import('./CardsCarousel'));

const Cards = () => {
  return (
    <Container fixed>
      <Helmet>
        <title>RЯ :: Cards</title>
      </Helmet>
      <CssBaseline />
      <h1>Cards</h1>
      <CardsForm />
    </Container>
  );
};

const CardsFormBase = props => {
  const { firebase } = props;

  const [cards, setCards] = useState([]);

  const getCards = () => {
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
        }
        if (!snapshot.exists()) {
          props.enqueueSnackbar('You do not have any cards in the database!', {
            variant: 'info'
          });
        }
      })
      .then(() => {
        dbRef.off();
      });
  };

  useEffect(() => getCards(), []);

  return (
    <Container maxWidth="sm">
      <React.Suspense
        fallback={
          <div>
            <h1>Loading...</h1>
          </div>
        }
      >
        <CardsCarousel cards={cards} />
      </React.Suspense>
    </Container>
  );
};

const condition = authUser => !!authUser;

const CardsForm = compose(
  withRouter,
  withFirebase,
  withSnackbar,
  withAuthorization(condition)
)(CardsFormBase);

export default Cards;

CardsFormBase.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};
