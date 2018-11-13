// @flow
/* eslint eqeqeq: "off" */

import { Component } from 'react-simplified';
import {NavLink} from "react-router-dom";
import * as React from "react";

export class ContentCard extends Component<{title: string; highlightedText:string, pic: string,
    text:string,time:string}>{
    render(){
        return(
            <div style={{background: 'silver'}}>
                <div className="card container">
                    <img className="card-img-top" src={this.props.pic} />
                    <h1 className="card-title">{this.props.title}</h1>
                    <div className="card-body">
                        <h6 className="font-italic"> {this.props.highlightedText}</h6>
                        <br/>
                        <p className="card-text"> {this.props.text}</p>
                        <div className="card-footer text-center text-muted">Publisert {this.props.time} </div>
                    </div>
                </div>
            </div>
        )
    }//end method
}//end class