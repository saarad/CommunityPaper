import { Component } from 'react-simplified';
import {NavLink} from "react-router-dom";
import * as React from "react";

export class ContentCard extends Component<{title: string; highlightedText:string, pic: string,
    text:string,time:string}>{
    render(){
        return(
            <div className="card container col-10">
                <img className="card-img-top" src={this.props.pic}/>
                <h1 className="card-title">{this.props.title}</h1>
                <div className="card-body">
                    <div className="font-italic"> {this.props.highlightedText}</div>
                    <p className="card-text"> {this.props.text}</p>
                    <div className="blockquote-footer text-center">Publisert {this.props.time} </div>
                    <div className="card-footer" style={{background: 'silver'}}> Contact info: iliar@stud.ntnu.no</div>
                </div>
            </div>
        )
    }//end method
}//end class