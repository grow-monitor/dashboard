module.exports = {
  extends: ["stylelint-config-recommended"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer",
        ],
      },
    ],
    "color-hex-case": "lower",
    "color-no-invalid-hex": true,
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  },
};
