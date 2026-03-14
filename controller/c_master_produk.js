const { body, validationResult } = require('express-validator')
const m_produk = require('../model/m_produk')
const moment = require('moment')
const path = require('path')

let validasi_insertProduk = [
    body('form_kode_barang')
        .notEmpty().withMessage('Kode Barang tidak boleh kosong')
        .isAlphanumeric().withMessage('Kode Barang hanya menerima Huruf & Angka')
        .isLength({ min: 5, max: 10 }).withMessage('Kode Barang maksimal 10 karakter')
]

module.exports = {

    // =========================
    // LIST PRODUK
    // =========================
    index: async function (req, res) {

        res.render('master-produk/main', {
            req: req,
            data_produk: await m_produk.get_semua_produk()
        })

    },


    // =========================
    // FORM TAMBAH
    // =========================
    form_tambah: async function (req, res) {

        res.render('master-produk/form-tambah', {
            req: req
        })

    },


    validasi_insertProduk,


    // =========================
    // INSERT PRODUK
    // =========================
    insert: async function (req, res) {

        let validasi = validationResult(req)

        if (validasi.errors.length > 0) {
            return res.render('master-produk/form-tambah', {
                req: req,
                pesan_validasi_error: validasi.array(),
            })
        }

        try {

            let foto = req.files?.form_upload_foto
            let filename = ''

            if (foto) {

                let kode_barang = req.body.form_kode_barang
                let datetime = moment().format('YYMMDD_HHmmss')
                let extension_name = path.extname(foto.name)

                filename = kode_barang + '-' + datetime + extension_name

                let folder_simpan = path.join(__dirname, '../public/upload-image', filename)

                await foto.mv(folder_simpan)

            }

            let proses_insert = await m_produk.insert_1_produk(req, filename)

            if (proses_insert.affectedRows > 0) {

                res.redirect('/produk?success_msg=berhasil input produk baru a/n ' + req.body.form_nama_barang)

            }

        } catch (error) {

            console.log(error)

            let objek_error = ''

            if (error.sqlMessage) {
                objek_error = error.errno + ': ' + error.sqlMessage
            } else {
                objek_error = JSON.stringify(error)
            }

            res.redirect('/produk/create?error_msg=' + objek_error)

        }

    },


    // =========================
    // DETAIL PRODUK
    // =========================
    detail: async function (req, res) {

        let id = req.params.id

        let data = await m_produk.get_produk_by_id(id)

        res.render('master-produk/detail', {
            req: req,
            data_produk: data
        })

    },


    // =========================
    // FORM EDIT
    // =========================
    form_edit: async function (req, res) {

        let id = req.params.id

        let data = await m_produk.get_produk_by_id(id)

        res.render('master-produk/form-edit', {
            req: req,
            data_produk: data
        })

    },


    // =========================
    // UPDATE PRODUK
    // =========================
    update: async function (req, res) {

        try {

            let id = req.params.id
            let filename = null

            if (req.files) {

                let foto = req.files.form_upload_foto

                if (foto) {

                    let kode_barang = req.body.form_kode_barang
                    let datetime = moment().format('YYMMDD_HHmmss')
                    let extension_name = path.extname(foto.name)

                    filename = kode_barang + '-' + datetime + extension_name

                    let folder_simpan = path.join(__dirname, '../public/upload-image', filename)

                    await foto.mv(folder_simpan)

                }

            }

            await m_produk.update_produk(req, id, filename)

            res.redirect('/produk?success_msg=produk berhasil diupdate')

        } catch (error) {

            console.log(error)

            res.redirect('/produk?error_msg=gagal update produk')

        }

    },


    // =========================
    // DELETE PRODUK
    // =========================
    delete: async function (req, res) {

        try {

            let id = req.params.id

            await m_produk.delete_produk(id)

            res.redirect('/produk?success_msg=produk berhasil dihapus')

        } catch (error) {

            console.log(error)

            res.redirect('/produk?error_msg=gagal hapus produk')

        }

    }

}
