const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "https://pizza-khao.cyclic.app",
      changeOrigin: true,
    })
  );
};
