import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
	
	getInitialState: function() {
		return {name: '', email: ''};
	},
	handleNameChange: function(e) {
		var newName = e.target.value
		this.setState({name: e.target.value});
		this.props.onNameChange(newName);
	},
	handleEmailChange: function(e) {
		var newEmail = e.target.value
		this.setState({email: e.target.value});
		this.props.onEmailChange(newEmail);
	},
	render: function() {
		return (
			<form className="contactInfo">
				<input className="ui-widget ui-corner-all" type="text" placeholder="Full Name"
					value={this.state.name} onChange={this.handleNameChange}
				/>
				<input className="ui-widget ui-corner-all" type="text" placeholder="Email"
					value={this.state.email} onChange={this.handleEmailChange}
				/>
			</form>
		);
	}
});