// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../servicesAndWidgets/widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path
import {CaseService} from "../servicesAndWidgets/services";
import {News} from "../news";
import {Category} from "../category";
import {Importance} from "../importance";

let caseService = new CaseService();
let news: News;
let date = new Date();

export class InteractWithCase extends Component{
    cases: News[] = [];
    chosenCase: string = '';
    render(){
        return(
            <div className="bg-dark text-center">
                <h1 style={{color: 'white'}}> Velg saken du vil redigere</h1>
                <select className="btn btn-secondary" onChange={this.setCase}>
                        <option value="" className="btn btn-secondary">Velg sak</option>
                        {
                            this.cases.map(e => {
                                return <option key={e.title} value={e.title} className="btn btn-secondary">{e.title}</option>
                            })
                        }
                </select>
                <br/>
                <br/>
                <br/>
                <button className="btn btn-primary" onClick={this.edit}> Rediger saken</button>
            </div>
        )
    }//end method

    mounted(){
        caseService.getAllCases().then(response => {
            response.map(e => {
               let allNews = new News(e.overskrift,e.brodtekst,e.tidspunkt,e.bilde,e.innhold,new Category(e.kategori),new Importance(e.viktighet));
                allNews.setId(e.id);
                this.cases.push(allNews);
            });
        }).catch((error: Error) => Alert.danger(error.message));
    }//end method

    setCase(event: Event){
        this.chosenCase = event.target.value;
    }//end method

    edit(){
      news = this.cases.find(e => e.title === this.chosenCase);
     if(news !== undefined) history.push('/redigerSak');
     else Alert.danger('Du må velge saken du vil redigere!');
    }//end method
}//end class



export class Edit extends Component{
    title: string = '';
    pic: string = '';
    highlightedText: string = '';
    time: string = '';
    text: string = '';
    category: string = '';
    categories: string[] = [];
    importance: number[] = [1,2,3,4,5];
    chosenImportance: number = 0; //does not exist in database
    added: boolean = false;
    render(){
        return(
            <div className="bg-dark">
                <h1 className="card-title text-center" style={{color: 'white'}}>Rediger din sak</h1>
                <br/>

                <form className="card container bg-dark border-0">
                    <ul className="input-group list-inline">
                        <li className="list-group-item bg-dark border-0">
                            <h3 style={{color: 'white'}}> Overskrift {' '} </h3>
                        </li>
                        <input className="list-group-item-action input-group-text"
                               type="text"
                               value={this.title}
                               onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.title = event.target.value)}/>

                        <li className="list-group-item bg-dark border-0">
                            <h3 style={{color: 'white'}}> BrødTekst {' '} </h3>
                        </li>
                        <input className="list-group-item-action input-group-text"
                               type="text"
                               value={this.highlightedText}
                               onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.highlightedText = event.target.value)}/>

                        <li className="list-group-item bg-dark border-0">
                            <h3 className="float-left" style={{color: 'white'}}> Bildeadresse (fra nettet) {' '} </h3>
                        </li>
                        <input className="list-group-item-action input-group-text"
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
                    <div className="">
                        <h3 style={{color: 'white'}}>Velg kategori </h3>
                        <select className="btn btn-secondary" onChange={this.setCategory}>
                            <option value={this.category} className="btn btn-secondary">
                                {this.category}
                            </option>
                            {
                                this.categories.map(e => {
                                    if(e !== this.category)
                                    return <option key={e} value={e} className="btn btn-secondary">
                                        {e}
                                    </option>
                                })
                            }
                        </select>

                        <h3 style={{color: 'white'}}>Velg viktighet </h3>
                        <select className="btn btn-secondary" onChange={this.setImportance}>
                            <option value={this.chosenImportance} className="btn btn-secondary">
                                {this.chosenImportance}
                            </option>
                            {
                                this.importance.map(e => {
                                    if(e !== this.importance)
                                        return <option key={e} value={e} className="btn btn-secondary">
                                            {e}
                                        </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="text-center btn-group-lg">
                        <button type="button" className="btn btn-danger" onClick={this.save}>
                            Lagre
                        </button>
                    </div>
                </form>
            </div>
        )
    }//end method

    mounted(){
        this.title = news.title;
        this.highlightedText = news.highlightedText;
        this.pic = news.pic;
        this.text = news.context;
        this.category = news.category.title;
        this.chosenImportance = news.importance.importance;
        caseService.getAllCategories().then(response => response.map(e => this.categories.push(e.navn))).
        catch((error: Error) => Alert.danger(error.message));
    }//end method

    save(){
       this.time = date.getDate() + '/' + (date.getUTCMonth()+1) + '/' +
       date.getFullYear() + ' KL: ' + date.getHours() + ':' + date.getMinutes();

       this.added = this.title !== '' && this.pic !== '' && this.highlightedText !== '' &&
           this.text !== '' && this.category !== '';

        if(this.added){
            if(confirm('Lagre?')){
                let editedNews: News = new News(this.title,this.highlightedText,this.time,this.pic,this.text,
                    new Category(this.category),new Importance(this.chosenImportance));
                editedNews.setId(news.id);
                caseService.editCase(editedNews);
                Alert.success('Du har endret på sak med tittelen ' + editedNews.title);
                history.push('/');
            }//end condition
        }else{
            confirm('Du må fylle ut alle feltene!');
        }//end condition

    }//end method

    setCategory(event:Event){
        this.category = event.target.value;
    }//end method

    setImportance(event: Event){
        this.chosenImportance = event.target.value
    }//end method
}//end class
