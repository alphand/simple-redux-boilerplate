import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import * as CounterActions from '../actions/CounterActions';


const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

const mapActionToProps = (dispatch) => {
    return {
        handleIncrement: () => {
            dispatch(CounterActions.incrementAsync())
        },
        handleDecrement: () => {
            dispatch(CounterActions.decrement());
        }
    }
}

class Counter extends Component {
    constructor(props, context) {
        super(props, context);
    }

    // handleIncrement() {
    //     // console.log(this.props.actions);
    //     this.props.actions.incrementAsync()
    //         .then(() =>{
    //             console.log('something here', arguments);
    //         });
    // }

    // handleDecrement() {
    //     this.props.actions.decrement();
    // }

    render() {
        const props = this.props;
        return (
            <div className="counter-container">
                <div className="counter-num-label">{props.counter}</div>
                {
                    /*
                    Below, the even or odd statement is simply used to demonstrate how one could
                    easily use a ternary operator to conditionally show an 'even' or 'odd' string
                    based on the counter's value on state.
                    */
                }
                <div className="counter-even-label">{props.counter % 2 === 0 ? 'even' : 'odd'}</div>
                <br />
                <div className="counter-buttons">
                    <button onClick={() => {props.handleDecrement();}}>-</button>
                    <button onClick={() => {props.handleIncrement();}}>+</button>
                </div>
            </div>
        );
  }
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionToProps)(Counter)
