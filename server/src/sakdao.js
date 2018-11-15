// @flow
const Dao = require("./dao.js");
export class SakDao extends Dao {
    getImportantNews(callback){
        super.query("select overskrift,bilde,tidspunkt from sak where viktighet=5",[],callback);
    }//end method

    getAllNews(callback){ //To get number of cases. Used to set id for new cases
        super.query("select overskrift from sak",[],callback);
    }//end method

    getAllCategories(callback){
        super.query("select navn from kategori", [], callback);
    }//end method

    getContextForNews(title,callback){
        super.query("select overskrift,innhold,bilde,tidspunkt,kategori,viktighet,brodtekst from sak where overskrift=?",
            [title],callback);
    }//end method

    getCategoryNews(category,callback){
        super.query("select overskrift,bilde from sak where kategori=?",
            [category],callback);
    }//end method

    createNews(id,json,callback){
        let val = [id,json.title,json.highlightedText, json.time,json.context,
        json.pic, json.category.title, json.importance.importance];
        super.query("insert into sak(id,overskrift,brodtekst,tidspunkt,innhold,bilde,kategori,viktighet) values(?,?,?,?,?,?,?,?)",
            val,callback);
    }//end method
};