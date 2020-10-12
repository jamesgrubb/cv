module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["_site/**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    container: (theme) => ({
      center: true,
      padding: theme("spacing.4")
    }),
    extend: {

    },
  },
  variants: {},
  plugins: [],
};
