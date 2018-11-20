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
    render() {
        console.log('At homepage');
        return(

            (this.casesTitle.map((e,i)  => {
                if (i !== 19) //Only allow 20 cases to get loaded at the homepage
                {
                    return (
                        <HomepageCard key={e} title={e} pic={this.casesPic[i]}/>)
                }//end condition
            })))

    }//end method

    mounted(){
        caseService.getCases().then(response => console.log(response[0]));
        caseService.getCases().then(response => {
            response.map(e => this.casesTitle.push(e.overskrift));
            response.map(e => this.casesPic.push(e.bilde));
        }).catch((error: Error)=> Alert.danger(error.message));
    }//end method

}//end class