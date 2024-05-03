const mongoose = require('mongoose');//tratamento de dados
const validator = require('validator');//pacote para validar email
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {//pegar os dados do controler para o model

    constructor(body){

        this.body = body;
        this.errors = [];//string para checar se tem erro no login
        this.user = null;
    }

    async login(){
        this.valida();
        if(this.errors.length > 0){

            req.flash('errors', login.errors);
            req.session.save( function(){
                return resizeBy.redirect('back');
            })

            return;

        } 

        
        this.user = await LoginModel.findOne({email: this.body.email});

        if(!this.user){
            this.errors.push('usuario nao existe');
            return;
        }
        //validar a senha

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('senha invalida');
            this.user= null;
            return;
        }
        
    }

    //agora os métodos da classe
    async register(){//retorna uma promise, por isso sincronizar o seu uso
        this.valida();
        if(this.errors.length > 0){ //se o usuario tiver erro no registro
            return;
        }

        //metodo para checar se ja existe ususario igual na base de dados
          await this.userExists();

          if(this.errors.length > 0){ //se o usuario ja existe no registro
            return;
        }


        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt); //fazer o hash (decodificar) a senha real pela senha criptografada
        

        

          

// se nao tiver erro, criar o modelo de base de dados com o email e senha

           this.user= await LoginModel.create(this.body);
    
            
    }  
     

    async userExists(){

       const user = await LoginModel.findOne({email: this.body.email});
       if(user){
        this.errors.push('usuário já existe');

       }
    }

    valida() {
        this.cleanUp();
        //o email precisa ser valido

        if(!validator.isEmail(this.body.email)){
            this.errors.push('Email inválido!');
        }
        //a senha precisa ter entre 3 e 50 caracteres
        if(this.body.password.length <3 || this.body.password.length >=50){
            this.errors.push('Senha inválida');
        }
    }
    cleanUp(){
        for(let key in this.body){
            if( typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body ={
            email: this.body.email,
            password: this.body.password
        }
    }


}

module.exports = Login;
