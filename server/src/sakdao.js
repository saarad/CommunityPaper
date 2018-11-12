// @flow
const Dao = require("./dao.js");
export class SakDao extends Dao {
    getImportantNews(callback){
        super.query("select overskrift,bilde from sak where viktighet=5",[],callback);
    }//end method


    getContextForNews(title,callback){
        super.query("select overskrift,innhold,bilde,tidspunkt,kategori,viktighet,brodtekst from sak where overskrift=?",
            [title],callback);
    }//end method

    getCategoryNews(category,callback){
        super.query("select overskrift,bilde from sak where kategori=?",
            [category],callback);
    }//end method

    createNews(json,callback){
        let val = [json.overskrift, json.tidspunkt,json.innhold,
        json.bilde, json.kategori, json.viktighet];
        super.query("insert into sak(overskrift,tidspunkt,innhold,bilde,kategori,viktighet) values(?,?,?,?,?,?)",
            val,callback);
    }//end method
};