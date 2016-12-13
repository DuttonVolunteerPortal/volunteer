import React from 'react';

import $ from 'jquery';
import ContactInfo from './userContactInfo.js'
import CategoryList from './userCategoryList.js'
import BusinessInfo from './userBusinessInfo.js'

module.exports = React.createClass({
  getInitialState: function(){
    return {data: [],
				jobsChecked: [],
				email: '',
				name: '',
				businessInfo: ''};
  },
  handleNameChange: function(e) {
		this.setState({name: e});
  },
  handleEmailChange: function(e) {
		this.setState({email: e});
  },
  toggleCheckbox: function (e) {
	  var newJobsChecked = this.state.jobsChecked
	  console.log(e)
	if (newJobsChecked.includes(e)) {
		console.log("removing")
		var index = newJobsChecked.indexOf(e);
		if (index > -1) {
			newJobsChecked.splice(index, 1);
		}
	}
	else{
		console.log("adding")
		newJobsChecked.push(e);
	}
	this.setState({jobsChecked: newJobsChecked})
  },
  handleBusinessInfoChange: function(e) {
		this.setState({businessInfo: e});
  },
  handleUserSubmit: function(user) {
	  console.log(this.state)
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
        <ContactInfo onNameChange={this.handleNameChange} onEmailChange={this.handleEmailChange} />
		<div><strong>Check all that you are able to assist with:</strong></div>
		<CategoryList data={this.state.data} toggleCheckBox={this.toggleCheckbox} />
		<BusinessInfo onBusinessSubmit={this.handleBusinessInfoChange} />
		<form className="submitForm" onSubmit={this.handleUserSubmit}>
            <input className="ui-button ui-widget ui-corner-all" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
});