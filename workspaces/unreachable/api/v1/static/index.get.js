const {
  File,
  log,
  Response,
  events: { http },
} = Tera;

let path = http.request.uri.query.get("path") || "<query not specified>";

log.info(">>> query path =", path);

log.info(">>> request = ", http.request);

const file = await File.open(path, { read: true }, {
  headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
});

await http.respondWith(new Response(file));
