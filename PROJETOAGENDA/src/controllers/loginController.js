const Login = require('../models/loginModel');


exports.index = (req,res) => {
    if(req.session.user) return res.render('login-logado');
    return res.render('login'); //controlador está chamando a função de renderizar (modelar) a página de login
};

exports.register = async function(req,res){//controlador está exportando a função de registrar um usuario no sistema
    

    try {
        const login = new Login(req.body); //criando uma instância da classe importada e mandando e requisição do post
        await login.register();

        if(login.errors.length > 0 ){//exibir mensagens de erro

            req.flash('errors', login.errors);//exibir msg de erro
            req.session.save( ()=>{//salvar a sessao e voltar para pagina de login
                return res.redirect('back');
            });
            return;

            
    
        }

        req.flash('success', 'usuario cadastrado com sucesso');//exibir msg de erro
            req.session.save( ()=>{//salvar a sessao e voltar para pagina de login
                return res.redirect('back');
            });
    } catch (error) {
        console.log(error);
        res.render('404');
        
    }

    

    
};

exports.login = async function(req,res){//controlador está exportando a função de registrar um usuario no sistema
    

    try {
        const login = new Login(req.body); //criando uma instância da classe importada e mandando e requisição do post
        await login.login();

        if(login.errors.length > 0 ){//exibir mensagens de erro

            req.flash('errors', login.errors);//exibir msg de erro
            req.session.save( ()=>{//salvar a sessao e voltar para pagina de login
                return res.redirect('back');
            });
            return;

            
    
        }

        req.flash('success', 'usuario entrou com sucesso');//exibir msg de erro
          req.session.user = login.user;
          req.session.save( function() {
            return res.redirect('back');
          })
    } catch (error) {
        console.log(error);
        res.render('404');
        
    }

    
};

exports.logout = function(req,res){
    req.session.destroy();
    res.redirect('/'); //mandar o usuario para a home da pagina depois do logout
}
