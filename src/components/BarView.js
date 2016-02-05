import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    console.log("my state", state);
    return {
        counter:state.counter
    }
}

const BarView = (state, action) => {
    console.log('mycounter', state, action);
  return (
    <div className="view-container">
      <div>Hello from the 'Bar' view! with {state.counter}</div>
    </div>
  );
}

export default BarView;
