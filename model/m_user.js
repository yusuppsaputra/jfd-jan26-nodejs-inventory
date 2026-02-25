const mysql     = require('mysql2')
const db        = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kelas_js_januari'
})
db.connect()


module.exports =
{
    get_1_username: function(form_username) {
        let sql = mysql.format(
            'SELECT * FROM user WHERE username = ?', [form_username]
        )

        return new Promise( function(resolve,reject) {
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    }
}