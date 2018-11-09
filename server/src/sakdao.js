// @flow
const Dao = require("./dao.js");
export class SakDao extends Dao {
    getAllNewsNames(callback){
        super.query("select overskrift from sak", [], callback);
    }//end method

    getImportantNews(callback){
        super.query("select overskrift,bilde from sak where viktighet=5",[],callback);
    }//end method

    getOneNewsName(title,callback){
        super.query("select overskrift from sak where overskrift=?",
            [title], callback);
    }//end method

    getAllTimes(callback){
        super.query("select tidspunkt from sak",[],callback);
    }//end method

    getTimeForNews(title,callback){
        super.query("select tidspunkt from sak where overskrift=?",
            [title],callback);
    }//end method

    getAllCategories(callback){
        super.query("select navn from kategori",[],callback);
    }//end method

    getCategoriForNews(title,callback){
        super.query("select kategori from sak where overskrift=?",
            [title],callback);
    }//end method

    getImportanceForNews(title,callback){
        super.query("select viktighet from sak where overskrift=?",
            [title],callback);
    }//end method

    getContextForNews(title,callback){
        super.query("select overskrift,innhold,bilde,tidspunkt,kategori,viktighet from sak where title=?",
            [title],callback);
    }//end method

    getPictureForNews(title,callback){
        super.query("select bilde from sak where overskrift=?",
            [title],callback);
    }//end method

    createNews(json,callback){
        let val = [json.overskrift, json.tidspunkt,json.innhold,
        json.bilde, json.kategori, json.viktighet];
        super.query("insert into sak(overskrift,tidspunkt,innhold,bilde,kategori,viktighet) values(?,?,?,?,?,?)",
            val,callback);
    }//end method
};