const express = require('express')
const router = express.Router()
const {upload, getUpload, home, getEdit, postEdit, getDelete } = require('../controllers/test.controllers')

router.get('/', home)

router.get('/upload', upload)

router.post('/upload', getUpload)

router.get('/edit/:id', getEdit)

router.post('/edit', postEdit)

router.get('/delete/:id', getDelete)

module.exports = router
