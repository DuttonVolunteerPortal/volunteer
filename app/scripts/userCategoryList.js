import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import styles from '../css/base.css';
import JobCategory from './userJobCategory';

module.exports = React.createClass({
	render: function() {
		var toggleCheckBox = this.props.toggleCheckBox;
		
		if (this.props.data1 !== undefined) {
			var jobNodes = this.props.data1.map(function(job) {
				return (
					<JobCategory id={job.id} title={job.title} key={job.id} toggleCheckBox={toggleCheckBox}>
						{job.description}
					</JobCategory>
				);
			});
			
			return (
			<div className={styles.volunteerCategoryList1}>
				<strong>Check all that you are able to assist with:</strong>
					{jobNodes}
			</div>
        );
		}
		else if (this.props.data2 !== undefined) {
			var jobNodes = this.props.data2.map(function(job) {
				return (
					<JobCategory id={job.id} title={job.title} key={job.id} toggleCheckBox={toggleCheckBox}>
						{job.description}
					</JobCategory>
				);
			});
			
			return (
			<div className={styles.volunteerCategoryList2}>
					<br />
					{jobNodes}
			</div>
        );
		}   
    }
});
