import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const root = resolve("dist");
const port = Number(process.env.PORT || 8082);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  const normalizedPath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const candidate = resolve(root, normalizedPath);
  const safePath = candidate.startsWith(root) ? candidate : root;
  const filePath = existsSync(safePath) && statSync(safePath).isFile() ? safePath : join(root, "index.html");
  const type = contentTypes[extname(filePath)] ?? "application/octet-stream";

  response.writeHead(200, { "Content-Type": type });
  createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static preview available at http://127.0.0.1:${port}`);
});
