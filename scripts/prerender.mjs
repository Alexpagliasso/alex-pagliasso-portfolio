import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile } from "node:fs/promises";

// Ship real HTML so content and anchor navigation survive disabled/failed JS.
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const manifest = JSON.parse(
    await readFile("dist/.vite/manifest.json", "utf8"),
  );
  let markup = renderToString(createElement(App));
  for (const [source, asset] of Object.entries(manifest)) {
    if (source.startsWith("src/assets/"))
      markup = markup.replaceAll(`/${source}`, `/${asset.file}`);
  }
  const index = await readFile("dist/index.html", "utf8");
  await writeFile(
    "dist/index.html",
    index.replace(
      '<div id="root"></div>',
      () => `<div id="root">${markup}</div>`,
    ),
  );
} finally {
  await server.close();
}
