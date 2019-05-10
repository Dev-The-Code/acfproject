const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");

// Don't open the browser during development
process.env.BROWSER = "none";

module.exports = {
  webpack: {
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.NODE_ENV === "development"
        ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
        : [])
    ]
  },
  plugins: [
    { plugin: require("craco-preact") },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
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
      }
    }
  ]
};