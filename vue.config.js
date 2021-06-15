module.exports = {
  transpileDependencies: [
    'vuetify'
  ], 
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Geo Cities";
      return args;
    });
  },  
  publicPath: process.env.NODE_ENV === "production" ? "/geo-cities/" : "/"

}
