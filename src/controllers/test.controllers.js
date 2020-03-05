const path = require('path')
const Imagem = require('../models/Imagem')
testCtrl = {}

testCtrl.home = async (req, res) => {
    let imagens = await Imagem.find()
    res.render('test/images', {imagens})
}

testCtrl.upload = (req, res) => {
    res.render('test/upload')
}

testCtrl.getUpload = async (req, res) => {
    let nome = req.body.nome
    let imagem = null
    let ext = ''
    
    if(req.files !== null){
        imagem = req.files.imagem
        ext = path.extname(imagem.name).toLowerCase()
    } 
    
    let errors = []
    
    if(nome === ''){
        errors.push({text: 'O campo nome não pode estar vazio'})
    }

    if(imagem === null){
        errors.push({text: 'Uma imagem é necessaria'})
    } else{
        if(ext !== '.jpg' && ext !== '.png' && ext !== '.gif'){
            errors.push({text: 'O arquivo deve ser uma imagem(png, jpg, gif)'})
        }
        if(imagem.size > 5000000){
            errors.push({text: 'Arquivo muito pesado'})
        }
    }

    if(errors.length > 0){
        res.render('test/upload', {errors})
    } else{
        imagem.mv(path.resolve(__dirname, '../public/uploads/' + imagem.name), function(err){
            if(err){
                errors.push({text: 'Erro ao enviar imagem, tente novamente.'})
            }
        })
        
        const img = new Imagem({
            nome,
            imagemURL: '/uploads/' + imagem.name
        })
    
        await img.save()
        req.flash('success_msg', 'Imagem adicionada com sucesso!')
        res.redirect('/')
    }   
}

testCtrl.getEdit = (req, res) => {
    Imagem.findOne({_id: req.params.id}).then((img) => {
        let imagem = []
        imagem.push(img)
        res.render('test/edit', {imagem})
    }).catch((err) => {
        req.flash('error_msg', 'Imagem não encontrada')
        res.redirect('/')
    })
}

testCtrl.postEdit = async (req, res) => {
    let nome = req.body.nome
    let id = req.body.id
    let imagem = null
    let ext = ''
    
    if(req.files !== null){
        imagem = req.files.imagem
        ext = path.extname(imagem.name).toLowerCase()
    } 
    
    let errors = []
    
    if(nome === ''){
        errors.push({text: 'O campo nome não pode estar vazio'})
    }

    if(imagem !== null){    
        if(ext !== '.jpg' && ext !== '.png' && ext !== '.gif'){
            errors.push({text: 'O arquivo deve ser uma imagem(png, jpg, gif)'})
        }
        if(imagem.size > 5000000){
            errors.push({text: 'Arquivo muito pesado'})
        }
    }

    if(errors.length > 0){
        req.flash('error_msg', 'Erro ao editar imagem!')
        res.redirect('/edit/' + id)
    } else{
        const img = await Imagem.findOne({_id: id})

        if(imagem !== null){
            imagem.mv(path.resolve(__dirname, '../public/uploads/' + imagem.name), function(err){
                if(err){
                    errors.push({text: 'Erro ao enviar imagem, tente novamente.'})
                }
            })
            img.imagemURL = '/uploads/' + imagem.name
        }
        
        img.nome = nome
          
        await img.save()
        req.flash('success_msg', 'Imagem editada com sucesso')
        res.redirect('/')
    }   
}

testCtrl.getDelete = (req, res) => {
    Imagem.findOne({_id: req.params.id}).then( async (imagem) => {
        await Imagem.findByIdAndDelete(req.params.id)
        req.flash('success_msg', 'Imagem deletada com sucesso')
        res.redirect('/')
    }).catch(err => {
        req.flash('error_msg', 'Imagem não encontrada')
        res.redirect('/')
    })
}

module.exports = testCtrl