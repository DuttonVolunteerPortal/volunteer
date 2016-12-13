import React from 'react';
import Remarkable from 'remarkable';

module.exports = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div className="jobCategory">
				<form>
					<input type="checkbox" name={this.props.title} id={this.props.title} /><label for={this.props.title}> {this.props.title}</label>
				</form>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});