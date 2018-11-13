// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './servicesAndWidgets/widgets';
import {CaseService} from "./servicesAndWidgets/services";

export class AddNewCase extends Component{
    title: string = '';
    pic: string = '';
    highlightedText: string = '';
    time: string = '';
    text: string = '';

    render(){
        return(
            <div className="bg-dark">
                <h1 className="card-title text-center" style={{color: 'white'}}>Legg til din sak</h1>
                <form className="card container bg-dark border-0">
                    <ul className="input-group list-inline">
                        <li className="list-group-item bg-dark border-0">
                            <h3 style={{color: 'white'}}> Overskrift {' '} </h3>
                        </li>
                        <input className="list-group-item-action input-group-append input-group-text"
                        type="text"
                        value={this.title}
                        onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.title = event.target.value)}/>

                        <li className="list-group-item bg-dark border-0">
                            <h3 style={{color: 'white'}}> BrødTekst {' '} </h3>
                        </li>
                        <input className="list-group-item-action input-group-append input-group-text"
                               type="text"
                               value={this.highlightedText}
                               onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.highlightedText = event.target.value)}/>

                        <li className="list-group-item bg-dark border-0">
                            <h3 style={{color: 'white'}}> Bildeadresse (fra nettet) {' '} </h3>
                        </li>
                        <input className="list-group-item-action input-group-append input-group-text"
                               type="text"
                               value={this.pic}
                               onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.pic = event.target.value)}/>

                        <li className="list-group-item bg-dark border-0">
                            <h3 style={{color: 'white'}}> Innhold {' '} </h3>
                        </li>
                         <textarea
                        className=" my-sm-3 form-control"
                        id="content"
                        value={this.text}
                        onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.text = event.target.value)}
                        rows="4"> </textarea>
                    </ul>
                </form>
            </div>
        )
    }//end method


}//end class