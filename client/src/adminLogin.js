// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './servicesAndWidgets/widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path
import {CaseService} from "./servicesAndWidgets/services";

let caseService = new CaseService();

export class AdminLogin extends Component{
    key: string = '';
    userInput: string = '';

    render(){
      return(
          <div className="bg-light text-center">
              <h1> Skriv inn din admin-key</h1>
              <input className="list-group-item-action input-group-text"
              type="text"
              value={this.userInput}
              onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.userInput = event.target.value)}/>
              <span><i>Om du ikke har fått en key kan du sende en forespørsel til iliar@ntnu.stud.no</i></span>
              <br/>
              <button type="button" className="btn btn-primary" onClick={this.proceed}>Logg inn</button>
              <br/>
              <br/>
              <br/>

          </div>
      )

    }//end method

    mounted(){
        caseService.getKey().then(response =>  {
            this.key = response[0].passord;
        }).catch((error: Error) => Alert.danger(error.message));
    }//end method

    proceed(){
        if(this.userInput === this.key){
            history.push('/adminPage')
        }else{
            Alert.danger('Ditt password feil');
        }//end condition
    }//end method
}//end class