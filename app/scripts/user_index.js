import React from 'react';		
import ReactDOM from 'react-dom';		
import { Router, Route, Redirect, browserHistory } from 'react-router';		
			
import UserBox from './userBox.js'		
		
import '../css/base.css';		
	
 		
 ReactDOM.render(		
 	<UserBox url="/api/jobs" pollInterval={2000}/>,		
 	document.getElementById('content')		
 ); 