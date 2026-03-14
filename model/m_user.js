const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kelas_js_januari'
})

db.connect()

module.exports = {

    // =============================
    // CEK USERNAME
    // =============================
    get_1_username: function(username){

        let sql = "SELECT * FROM master_user WHERE username = ?"

        return new Promise((resolve,reject)=>{

            db.query(sql,[username],function(err,result){

                if(err) reject(err)
                else resolve(result)

            })

        })

    },


    // =============================
    // GET SEMUA USER
    // =============================
    get_semua_user: function(){

        let sql = `
        SELECT 
        u.*,
        j.nama AS role
        FROM master_user u
        LEFT JOIN jabatan j
        ON u.id_jabatan = j.id
        ORDER BY u.id DESC
        `

        return new Promise((resolve,reject)=>{

            db.query(sql,function(err,result){

                if(err) reject(err)
                else resolve(result)

            })

        })

    },


    // =============================
    // GET 1 USER
    // =============================
    get_1_user: function(id){

        let sql = `
        SELECT 
        u.*,
        j.nama AS role
        FROM master_user u
        LEFT JOIN jabatan j
        ON u.id_jabatan = j.id
        WHERE u.id = ?
        `

        return new Promise((resolve,reject)=>{

            db.query(sql,[id],function(err,result){

                if(err) reject(err)
                else resolve(result)

            })

        })

    },


    // =============================
    // INSERT USER
    // =============================
    insert_user: function(data){

        let sql = `
        INSERT INTO master_user
        (username,password,nama,id_jabatan,status)
        VALUES (?,?,?,?,?)
        `

        return new Promise((resolve,reject)=>{

            db.query(sql,[
                data.username,
                data.password,
                data.nama,
                data.id_jabatan,
                data.status
            ],function(err,result){

                if(err) reject(err)
                else resolve(result)

            })

        })

    },


    // =============================
    // UPDATE USER
    // =============================
    update_user: function(id,data){

        let sql = `
        UPDATE master_user
        SET username=?, password=?, nama=?, id_jabatan=?, status=?
        WHERE id=?
        `

        return new Promise((resolve,reject)=>{

            db.query(sql,[
                data.username,
                data.password,
                data.nama,
                data.id_jabatan,
                data.status,
                id
            ],function(err,result){

                if(err) reject(err)
                else resolve(result)

            })

        })

    },


    // =============================
    // DELETE USER
    // =============================
    delete_user: function(id){

        let sql = "DELETE FROM master_user WHERE id=?"

        return new Promise((resolve,reject)=>{

            db.query(sql,[id],function(err,result){

                if(err) reject(err)
                else resolve(result)

            })

        })

    }

}
