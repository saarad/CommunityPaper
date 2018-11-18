// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './servicesAndWidgets/widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path

export class AdminPage extends Component{
    render(){
        return(
            <div className="bg-dark">
                <h1 className="card-title text-center" style={{color: 'white'}}>
                    Velkommen Admin! Velg din handling
                </h1>
                <div className="text-center">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <button className="btn btn-primary" style={{height: 80, width: 170}} onClick={this.addCase}>Legg til sak{' '}</button>
                    <button className="btn btn-secondary align-middle" style={{height: 80, width: 170}} onClick={this.editCase}>Rediger sak{' '}</button>
                    <button className="btn btn-danger" style={{height: 80, width: 170}} onClick={this.deleteCase}>Slett sak</button>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }//end method

    addCase(){
        history.push('/leggTilSaker');
    }//end method

    editCase(){
        history.push('/velgSakRediger');
    }//end method

    deleteCase(){
        history.push('/velgSakSlett');
    }//end method
}//end class