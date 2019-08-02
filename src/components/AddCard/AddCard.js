/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import * as ROUTES from '../../constants/routes';

import Firebase, { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

const AddCardTemplate = React.lazy(() => import('./AddCardTemplate'));

const AddCard = () => (
  <Container maxWidth="sm">
    <h1>Add card</h1>
    <AddCardForm />
  </Container>
);

const AddCardFormBase = props => {
  const { firebase } = props;

  const [mood, setMood] = useState();
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [submitted, setSubmitted] = useState();
  const [checking, setChecking] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const alreadySubmitted = () => {
    const uid = firebase.getUserID();
    const curDay = new Date();
    const date = `${curDay.getFullYear()}-${curDay.getMonth() + 1}-${curDay.getDate()}`;
    firebase.db.ref(`day_collections/${uid}/${date}`).once('value', snapshot => {
      if (snapshot.exists()) {
        setSubmitted(true);
        setChecking(false);
      }
      if (!snapshot.exists()) {
        setSubmitted(false);
        setChecking(false);
      }
    });
  };

  useEffect(() => {
    alreadySubmitted();
  }, []);

  const uploadCard = e => {
    e.preventDefault();
    firebase.addDay(mood, question1, question2, question3);
    setMood('');
    setQuestion1('');
    setQuestion2('');
    setQuestion3('');
    setDisabled(true);
    props.enqueueSnackbar('Successfully saved the card!', {
      variant: 'success'
    });
    setTimeout(() => props.history.push(ROUTES.HOME), 3000);
  };

  return (
    <Container>
      <h1>Add Card</h1>

      {checking ? (
        <h1>Checking...</h1>
      ) : submitted ? (
        <h1>
          You have already submitted today&apos;s card. <br /> Try again tomorrow! :)
        </h1>
      ) : (
        <React.Suspense fallback={<div>Loading...</div>}>
          <AddCardTemplate
            disabled={disabled}
            onSubmit={uploadCard}
            moodValue={mood}
            onChangeMood={e => setMood(e.target.value)}
            q1Value={question1}
            onChangeQ1={e => setQuestion1(e.target.value)}
            q2Value={question2}
            onChangeQ2={e => setQuestion2(e.target.value)}
            q3Value={question3}
            onChangeQ3={e => setQuestion3(e.target.value)}
          />
        </React.Suspense>
      )}
    </Container>
  );
};

const condition = authUser => !!authUser;

const AddCardForm = compose(
  withRouter,
  withFirebase,
  withSnackbar,
  withAuthorization(condition)
)(AddCardFormBase);

export default AddCard;

AddCardFormBase.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired
};
