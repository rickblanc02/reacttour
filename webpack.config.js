var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
        port: 9000,
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000',
            apiUrlTime: 'https://app-tours.herokuapp.com/api/v1/',
            //apiUrlTime: 'http://localhost:8080/api/v1/',            
            apiUrlTuten: 'https://dev.tuten.cl/TutenREST/rest/user/',
        })
    }
}