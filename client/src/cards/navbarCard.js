import { Component } from 'react-simplified';
import {NavLink} from "react-router-dom";
import * as React from "react";
export class NavbarCard extends Component<{title: string, path:string}>{
    render() {
        return(
            <NavLink activeStyle={{color: 'black'}} style={{color: 'white'}}
                     className="navbar-toggler"
                     exact to={'/'+this.props.path}>
                <h5>{this.props.title} </h5>
            </NavLink>
        )
    }

}//end class