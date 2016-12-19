import React from 'react';

import $ from 'jquery';
import ContactInfo from './userContactInfo.js'
import CategoryList from './userCategoryList.js'
import BusinessInfo from './userBusinessInfo.js'

import styles from '../css/base.css';

module.exports = React.createClass({

  // Get the initial state of the React class
  getInitialState: function(){
    return {	data1: [],
      data2: [],
      jobsChecked: [],
      email: '',
      name: '',
      businessInfo: ''};
    },

    // Handle if the name changes
    handleNameChange: function(e) {
      this.setState({name: e});
    },

    // Handle if the email changes
    handleEmailChange: function(e) {
      this.setState({email: e});
    },

    // Toggle check on the checkbox for each job
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

    // Handle if the busienss info changes
    handleBusinessInfoChange: function(e) {
      this.setState({businessInfo: e});
    },

    // Use AJAX to submit the form to the server
    handleUserSubmit: function(user) {
      user.preventDefault();

      var email = this.state.email.trim();
      var name = this.state.name.trim();
      if (!email || !name || this.state.jobsChecked.length == 0) {
        alert("Please be sure to fill out your name, email, and check at least one job.");
      }
      else {

        $.ajax({
          url: this.props.put_url,
          dataType: 'json',
          type: 'PUT',
          data: this.state
        })
        .done(function(data){
          alert("Thank you! Your data has succesfully been entered into the database.");
          window.location = '/';
        }.bind(this))
        .fail(function(xhr, status, err) {
          alert("There was a problem. Data was not succesfully entered.");
          console.error(this.props.url, status, err.toString());
        }.bind(this));
      }
    },

    // Use to AJAX to get jobs from the server
    loadJobsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false
      })
      .done(function(result){
        this.setState({ data1: result.splice(0, (Math.ceil(result.length)) / 2),
          data2:  result });
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

      // Render method for this React class
      render: function() {
        return (
          <div className={styles.userBox} >
          <ContactInfo onNameChange={this.handleNameChange} onEmailChange={this.handleEmailChange} />
          <div className={styles.jobColumns} >
          <CategoryList data1={this.state.data1} toggleCheckBox={this.toggleCheckbox} />
          <CategoryList data2={this.state.data2} toggleCheckBox={this.toggleCheckbox} />
          </div>
          <BusinessInfo onBusinessSubmit={this.handleBusinessInfoChange} />
          <form className={styles.submitForm} onSubmit={this.handleUserSubmit}>
          <input className={styles.button} type="submit" value="Submit All" />
          </form>
          </div>
        );
      }
    });
