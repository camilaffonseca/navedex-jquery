const devMode = process.env.NODE_ENV === 'development'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const cleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
  entry: {
    indexEntry: './src/index.js',
    texteEntry: './src/texte.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/')
    }
  },
  plugins: [
    // new cleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html', // acertar diretório dps
      templateParameters: {
        title: 'INDEXIX' // O título :)
      },
      chunks: ['indexEntry'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/texte.html', // acertar diretório dps
      templateParameters: {
        title: 'TEEEXTE' // O título :)
      },
      chunks: ['texteEntry'],
      filename: 'texte/index.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true
  }
}

module.exports = config
