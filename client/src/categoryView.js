// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './servicesAndWidgets/widgets';
import {CaseService} from "./servicesAndWidgets/services";
import {HomepageCard} from "./cards/homepageCard";

let caseService = new CaseService();

export class CategoryView extends Component<{match: {params: {category: string}}}>{
    casesTitle: string[] = [];
    casesPic: string[] = [];
    render() {
        console.log('At category ' + this.props.match.params.category);
        return (
            (this.casesTitle.map((e, i) => {
                return <HomepageCard key={e} title={e} pic={this.casesPic[i]}/>
            }))
        )
    }//end method

    mounted(){
        caseService.getCategory(this.props.match.params.category).then(response => console.log(response[0]));
        caseService.getCategory(this.props.match.params.category).then(response => {
            response.map(e =>{
                this.casesTitle = [];
            this.casesTitle.push(e.overskrift)});
            response.map(e => {
                this.casesPic = [];
                this.casesPic.push(e.bilde)
            });
        }).catch((error:Error) => Alert.danger(error.message));
    }//end method
}//end class