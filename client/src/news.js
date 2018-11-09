// @flow

import {Category} from './category.js';
import {Importance} from './importance.js';

export class News{
    title: string;
    time: string;
    pic: string;
    context: string;
    category: Category;
    importance: Importance;

    constructor(title: string, time: string, pic: string, context: string,
                category: Category,importance: Importance){
        this.title = title;
        this.time = time;
        this.pic = pic;
        this.context = context;
        this.category = category;
        this.importance = importance;
    }//end constructor
} //end class