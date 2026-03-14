const mysql     = require('mysql2')
const db        = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kelas_js_januari'
})
db.connect()

module.exports = {

get_semua_jabatan: function(){

    let sql = "SELECT * FROM jabatan ORDER BY nama ASC"

    return new Promise((resolve,reject)=>{
        db.query(sql,(err,result)=>{
            if(err) reject(err)
            else resolve(result)
        })
    })

}

}