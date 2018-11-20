// @flow
/* eslint eqeqeq: "off" */

import { Component } from 'react-simplified';
import {NavLink} from "react-router-dom";
import * as React from "react";
export class NavbarCard extends Component<{title: string, path:string}>{
    path:string = '/category/'+ this.props.path;
    render() {
        return(
            <NavLink activeStyle={{color: 'black'}} style={{color: 'white'}}
                     className="navbar-toggler"
                     exact to={this.path}>
                <h5>{this.props.title} </h5>
            </NavLink>
        )
    }

}//end class