import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
	
	getInitialState: function() {
		return {name: '', email: ''};
	},
	handleNameChange: function(e) {
		this.setState({name: e.target.value});
	},
	handleEmailChange: function(e) {
		this.setState({email: e.target.value});
	},
	render: function() {
		return (
			<form className="contactInfo" onSubmit={this.handleSubmit}>
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