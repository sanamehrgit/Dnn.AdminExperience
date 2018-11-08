module.exports = (distRoot, optimize) => ({
  mode: 'production',
  optimization: {
    minimize: !!optimize,
  },
  entry: './src/index.js',
  output: {
    path: distRoot,
    filename: optimize ? 'dnn-react-common.min.js' : 'dnn-react-common.js',
    library: 'DnnReactCommon',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
        { test: /\.(js|jsx)$/, enforce: "pre", exclude: /node_modules/, loader: "eslint-loader" },
        { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ["babel-loader?presets[]=react"] },
        { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
        { test: /\.(ttf|woff)$/, loader: "url-loader?limit=8192" },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.(gif|png)$/, loader: "url-loader?mimetype=image/png" },
        { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" }
    ]
},
target: 'node', // in order to ignore built-in modules like path, fs, etc.
externals: ["react", nodeExternals()], // in order to ignore all modules in node_modules folder
resolve: {
    extensions: [".js", ".json", ".jsx"],
    modules: [
        'node_modules',
        path.resolve(__dirname, 'src')
    ]
},
plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
        VERSION: JSON.stringify(packageJson.version),
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    })
    ] 
});