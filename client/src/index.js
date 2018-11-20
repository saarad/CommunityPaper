// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert } from './servicesAndWidgets/widgets';
import {CaseService} from "./servicesAndWidgets/services";
import {Homepage} from "./userComponents/homepage";
import {CaseView} from "./userComponents/caseView";
import {NavbarCard} from "./cards/navbarCard";
import {CategoryView} from "./userComponents/categoryView";
import {AddNewCase} from "./adminComponents/addNewCase";
import {ConfirmAddCase} from "./adminComponents/confirmAddCase";
import {AdminPage} from "./adminComponents/adminPage";
import {InteractWithCase} from "./adminComponents/interactWithCase";
import {Edit} from "./adminComponents/interactWithCase";
import {DeleteCase} from "./adminComponents/deleteCase";
import {AdminLogin} from "./adminComponents/adminLogin";

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
                      to="/logIn">
                          <img className="float-right" src="https://img.icons8.com/metro/1600/plus-2-math.png"
                          height='40' width='40'/>{' '}
                          <h4 className="float-right my-2 my-sm-2"> Admin Login</h4>
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
                <marquee behaviour="slide" scrolldelay="40" truespeed="true">
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
                this.casesTitle.filter((e,i) => {
                    if(i !== this.casesTitle.length) return e !== this.casesTitle[i+1];
                });
                this.casesTime.filter((e,i) =>{
                   if(i !== this.casesTime.length) return e !== this.casesTime[i+1];
                });
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
        <Route path="/logIn" component={AdminLogin} />
        <Route path="/adminPage" component={AdminPage} />
        <Route path="/leggTilSaker" component={AddNewCase} />
        <Route path="/bekreft" component={ConfirmAddCase} />
        <Route path="/velgSakRediger" component={InteractWithCase} />
        <Route path="/redigerSak" component={Edit}/>
        <Route path="/velgSakSlett" component={DeleteCase}/>
        <Footer />
      </div>
    </HashRouter>,
    root
  );
