// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert } from './widgets';
import { studentService } from './services';
import {CaseService} from "./services";
import {Homepage} from "./homepage";
import {CaseView} from "./caseView";
import {NavbarCard} from "./cards/navbarCard";

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
let caseService = new CaseService();

class Menu extends Component {
  render() {
    return (
        <div className="card">
          <div className="card-body" style={{background: 'darkblue'}}>
              <nav className="navbar navbar-collapse align-top" style={{background: 'darkblue'}}>
                  <NavLink style={{color: 'silver'}}
                           className="navbar-toggler"
                           exact to="/">
                      <h2>Kalvskinnet Times </h2>
                  </NavLink>
                  <NavbarCard title={'økonomi'} path={'okonomi'}/>
                  <NavbarCard title={'sport'} path={'sport'}/>
                  <NavbarCard title={'underholdning'} path={'underholdning'}/>

              </nav>
          </div>
        </div>
    );
  }
}



class StudentList extends Component {
  students = [];

  render() {
    return (
      <div>
        <h2> {this.students} </h2>
      </div>
    );
  }

  mounted() {
    studentService.getStudents().then(response => console.log(response[0]));
    studentService
      .getStudents()
      .then(students => (this.students = students[0].overskrift))
      .catch((error: Error) => Alert.danger(error.message));

  }
}

class StudentDetails extends Component<{ match: { params: { id: number } } }> {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <ul>
          <li>First name: {this.student.firstName}</li>
          <li>Last name: {this.student.lastName}</li>
          <li>Email: {this.student.email}</li>
        </ul>
      </div>
    );
  }

  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then(student => (this.student = student))
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class StudentEdit extends Component<{ match: { params: { title: string } } }> {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <form>
        <ul>
          <li>
            First name:{' '}
            <input
              type="text"
              value={this.student.title}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.student) this.student.title = event.target.value;
              }}
            />
          </li>

        </ul>
        <button type="button" onClick={this.save}>
          Save
        </button>
      </form>
    );
  }

  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then(student => (this.student = student))
      .catch((error: Error) => Alert.danger(error.message));
  }

  save() {
    if (!this.student) return null;

    studentService
      .updateStudent(this.student)
      .then(() => {
        let studentList = StudentList.instance();
        if (studentList) studentList.mounted(); // Update Studentlist-component
        if (this.student) history.push('/students/' + this.student.id);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Homepage} />
        <Route path="/:title" component={CaseView} />
        <Route path="/students" component={StudentList} />
        <Route exact path="/students/:id" component={StudentDetails} />
        <Route exact path="/students/:id/edit" component={StudentEdit} />
      </div>
    </HashRouter>,
    root
  );
