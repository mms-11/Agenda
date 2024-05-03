exports.middlewareGlobal = (req, res, next) => {
  res.locals.success = req.flash('success');//capturando erros globais  
  res.locals.errors = req.flash('errors');//capturando erros globais
  res.locals.user = req.session;
  
  
    next();
  };
  
  exports.outroMiddleware = (req, res, next) => {
    next();
  };
  
  exports.checkCsrfError = (err, req, res, next) => {
    if(err ) {
      return res.render('404');
    }
    next();
  };
  
  exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  };

  exports.loginRequired = (req,res,next) =>{
    if(! req.session.user){//se o usuario nao estiver logado, mandar msg de erro
      req.flash('errors', 'Você precisa fazer o login para cadastrar um contato');
      req.session.save(()=>{//salvar A sessao
        res.redirect('/');//redirecionar
      })
      return;
    }
    //se passar do if o contato está logado
    next();
  };
  