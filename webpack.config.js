const webpack = require('webpack');
const path    = require('path');

module.exports = {
    // Se encarga de resolver varias cosas, por ejemplo esta
    // resolviendo la extensiones de los archivos de entrada
    resolve: {
        extensions : ['.js', '.jsx', '.json', '.css']
    },
    cache: true,
    entry: [     // Son todos aquellos archivos que seran procesados
        // activa el hot reloading model
        'react-hot-loader/patch',
        './views/main.js',
        'webpack-dev-server/client?http://localhost:3000', // el puerto donde se va a mandar el archivo de arriba
        'webpack/hot/only-dev-server',       // Que solo mi servidor wevpack ejecute el hot reloding
    ],
    output: {    // Es la ruta donde saldra el archivo procesado
        path       : path.resolve(__dirname, 'public'),
        filename   : 'build.js',
        publicPath : '/'  // cuan sera la capeta publica 
    },
    module: {
        rules: [
            {
                test    : /\.(js|jsx)$/,
                exclude : '/node_modules/',
                use     : 'babel-loader'
            },
            {
                test    : /\.json$/,
                use     : 'json-loader'
            },
            {
                test    : /\.css$/,
                use     : [
                    'style-loader',
                    {
                        loader  : 'css-loader',
                        options : { modules : true }
                            
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        hot         : true,      // hot reloader
        contentBase : path.resolve(__dirname, 'public'), // Donde va estar la base del public final
        inline      : true,  // En cache va a guardar la aplicacion, solamente hace los cambios que uno haya echo
        compress    : false,  // Compresion de recurson activada
        port        : 3001,
        publicPath  : '/',
        proxy : { target:'http://localhost:3000'}        
    },
}