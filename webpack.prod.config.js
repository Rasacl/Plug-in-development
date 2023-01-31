
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
  mode:'production',
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    filename: 'thing.sign.config.js',
    path: path.join(__dirname, 'dist'),
    library: 'thing.sign.config',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader","css-loader","less-loader"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,  // 这个是排除文件 不进行编译解析 节省时间
        use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
        }
      },
      //  添加字体文件的处理规则
       {
        test: /\.(ttf|eot|svg|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]'
        }
      },

    ]
},
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: "thing.sign.config.css"
    // }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: 'index.html', //指定html模板文件
        inject: 'head',
        // scriptLoading:'blocking'
    })
  ],
};
