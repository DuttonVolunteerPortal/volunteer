import React from 'react';
import $ from 'jquery';

import styles from '../css/base.css';

module.exports = React.createClass({
	
	// Get the initial state of this React class
	getInitialState: function() {
		return {name: '', email: ''};
	},

	// Handle if the body of the business info changes
	handleBodyChange: function(e) {
		var businessInfo = e.target.value;
		this.setState({businessInfo: e.target.value});
		this.props.onBusinessSubmit(businessInfo);
	},

	// Render method for this React class
	render: function() {
		return (
			<form className={styles.userBusinessInfo} onSubmit={this.handleSubmit}>
				<strong>Business Information (if applicable):</strong>
				<br />
				<textarea name="info" value={this.state.businessInfo} onChange={this.handleBodyChange}></textarea>				
			</form>
		);
	}
});