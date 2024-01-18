import './App.css';
import React from 'react';

const App = (props) => {
  return (
    <div className="TableApp">
      <div>Table {props.text}</div>
    </div>
  );
}

export default App;
