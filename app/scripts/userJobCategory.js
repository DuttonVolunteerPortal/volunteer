import React from 'react';
import Remarkable from 'remarkable';

module.exports = React.createClass({

	// Rawmarkup method for the description of the job
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },

    // Toggle the check box of the job by calling the props toggleCheckBox method
	toggleCheckBox: function(e) {
		this.props.toggleCheckBox(this.props.title)
	},

	// Render method for this React class
    render: function() {
        return (
            <div class="jobCategory">
				<hr />
					<form>
						<input type="checkbox" name={this.props.title} id={this.props.title} onChange={this.toggleCheckBox} /><label for={this.props.title}> {this.props.title}</label>
					</form>
					<span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});