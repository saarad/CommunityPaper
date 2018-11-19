// @flow
/* eslint eqeqeq: "off" */

import { Component } from 'react-simplified';
import * as React from "react";
import {Comments} from "../comments";

export class ContentCard extends Component<{title: string; highlightedText:string, pic: string,
    text:string,time:string, comments: Comments[]}>{
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
                        <br/>
                        <br/>
                        <br/>
                        <br/>

                        <h4> Kommentarer </h4>
                        {
                            this.props.comments.map(e => {
                                return  ( <div key={e.name} className="card bg-light">
                                        <h5 className="card-title"> {e.name}</h5>
                                        <div className="card-body font-italic">
                                            {e.comment}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }//end method
}//end class