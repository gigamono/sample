const { request, respondWith } = httpEvent;

// Read body.
const buf = await request.body.readAll();

// Log body.
log.info("request body decoded =", decode(buf));

// Send random response.
if (Math.random() < 0.5) {
  await sendFixedResponse();
} else {
  await sendStreamingResponse();
}

// Sending response body with fixed content length.
async function sendFixedResponse() {
  await respondWith(
    new Response('{ "message": "Hello beep boop!" }', {
      headers: { "Content-Type": "application/json" },
    })
  );
}

// Streaming response body with transfer-encoding chunked in Http/1.1 or streaming in H2
async function sendStreamingResponse() {
  async function* iterator() {
    for (let i = 0; i < 20; i++) {
      yield encode(`index = ${i}\n`);
    }
  }

  await respondWith(new Response(iterator()));
}
