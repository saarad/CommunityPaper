// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../servicesAndWidgets/widgets';
import {news} from "./addNewCase";
import {News} from "../news";
import {CaseService} from "../servicesAndWidgets/services";
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path

let caseService = new CaseService();

export class ConfirmAddCase extends Component{
    category: string = '';
    news: News = news;

    render(){
        return(
            <div className="bg-dark">
                <h1 className="card-title text-center" style={{color: 'white'}}>Les over og bekreft</h1>
                <br/>

                <div className="container bg-light">
                    <h4> Overskrift: </h4>
                    <div className="text-muted"> {this.news.title}</div>
                </div>

                <div className="container bg-light">
                    <h4> Kategori: </h4>
                    <div className="text-info"> {this.news.category.title}</div>
                </div>

                <div className="container bg-light">
                    <h4> Viktighet: </h4>
                    <div className="text-info"> {this.news.importance.importance}</div>
                </div>

                <div className="container bg-light">
                    <h4> Brodtekst:  </h4>
                    <div className="text-muted"> {this.news.highlightedText}</div>
                </div>

                <div className="container bg-light">
                    <h4> Bilde:  </h4>
                    <img src={this.news.pic}/>
                </div>

                <div className="container bg-light">
                    <h4> Innhold:  </h4>
                    <div className="text-muted"> {this.news.context}</div>
                </div>

                <button className="btn btn-primary" onClick={this.confirmed}> Legg til</button>
                <button className="btn btn-danger" onClick={this.canceled}>Avbryt</button>
            </div>
        )
    }//end method

    confirmed(){
        caseService.addCase(news);
        Alert.success('Sak med tittel ' + news.title + ' har blitt lagt til under kategori ' + news.category.title);
        history.push('/');
    }//end method

    canceled(){
        Alert.info('Sak ble ikke lagt til');
        history.push('/leggTilSaker');
    }//end method
}//end class