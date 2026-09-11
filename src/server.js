import { createServer } from "node:http";

export function createApp() {
  return createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("Hello world");
      return;
    }
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ status: "ok" }));
      return;
    }
    if (req.method === "GET" && req.url === "/version") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ version: "0.1.0" }));
      return;
    }
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not found");
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.env.PORT ?? 3000;
  createApp().listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

// Vercel serverless entrypoint (imported, not executed directly).
export default createApp();
