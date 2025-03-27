import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
  build: {
    outDir: "./_site/assets/css/",
    assetsDir: "./src/assets/",
    rollupOptions: {
      input: ["./src/_scripts/_main.js", "./src/assets/css/_main.css"],
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
};
