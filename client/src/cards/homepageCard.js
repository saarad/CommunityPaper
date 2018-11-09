import { Component } from 'react-simplified';
import {NavLink} from "react-router-dom";
import * as React from "react";

export class HomepageCard extends Component<{title: string, pic: string}>{
    render(){
        return(
          <div style={{background: 'silver'}}>
              <div className="card container col-6">
                  <img className="card-img-top" src={this.props.pic} width ='50' height='300'/>
                  <div className="card-body">
                      <h5 className="card-title"> {this.props.title}</h5>
                      <NavLink className="btn btn-primary" to={'/' + this.props.title}>
                        Les innhold
                      </NavLink>
                  </div>
              </div>
          </div>
        );
    }//end method
}//end class