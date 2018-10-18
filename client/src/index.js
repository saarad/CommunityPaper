// @flow
/* eslint eqeqeq: "off" */

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert } from './widgets';

// Only use in development
if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Student {
  id: number;
  static nextId = 1;

  firstName: string;
  lastName: string;
  email: string;

  constructor(firstName: string, lastName: string, email: string) {
    this.id = Student.nextId++;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
let students = [
  new Student('Ola', 'Jensen', 'ola.jensen@ntnu.no'),
  new Student('Kari', 'Larsen', 'kari.larsen@ntnu.no')
];

class Menu extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} exact to="/">
                React example
              </NavLink>
            </td>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} to="/students">
                Students
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class Home extends Component {
  render() {
    return <div>React example with component state</div>;
  }
}

class StudentList extends Component {
  render() {
    return (
      <ul>
        {students.map(student => (
          <li key={student.email}>
            <NavLink activeStyle={{ color: 'darkblue' }} exact to={'/students/' + student.id}>
              {student.firstName} {student.lastName}
            </NavLink>{' '}
            <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.id + '/edit'}>
              edit
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

class StudentDetails extends Component<{ match: { params: { id: number } } }> {
  render() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return null; // Return empty object (nothing to render)
    }
    return (
      <div>
        <ul>
          <li>First name: {student.firstName}</li>
          <li>Last name: {student.lastName}</li>
          <li>Email: {student.email}</li>
        </ul>
      </div>
    );
  }
}

class StudentEdit extends Component<{ match: { params: { id: number } } }> {
  firstName = ''; // Always initialize component member variables
  lastName = '';
  email = '';

  render() {
    return (
      <form>
        <ul>
          <li>
            First name:{' '}
            <input
              type="text"
              value={this.firstName}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.firstName = event.target.value)}
            />
          </li>
          <li>
            Last name:{' '}
            <input
              type="text"
              value={this.lastName}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.lastName = event.target.value)}
            />
          </li>
          <li>
            Email:{' '}
            <input
              type="text"
              value={this.email}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.email = event.target.value)}
            />
          </li>
        </ul>
        <button onClick={this.save}>Save</button>
      </form>
    );
  }

  // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)
  mounted() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.email = student.email;
  }

  save() {
    let student = students.find(student => student.id == this.props.match.params.id);
    if (!student) {
      Alert.danger('Student not found: ' + this.props.match.params.id);
      return;
    }

    student.firstName = this.firstName;
    student.lastName = this.lastName;
    student.email = this.email;

    // Go to StudentDetails after successful save
    history.push('/students/' + student.id);
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
        <Route path="/students" component={StudentList} />
        <Route exact path="/students/:id" component={StudentDetails} />
        <Route exact path="/students/:id/edit" component={StudentEdit} />
      </div>
    </HashRouter>,
    root
  );
