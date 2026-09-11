import assert from "node:assert/strict";
import { test } from "node:test";
import { createApp } from "../src/server.js";

test("GET / returns Hello world", async () => {
  const server = createApp();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  try {
    const res = await fetch(`http://localhost:${port}/`);
    assert.equal(res.status, 200);
    assert.equal(await res.text(), "Hello world");
  } finally {
    server.close();
  }
});

test("unknown route returns 404", async () => {
  const server = createApp();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  try {
    const res = await fetch(`http://localhost:${port}/nope`);
    assert.equal(res.status, 404);
  } finally {
    server.close();
  }
});

test("GET /health returns ok JSON", async () => {
  const server = createApp();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  try {
    const res = await fetch(`http://localhost:${port}/health`);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("content-type"), "application/json");
    assert.deepEqual(await res.json(), { status: "ok" });
  } finally {
    server.close();
  }
});
