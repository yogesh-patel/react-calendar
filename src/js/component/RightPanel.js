/**
 * Created by nikhila on 9/8/2015.
 */
let React = require('react');
let PanelHeader = require('./PanelHeader');

class RightPanel extends React.Component {
    render() {
        return (
            <div className="col l10">
                <PanelHeader className="row" {...this.props}/>
                <div className="divider"/>
                { this.props.modulelToLoad }
            </div>
        );
    }
}

export default RightPanel;