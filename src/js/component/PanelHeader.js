/**
 * Created by nikhila on 9/9/2015.
 */
let React = require('react');
let CalendarStore = require('../stores/Calendar');
let CalendarAction = require('../actions/Calendar');

class PanelHeaderNavigation extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        this.props.updateTimeViewHandler(e.target.getAttribute('href') || e.target.parentNode.getAttribute('href'));
    }
    render() {
        return (
            <span>
                <a onClick={this.handleClick} href="today" className={ "waves-effect waves-light btn" + (CalendarStore.getSelectedDate().isSame(new Date, 'day') ? ' disabled' : '') }>Today</a>
                <a onClick={this.handleClick} href="prev" className="waves-effect waves-light btn">
                    <i className="medium mdi-hardware-keyboard-arrow-left"></i>
                </a>
                <a onClick={this.handleClick} href="next" className="waves-effect waves-light btn">
                    <i className="medium mdi-hardware-keyboard-arrow-right"></i>
                </a>
            </span>
        );
    }
}

class PanelHeaderZoneManagment extends React.Component {
    constructor() {
        super();
        this.setActiveState = this.setActiveState.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componenetDidMount() {
        this.setActiveState(CalendarStore.getSelectedView());
    }
    setActiveState(elem) {
        for(let ref in this.refs) {
            this.refs[ref].getDOMNode().classList.remove('mdi-navigation-check');
        }
        this.refs[elem].getDOMNode().classList.add('mdi-navigation-check');
    }
    handleClick(e) {
        e.preventDefault();
        this.setActiveState(e.target.getAttribute('href'));
        this.props.updateZoneViewHandler(e.target.getAttribute('href'));
    }
    render() {
        return (
            <span>
                <a onClick={this.handleClick} href="month" ref="month" className="waves-effect waves-teal btn right">Month</a>
                <a onClick={this.handleClick} href="week" ref="week" className="waves-effect waves-teal btn right">Week</a>
                <a onClick={this.handleClick} href="day" ref="day" className="waves-effect waves-teal btn right mdi-navigation-check">Day</a>
            </span>
        );
    }
}

class PanelHeader extends React.Component {
    constructor(props) {
        super();
        this.state = {
            title: props.title
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title
        });
    }
    render() {
        let style = {
            paddingLeft: '15px'
        };
        return (
            <div className="section">
                <PanelHeaderNavigation {...this.props}/>
                <span className="blue-grey-text center ng-binding ng-scope" style={style}>{this.state.title}</span>
                <PanelHeaderZoneManagment {...this.props} />
            </div>
        );
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.title != this.props.title;
    }
}

export default PanelHeader;