const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "https://cute-pink-squid-tutu.cyclic.app",
      changeOrigin: true,
    })
  );
};
