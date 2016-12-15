import React from 'react';
import $ from 'jquery';

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
			<div>
				<strong>Business Information (if applicable)</strong>
				<form className="businessInfo" onSubmit={this.handleSubmit}>
					<textarea name="info" value={this.state.businessInfo} onChange={this.handleBodyChange}></textarea>				
				</form>
			</div>
		);
	}
});