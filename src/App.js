import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';


class App extends Component {
  state = {
    persons: [
      { id:'wqwq', name: 'Max', age: 28},
      { id:'dsds', name: 'Manu', age: 29},
      { id:'ghhg', name: 'Emily', age: 26}
    ],
    showPersons: false
  }

  switchNameHandler = (name) => {
    this.setState({
      persons: [
        { name: name, age: 28},
        { name: 'Manu', age: 29},
        { name: 'Emily', age: 26}
      ]
    })
  }

  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(person => person.id === id);
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    const personsNew = [...this.state.persons];
    personsNew[personIndex] = person;
    this.setState({persons: personsNew});

  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons});
  }


  onClickHandler = (event) => {
    console.log(event.target);
  }

  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;
    if(this.state.showPersons) {
      persons = (
        this.state.persons.map((person, index) => {
          return(
              <Person
              name={person.name}
              age={person.age}
              click={this.deletePersonHandler.bind(this, index)}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          );
        }));

        style.backgroundColor = 'red';
    }
    
    let length = this.state.length;
    if(length === 0)
      length = null;

    let classes = [];
    if(this.state.persons.length <= 2)
      classes.push('red');
    
    if(this.state.persons.length <= 1)
      classes.push('bold');

    return (
        <div className="App">
          <h1>Hi, I am a react App.</h1>
          <p className={classes.join(' ')}>This is really working.</p>
          <button 
            style = {style}
            onClick={ this.togglePersonsHandler }>
            Toggle Persons
          </button>
          {persons} 
        </div>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h2', null, 'Another Child'));
  }
}

export default Radium(App);
