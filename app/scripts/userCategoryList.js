import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import JobCategory from './userJobCategory';

module.exports = React.createClass({
	render: function() {
		var toggleCheckBox = this.props.toggleCheckBox
        var jobNodes = this.props.data.map(function(job) {
            return (
                <JobCategory id={job.id} title={job.title} key={job.id} toggleCheckBox={toggleCheckBox}>
                    {job.description}				
                </JobCategory>
            );
        });
        return (
            <div className="categoryList">
                {jobNodes}
            </div>
        );
    }
});