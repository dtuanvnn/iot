import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {ListGroup, ListGroupItem, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import '../css/bootstrap.css'
// import '../css/app.css'

class Sidebar extends Component {
  render() {
    return (
      <Nav bsStyle="pills" stacked>
          <LinkContainer to="/login">
            <NavItem>Login</NavItem>
          </LinkContainer>

          <LinkContainer to="/dashboard">
            <NavItem>Dashboard</NavItem>
          </LinkContainer>

          <LinkContainer to="/users">
            <NavItem>Users</NavItem>
          </LinkContainer>

          <LinkContainer to="/history">
            <NavItem>History</NavItem>
          </LinkContainer>
          
          <LinkContainer to="/about">
            <NavItem>About</NavItem>
          </LinkContainer>
      </Nav>
    )
  }
}

export default Sidebar