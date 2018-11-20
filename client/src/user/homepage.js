// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../servicesAndWidgets/widgets';
import {CaseService} from "../servicesAndWidgets/services";
import {HomepageCard} from "../cards/homepageCard";

let caseService = new CaseService();

export class Homepage extends Component<>{
    casesTitle: string[] = [];
    casesPic: string[] = [];
    counter:number = 0;
    render() {
        console.log('At homepage');
        return(
            <div>

                {this.casesTitle.map((e,i)  => {
                    console.log(this.counter);
                if (i <19) //Only allow 20 cases to get loaded at the homepage
                {
                    return (
                        <HomepageCard key={e} title={e} pic={this.casesPic[i]}/>)
                }//end condition
            })}
            </div>
        )

    }//end method

    mounted(){
        caseService.getCases().then(response => console.log(response[0]));
        caseService.getCases().then(response => {
            response.map(e => this.casesTitle.push(e.overskrift));
            response.map(e => this.casesPic.push(e.bilde));
        }).catch((error: Error)=> Alert.danger(error.message));
    }//end method

}//end class