const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true }],
    config
  ); // change importing css to less
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#C40009",
   
      "@text-color": "fade(#000, 80%)",
      "@layout-body-background": "#f0f2f5",
      "@layout-header-background": "#FFF", //"#001529",
      "@layout-footer-background": "@layout-body-background",
      "@layout-header-height": "64px",
      "@layout-header-padding": "0 50px",
      "@layout-footer-padding": "24px 50px",
      "@layout-sider-background": "#C40009",
      "@layout-trigger-height": "48px",
      "@layout-trigger-background": "#002140",
      "@layout-trigger-color": "#fff",
      "@layout-zero-trigger-width": "36px",
      "@layout-zero-trigger-height": "42px",
      // Layout light theme
      "@layout-sider-background-light": "#fff",
      "@layout-trigger-background-light": "#fff",
      "@layout-trigger-color-light": "@text-color"
    }
  })(config, env);


  return config;
};
