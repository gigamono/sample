const {
  File,
  log,
  Response,
  events: { http },
} = Tera;

let path = http.request.uri.query.get("file");
if (path == null) {
  throw Error('Must specify file as query');
}

log.info(">>> query file =", path);

const file = await File.open(path, { read: true });

await http.respondWith(new Response(file));
