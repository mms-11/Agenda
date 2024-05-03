const Contato = require('../models/contatoModel')
exports.index = (req,res) =>{

    res.render('contato', {contato:{}});
};

exports.register = async(req,res) =>{//receber os dados, salvar na base de dados e redirecionar para outra página


try {
    const contato = new Contato(req.body);
await contato.register();

if(contato.errors.length > 0){
    req.flash('errors', contato.errors);
    req.session.save(()=>{
        res.redirect('back');
        return;
    })
}

//se nao tiver erro no cadastro
req.flash('success', 'contato registrado com sucesso');
req.session.save(()=> res.redirect(`/contato/index/${contato.contato._id}`));
return;

} catch (error) {
    console.log(error);
    return res.render('404');
}

}

exports.editIndex = async function(req,res){
    if(!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);

    if(!contato) return res.render('404');
    
    
    res.render('contato', {contato});
}

exports.edit = async function (req,res){

    try {
        if(!req.params.id) return res.render('404');

        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(()=>{
                res.redirect('back');
                return;
            })
        }
        
        //se nao tiver erro no cadastro
        req.flash('success', 'contato editado com sucesso');

        req.session.save(() => {
            if (contato.contato && contato.contato._id) {
                res.redirect(`/contato/index/${contato.contato._id}`);
            } else {
                // Handle the case where contato.contato or contato.contato._id is null or undefined
                res.redirect('/contato/index'); // Redirect to a default route
            }
        });
        return;
    } catch (error) {
        console.log(error);
        res.render('404');
    }
 
    

}

exports.delete = async function(req,res){
    if(!req.params.id) return res.render('404');

    const contato = await Contato.delete(req.params.id);
    if(!contato) return res.render('404');

    req.flash('success', 'contato deletado com sucesso');
    req.session.save(()=> res.redirect('back'));
    return;
    
    
    
}