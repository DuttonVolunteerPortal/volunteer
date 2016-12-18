import React from 'react';
import $ from 'jquery';

import styles from '../css/base.css';

module.exports = React.createClass({
	
	getInitialState: function() {
		return {name: '', email: ''};
	},
	handleBodyChange: function(e) {
		var businessInfo = e.target.value;
		this.setState({businessInfo: e.target.value});
		this.props.onBusinessSubmit(businessInfo);
	},
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