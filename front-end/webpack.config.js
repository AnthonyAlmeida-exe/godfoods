module.exports = {
  module: {
    rules: [
      {
        test: /\.png/,
        type: "asset/resource",
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
};
