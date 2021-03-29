const sitemap = require('nextjs-sitemap-generator');
const path = require('path');

sitemap({
  baseUrl: 'biblia-a-mensagem.vercel.app',
  pagesDirectory: path.resolve(__dirname, '../../.next/server/pages/'),
  targetDirectory: path.resolve(__dirname, '../../public/'),
  ignoredExtensions: ["js", "map", "json", "xml", "png", "css", "jpeg", "jpg", "icon", "svg"],
  ignoredPaths: [
    "404",
    "favicon",
    "index",
  ],
  extraPaths: [
    "/"
  ]
});