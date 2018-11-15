// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert } from './servicesAndWidgets/widgets';
import {CaseService} from "./servicesAndWidgets/services";
import {Homepage} from "./homepage";
import {CaseView} from "./caseView";
import {NavbarCard} from "./cards/navbarCard";
import {CategoryView} from "./categoryView";
import {AddNewCase} from "./addNewCase";
import {ConfirmAddCase} from "./confirmAddCase";

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

let caseService = new CaseService();

class Menu extends Component {
    categories: string[] = [];
  render() {
    return (
        <div className="card">
          <div className="card-body" style={{background: 'darkblue'}}>
              <nav className="navbar navbar-collapse align-top float-left" style={{background: 'darkblue'}}>
                  <NavLink exact to="/">
                      <img className="align-content-end" src="https://tihlde.org/assets/2015/02/tihlde-normal-1_03.png" height='100' width='100'/>
                  </NavLink>
                  <NavLink style={{color: 'silver'}}
                           className="navbar-toggler"
                           exact to="/">
                      <h2>Kalvskinnet Times </h2>
                  </NavLink>
                  {
                      this.categories.map(e => {
                         return <NavbarCard key={e} title={e} path={e}/>
                      })
                  }
                  <div className="my-2 my-lg-0">
                      <NavLink className="mr-sm-2 navbar-toggler" style={{color: 'white'}}
                      to="/leggTilSaker">
                          <img className="float-right" src="https://img.icons8.com/metro/1600/plus-2-math.png"
                          height='40' width='40'/>{' '}
                          <h4 className="float-right my-2 my-sm-2">Legg til saker </h4>
                      </NavLink>
                  </div>
              </nav>
          </div>
        </div>
    );
  }//end method

    mounted(){
      caseService.getAllCategories().then(response => {
          response.map(e => this.categories.push(e.navn));
      }).catch((error:Error) => Alert.danger(error.message));
    }//end method

}//end class

class Footer extends Component{
    render(){
        return(
                <div className="card-footer card-columns" style={{color: 'silver',background: 'blue'}}>
                    Contact info: iliar@stud.ntnu.no
                    <h6 className="text-center">
                        &copy;<br/> Ilia Rad Saadat
                    </h6>
                </div>
            )
    }//end method
}//end class

export class LiveFeed extends Component{
    casesTitle: string[] = [];
    casesTime: string[] = [];
    render(){
        return(
            <div className="navbar navbar-collapse navbar-toggler" style={{background: 'white', height: 30}}>
                <marquee behaviour="slide" scrolldelay="50" truespeed="true">
                    {
                        this.casesTitle.map((e,i) => {
                            return <i key={e} className="table-hover">-{e} {'   '} {this.casesTime[i]}{'  '}</i>
                        })
                    }
                </marquee>
            </div>
        )
    }//end method

    mounted(){
        caseService.getCases().then(response => {
            response.map(e => {
                this.casesTitle.push(e.overskrift);
                this.casesTime.push(e.tidspunkt);
            });
        }).catch((error: Error) => Alert.danger(error.message));
    }//end method

    updateLiveFeed(){
        caseService.getCases().then(response => {
            response.map(e => {
                this.casesTitle.push(e.overskrift);
                this.casesTime.push(e.tidspunkt);
            });
        }).catch((error: Error) => Alert.danger(error.message));
    }//end method
}//end class



const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <LiveFeed />
        <Route exact path="/" component={Homepage} />
        <Route path="/category/:category" component={CategoryView} />
        <Route path="/case/:title" component={CaseView} />
        <Route path="/leggTilSaker" component={AddNewCase} />
        <Route path="/bekreft" component={ConfirmAddCase} />

        <Footer />
      </div>
    </HashRouter>,
    root
  );
