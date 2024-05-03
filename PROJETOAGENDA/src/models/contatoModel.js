const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenomenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
 criadoEm: {type: Date, default: Date.now}
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

//criar o modelo com constructor function

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}
//Métodos estáticos, nao precisa instanciar
Contato.buscaPorId = async function(id){//procurar o contato pelo id pra exibir na padina de edit
  
  if(typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato;
}
Contato.buscaContatos = async function(){//procurar os contato registrados

  const contatos = await ContatoModel.find()
     .sort({criadoEm: -1});//listar os contatos criados em ordem de criação DECRESCENTE

  return contatos;
}

Contato.delete = async function(id){
  if(typeof id !== 'string') return;

  const contato = await ContatoModel.findOneAndDelete({_id: id});
  return contato;
};

Contato.prototype.register = async function(){
  this.valida();
  if(this.errors.length > 0) return;

  //se nao tiver erros no cadastro do contato, criar modelo na base de dados
  this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.valida= function(){
  this.cleanUp();
  //o email precisa ser valido, mas não obrigatório
  if(this.body.email && !validator.isEmail(this.body.email)){
      this.errors.push('Email inválido!');
  }
  //o nome é obrigatório
  if(!this.body.nome){
    this.errors.push('O nome é obrigatório');
  }
  //pelo menos precisa cadastrar contato ou email
  if(!this.body.email && !this.body.telefone){
    this.errors.push('Pelo menos 1 informação deve ser cadastrada, email ou telefone.')
  }

}
Contato.prototype.cleanUp = function(){
  for(let key in this.body){
      if( typeof this.body[key] !== 'string'){
          this.body[key] = '';
      }
  }

  this.body ={
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      telefone: this.body.telefone,
      email: this.body.email,
      
  }
}

//receber um id de contato para editar
Contato.prototype.edit = async function(id){
  if(typeof id !== 'string') return;

  //se o contato for valido, validar seus campos
  this.valida();
  if(this.errors.length > 0) return;

  //se passar daqui entao os campos sao validos, 
  //podemos editar o contato
ContatoModel.findByIdAndUpdate(id, this.body, {new: true});

};

module.exports = Contato;
