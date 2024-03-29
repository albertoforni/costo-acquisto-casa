/**
 * @type {import('snowpack').SnowpackConfig}
 */
const config = {
  mount: {
    public: "/",
    src: "/assets",
  },
  packageOptions: {
    installTypes: true,
    NODE_ENV: true,
  },
  devOptions: {
    out: "dist",
    open: "none",
    bundle: true,
  },
  buildOptions: {
    clean: true,
    out: "dist",
  },
  plugins: [
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-babel",
    "@snowpack/plugin-postcss",
    "@snowpack/plugin-dotenv",
  ],
  optimize: {
    bundle: true,
    minify: true,
    target: "es2020",
    treeshake: true,
    splitting: true,
  },
  alias: {
    "@app": "./src",
  },
};

module.exports = config;
