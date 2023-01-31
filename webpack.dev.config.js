const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        // 这个是 js的输出路径
        filename: "debug/thing.sign.config.js",
    },
    module: {
        rules: [{
            test: /\.vue$/,  // 解析css文件
            use: [
                "vue-loader"
            ]
        },{
            test: /\.css$/,  // 解析css文件
            use: [
                "style-loader",
                "css-loader"
            ]
        },
        {
            test: /\.less$/,  // 解析less文件, 文件解析顺序, 从下到上, 从右到左
            use: [
                "style-loader",
                "css-loader",
                "less-loader"
                // {
                //     loader:'less-loader',
                //     options: {
                //         javascriptEnabled: true
                //     }
                // }
                
            ],
            
           
        },
        {
            test: /\.js$/,
            exclude: /(node_modules)/,  // 这个是排除文件 不进行编译解析 节省时间
            use: {
                loader: 'babel-loader'
            }
        }
        ]},
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, "src")
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html', //指定html模板文件
            inject: 'head', //js插入的位置，插入head中也会自动补defer="defer"属性以保证在页面加载后执行js，如果考虑兼容性可改成body
            // scriptLoading: 'blocking'
        })
    ],
    mode: "development",
    // devServer: {
    //     static: {
    //         publicPath: 'mian.js',
    //     },
    //     compress: true,
    //     port: 8088,
    //     open:true
    // }
};