// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../servicesAndWidgets/widgets';
import {CaseService} from "../servicesAndWidgets/services";
import {ContentCard} from "../cards/contentCard";
import {Comments} from "../comments";
import {News} from "../news";
import {Category} from "../category";
import {Importance} from "../importance";
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path


let news:News;
let caseService = new CaseService();
let noComments: boolean = true;

export class CaseView extends Component<{match: {params: {title: string}}}>{
    id: number = 0; //0 doesn't exist in database
    title: string = '';
    pic: string = '';
    highlight: string = '';
    text: string ='';
    time: string = '';
    category:string = '';
    importance:number = 0; //0 doesn't exist in database
    comments: Comments[] = [];
    nickname:string = '';
    userComment:string = '';

    render(){
        return(
            <div style={{background: 'silver'}}>
                <ContentCard title={this.title} highlightedText={this.highlight} pic={this.pic}
                         text={this.text} time={this.time} comments={this.comments}/>

                <ul className="input-group list-inline container col-9 border-0" style={{background: 'white'}}>
                    <input type="text" className="list-group-item-action input-group-text"
                    value={this.nickname}
                    placeholder='Nickname'
                    onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.nickname = event.target.value)}/>

                    <textarea className="list-group-item-action input-group-text"
                    rows="4"
                    value={this.userComment}
                    onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.userComment = event.target.value)}
                    placeholder='Kommentar'>
                    </textarea>
                    <button className="btn btn-secondary" type="button"
                    onClick={this.addComment}>Legg til kommentar</button>
                </ul>

                <div className="card-footer text-center text-muted bg-light">Sist redigert {this.time} </div>
            </div>
        )
    }//end method

    mounted(){
        console.log('In case ' + this.props.match.params.title);
        caseService.getCaseContent(this.props.match.params.title).then(response => {
            this.id = response[0].id;
            this.title = response[0].overskrift;
            this.pic = response[0].bilde;
            this.highlight = response[0].brodtekst;
            this.text = response[0].innhold;
            this.time = response[0].tidspunkt;
            this.category = response[0].kategori;
            this.importance = response[0].viktighet;

            news = new News(this.title,this.highlight,this.time,this.pic,this.text,new Category(this.category),new Importance(this.importance));
            news.setId(this.id);

            caseService.getComments(news).then(response => {
                response.map(e => {
                    this.comments.push(new Comments(e.navn,e.kommentar));

                    if(!noComments){ //Give no default message
                        this.comments.filter(e => e !== this.comments[0]);
                        noComments = true;
                    }
                });

                //If there is no comments give default message
                if(this.comments[0] === undefined){
                    this.comments.push(new Comments('Ingen kommentarer enda', 'Vær den første til å kommentere'));
                    noComments = false;
                }//end condition
            }).catch((error: Error) => Alert.danger(error.message));
        }).catch((error:Error) => Alert.danger(error.message));
    }//end method

    addComment(){
        if(this.nickname !== '' && this.userComment !== ''){
            let newComment: Comments = new Comments(this.nickname,this.userComment);
            if(confirm('Legge til kommentar? ' + '\nNickname: ' + this.nickname + '\nKommentar: ' + this.userComment)){
                history.push('/case/' + news.title);
                caseService.postComments(news,newComment).then(response => { //posting and then loading comment

                    caseService.getComments(news).then(response => {
                        response.map(e => {
                            if(e.navn !== this.comments.map(f => f.name))this.comments.push(new Comments(e.navn,e.kommentar));
                        })
                    }).catch((error: Error) => Alert.danger(error.message));


                    }).catch((error: Error) => Alert.danger(error.message));
            }//end condition
        }else{
            confirm('Begge feltene må være fylt for å legge til en kommentar!')
        }//end condition
    }//end method
}//end class