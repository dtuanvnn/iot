import React, { Component } from 'react';
import '../css/style.css';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import callApi from '../util/apiCaller'

import Authenticate from '../functions/authenticate'

class Login extends Component {