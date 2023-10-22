const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // configureWebpack:{
  //   module : {
  //     rules : [
  //       {
  //         test: /\.(png|jpg|svg)$/i,
  //         use : [
  //           {
  //             loader : "url-loader",
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // }

})
