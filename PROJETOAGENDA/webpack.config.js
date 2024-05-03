const path = require('path'); //commonJS padrao do node

//cada arquivo no node é como se fosse um módulo no node, 
//é preciso exportar para ser utilizado fora desse arquivo

module.exports = {
    mode: 'development',
    entry: './frontend/index.js', //arquivo de entrada
    output: {

        path: path.resolve(__dirname, 'public', 'assets', 'js'),//variavel do diretorio atual, pasta do webpack

        filename: 'bundle.js',//arquivo que tem todos os arquivos da aplicacao
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map', //mapeia onde exatamente ocorre erro

};
