// const path = require('path');
//
// module.exports = {
//     entry: './src/index.js', // Entry file of your application
//     output: {
//         path: path.resolve(__dirname, 'dist'), // Output directory
//         filename: 'bundle.js' // Output bundle file name
//     },
//     module: {
//         rules: [
//             // Add any necessary rules for transpiling or processing your code
//             // For example, if you're using Babel for JavaScript transpilation:
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env']
//                     }
//                 }
//             }
//         ]
//     },
//     resolve: {
//         fallback: {
//             "url": require.resolve("url/")
//         }
//     }
// };