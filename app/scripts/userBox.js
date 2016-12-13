import React from 'react';

import $ from 'jquery';
import ContactInfo from './userContactInfo.js'
import CategoryList from './userCategoryList.js'
import BusinessInfo from './userBusinessInfo.js'

module.exports = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  handleContactInfo: function(user) {
	  
  },
  handleJobsChecked: function(user) {
	  
  },
  handleBusinessInfo: function(user) {
	  
  },
  handleUserSubmit: function(user) {
	  
  },
  
  // Use to AJAX to get jobs from the server
  loadJobsFromServer: function() {
      $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
      })
      .done(function(result){
          this.setState({data: result});
      }.bind(this))
      .fail(function(xhr, status, errorThrown) {
          console.error(this.props.url, status, err.toString());
      }.bind(this));
  },
  
  // Called automatically by React after a component is rendered for the first time
    componentDidMount: function() {
        this.loadJobsFromServer();
        setInterval(this.loadJobsFromServer, this.props.pollInterval);
    },
  render: function() {
    return (
      <div className="userBox" >
        <h1>Volunteer Submission Form</h1>
        <ContactInfo onUserSubmit={this.handleContactInfo} />
		<div><strong>Check all that you are able to assist with:</strong></div>
		<CategoryList data={this.state.data} />
		<BusinessInfo onBusinessSubmit={this.handleBusinessSubmit} />
		<input className="ui-button ui-widget ui-corner-all" type="submit" value="Submit" /> //This won't work; it's not in a form.
      </div>
    );
  }
});