import path from 'path';

export default {
    mode: 'development',
    entry: './app/client/index.jsx',
    output: {
        path: path.resolve('./app/client/dist'),
        filename: 'main.js',
    },
    target: 'web',
    devServer: {
        port: '3300',
        static: path.resolve('./app/client/public'),
        hot: true,
        liveReload: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
};
