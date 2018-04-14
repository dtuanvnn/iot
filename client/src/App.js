import React, { Component } from 'react';
import './styles/App.css';
import {Grid, Row, Col } from 'react-bootstrap'

import Header from './components/header'
import Sidebar from './components/sidebar'
import Main from './components/main'

import AuthButton from './functions/authenticate-button'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AuthButton />
        <Grid fluid="true">
          <Row className="show-grid">
            <Col md={6} md={1} lg={1}>
              <Sidebar />
            </Col>
            <Col md={6} md={9} lg={9}>
              <Main/>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App;
