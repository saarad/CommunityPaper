// @flow

const Dao = require("./dao.js");
export class SakDao extends Dao {
    getImportantNews(callback){
        super.query("select overskrift,bilde,tidspunkt from sak where viktighet=5 and aktiv=1",[],callback);
    }//end method

    getAllNews(callback){
        super.query("select * from sak where aktiv=1",[],callback);
    }//end method

    getAllCategories(callback){
        super.query("select navn from kategori", [], callback);
    }//end method

    getContextForNews(title:string,callback){
        super.query("select overskrift,innhold,bilde,tidspunkt,kategori,viktighet,brodtekst from sak where overskrift=?",
            [title],callback);
    }//end method

    getCategoryNews(category:string,callback){
        super.query("select overskrift,bilde from sak where kategori=? and aktiv=1",
            [category],callback);
    }//end method

    createNews(json,callback){
        let val = [json.title,json.highlightedText, json.time,json.context,
        json.pic, json.category.title, json.importance.importance,1];
        super.query("insert into sak(overskrift,brodtekst,tidspunkt,innhold,bilde,kategori,viktighet,aktiv) values(?,?,?,?,?,?,?,?)",
            val,callback);
    }//end method

    editNews(json,callback){
        let val = [json.title,json.highlightedText, json.time,json.context,
            json.pic, json.category.title, json.id];
        super.query("update sak set overskrift=?, brodtekst=?, tidspunkt=?, innhold=?, bilde=?, kategori=? where id =?",
            val, callback);
    }//end method

    deleteNews(json,callback){
        console.log(json.id);
        super.query("update sak set aktiv=0 where id=?",[json.id],callback);
    }//end method
};