const m_user = require('../model/m_user')
const m_jabatan = require('../model/m_jabatan')

module.exports = {

index: async function(req, res){

    res.render('master-user/main', {
        req: req,
        data_user: await m_user.get_semua_user()
    })

},

form_tambah: async function(req,res){

    let data_jabatan = await m_jabatan.get_semua_jabatan()

    res.render('master-user/form-tambah', {
        req: req,
        data_jabatan: data_jabatan
    })

},

insert: async function(req,res){

    let data = {
        username : req.body.form_username,
        password : req.body.form_password,
        nama : req.body.form_nama,
        id_jabatan : req.body.form_role,
        status : req.body.form_status
    }

    await m_user.insert_user(data)

    res.redirect('/user')

},
form_edit: async function(req,res){

    let id = req.params.id

    let data_user = await m_user.get_1_user(id)
    let data_jabatan = await m_jabatan.get_semua_jabatan()

    res.render('master-user/form-edit',{
        req:req,
        data_user:data_user[0],
        data_jabatan:data_jabatan
    })

},


update: async function(req,res){

    let id = req.params.id

    let data = {
        username : req.body.form_username,
        password : req.body.form_password,
        nama : req.body.form_nama,
        id_jabatan : req.body.form_role,
        status : req.body.form_status
    }

    await m_user.update_user(id,data)

    res.redirect('/user')

},


delete: async function(req,res){

    let id = req.params.id

    await m_user.delete_user(id)

    res.redirect('/user')

}


}