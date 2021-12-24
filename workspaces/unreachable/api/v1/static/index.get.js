const {
  File,
  log,
  Response,
  events: { http },
} = Tera;

let path = http.request.uri.query.get("path") || "<query not specified>";

log.info(">>> query path =", path);

log.info(">>> request = ", http.request);

const file = await File.open(path, { read: true });

await http.respondWith(new Response(file));
