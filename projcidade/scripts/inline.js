const fs = require('fs');
const path = require('path');

const projcidadeDir = path.join(__dirname, '..');
const outDir = path.join(projcidadeDir, 'out');
const htmlPath = path.join(outDir, 'index.html');

if (!fs.existsSync(htmlPath)) {
  console.error("index.html not found in out/ directory. Run 'npm run build' first.");
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Inline CSS files
const cssRegex = /<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*\/?>/g;
html = html.replace(cssRegex, (match, href) => {
  if (href.startsWith('/_next/')) {
    const cleanPath = href.replace(/^\//, '');
    const absolutePath = path.join(outDir, cleanPath);
    if (fs.existsSync(absolutePath)) {
      console.log(`Inlining CSS: ${href}`);
      const cssContent = fs.readFileSync(absolutePath, 'utf8');
      return `<style>${cssContent}</style>`;
    }
  }
  return match;
});

// Remove preload script tags to avoid network requests
const preloadRegex = /<link[^>]+as="script"[^>]+href="([^"]+)"[^>]*\/?>/g;
html = html.replace(preloadRegex, '');

// 2. Inline JavaScript files
const scriptRegex = /<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g;
html = html.replace(scriptRegex, (match, src) => {
  if (src.startsWith('/_next/')) {
    const cleanPath = src.replace(/^\//, '');
    const absolutePath = path.join(outDir, cleanPath);
    if (fs.existsSync(absolutePath)) {
      console.log(`Inlining JS: ${src}`);
      const jsContent = fs.readFileSync(absolutePath, 'utf8');
      const safeJsContent = jsContent.replace(/<\/script>/gi, '<\\/script>');
      return `<script>${safeJsContent}</script>`;
    }
  }
  return match;
});

// Replace other absolute paths if they exist
html = html.replace(/"\/icon_infopharma.png"/g, '"./icon_infopharma.png"');
html = html.replace(/"\/favicon.ico"/g, '"./favicon.ico"');

// Write the self-contained HTML file to the root of the project
const outputHtmlPath = path.join(projcidadeDir, 'index.html');
fs.writeFileSync(outputHtmlPath, html, 'utf8');
console.log(`Successfully generated single standalone HTML file at: ${outputHtmlPath}`);
