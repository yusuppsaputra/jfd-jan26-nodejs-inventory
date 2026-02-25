const bcrypt = require('bcryptjs')
const m_user = require('../model/m_user')

module.exports =
{

    form_login: function(req,res) {
        res.render('auth/form-login', {
            req: req,
        }) //ejs
    },



    proses_login: async function(req,res) {
        // ambil inputan username & password dari html
        let form_username = req.body.form_username
        let form_password = req.body.form_password

        // cek ke db, table user, cari username
        let username_exist = await m_user.get_1_username(form_username)
        if (username_exist.length > 0) {
            // jika dapat usernamenya, maka lakukan pengecekan password
            let password_db = username_exist[0].password
            // res.send(password_db +'<br>'+ form_password)

            let password_cocok = bcrypt.compareSync(form_password, password_db)
            // jika password cocok, maka redirect ke halaman dashboard
            if (password_cocok) {
                req.session.user = username_exist
                res.redirect('/dashboard')
            } else {
                // jika password salah, kita berikan info error + kembalikan ke halaman login
                res.redirect(`/login?msg=password salah`)
            }
        } else {
            // jika tidak ada username-nya, kita berikan info error + kembalikan ke halaman login
            res.redirect(`/login?msg=username tidak terdaftar, silakan hubungi administrator sistem.`)
        }
    },



    cek_login: function(req,res,next) {
        if (req.session.user) {
            next()
        } else {
            res.redirect('/login?msg=Anda Belum Login!')
        }
    }

}