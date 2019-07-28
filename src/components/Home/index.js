import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <Container maxWidth="lg" style={{ paddingBottom: 30 }}>
    <CssBaseline />
    <h1>Home</h1>
    <h2>This page is accessible only by authenticated users.</h2>
  </Container>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
