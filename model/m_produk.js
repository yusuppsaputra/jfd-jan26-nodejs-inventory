const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kelas_js_januari'
})

db.connect()

module.exports = {

    // ===============================
    // AMBIL SEMUA PRODUK
    // ===============================
    get_semua_produk: function () {

        let sql = mysql.format(
            'SELECT * FROM master_produk', []
        )

        return new Promise(function (resolve, reject) {

            db.query(sql, function (errorSql, hasil) {

                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }

            })

        })

    },


    // ===============================
    // INSERT PRODUK
    // ===============================
    insert_1_produk: function (req, filename) {

        let sql = mysql.format(
            'INSERT INTO master_produk SET ?',
            [{
                kode: req.body.form_kode_barang.toUpperCase(),
                nama: req.body.form_nama_barang,
                deskripsi: req.body.form_deskripsi,
                foto: (filename) ? filename : null
            }]
        )

        return new Promise(function (resolve, reject) {

            db.query(sql, function (errorSql, hasil) {

                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }

            })

        })

    },


    // ===============================
    // DETAIL PRODUK
    // ===============================
    get_produk_by_id: function (id) {

        let sql = mysql.format(
            'SELECT * FROM master_produk WHERE id = ?',
            [id]
        )

        return new Promise(function (resolve, reject) {

            db.query(sql, function (errorSql, hasil) {

                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil[0])
                }

            })

        })

    },


    // ===============================
    // UPDATE PRODUK
    // ===============================
    update_produk: function(req,id,filename){

    let sql
    let data

    if(filename){

        sql = mysql.format(`
            UPDATE master_produk
            SET
                kode=?,
                nama=?,
                deskripsi=?,
                foto=?
            WHERE id=?
        `,[
            req.body.form_kode_barang.toUpperCase(),
            req.body.form_nama_barang,
            req.body.form_deskripsi,
            filename,
            id
        ])

    }else{

        sql = mysql.format(`
            UPDATE master_produk
            SET
                kode=?,
                nama=?,
                deskripsi=?
            WHERE id=?
        `,[
            req.body.form_kode_barang.toUpperCase(),
            req.body.form_nama_barang,
            req.body.form_deskripsi,
            id
        ])

    }

    return new Promise(function(resolve,reject){

        db.query(sql,function(errorSql,hasil){

            if(errorSql){
                reject(errorSql)
            }else{
                resolve(hasil)
            }

        })

    })

},



    // ===============================
    // DELETE PRODUK
    // ===============================
    delete_produk: function (id) {

        let sql = mysql.format(
            'DELETE FROM master_produk WHERE id = ?',
            [id]
        )

        return new Promise(function (resolve, reject) {

            db.query(sql, function (errorSql, hasil) {

                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }

            })

        })

    }

}
