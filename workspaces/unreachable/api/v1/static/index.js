const { http } = events;

let path = http.request.uri.query.get("file") || "<query not specified>";

log.info(">>> query file =", path);

log.info(">>> request = ", http.request);

const file = await File.open(path, { read: true });

await http.respondWith(new Response(file));
