import React from 'react';
import './App.css';



class App extends React.Component {
  render() {
    return (
      <div className="App">
      <p>
      <a href="/employees">Employee List</a>
      </p>
      <p>
      <a href="/createEmployee">Add Employee</a>
      </p>

      </div>
    );
  }
}

export default App;
