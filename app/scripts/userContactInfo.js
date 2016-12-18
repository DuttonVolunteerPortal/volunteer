import React from 'react';
import $ from 'jquery';

import styles from '../css/base.css';

module.exports = React.createClass({
	
	// Get the initial state of this React class
	getInitialState: function() {
		return {name: '', email: ''};
	},

	// Handle if the name field changes
	handleNameChange: function(e) {
		var newName = e.target.value
		this.setState({name: e.target.value});
		this.props.onNameChange(newName);
	},

	// Handle if the email field changes
	handleEmailChange: function(e) {
		var newEmail = e.target.value
		this.setState({email: e.target.value});
		this.props.onEmailChange(newEmail);
	},

	// Render method for this React class
	render: function() {
		return (
			<form className={styles.userContactInfo}>
				<strong>Please enter your full name and email address:</strong>
				<br />
				<input className="ui-widget ui-corner-all" type="text" name="contactinfo" placeholder="Full Name"
					value={this.state.name} onChange={this.handleNameChange}
				/>
				<input className="ui-widget ui-corner-all" type="email" name="contactinfo" placeholder="Email"
					value={this.state.email} onChange={this.handleEmailChange}
				/>
			</form>
		);
	}
});