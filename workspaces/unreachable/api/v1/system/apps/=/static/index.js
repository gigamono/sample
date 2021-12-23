const {
  File,
  log,
  Response,
  events: { http },
} = Tera;

let path = http.request.uri.query.get("path") || "index.html";

log.info(">>> path =", path);

const app = http.request.uri.query.get("app");
if (app == null) {
  throw Error("Must specify app query");
}

log.info(">>> app =", app);

const fullPath = `apps/${app}/dist/${path}`;

log.info(">>> fullPath =", fullPath);

const file = await File.open(fullPath, { read: true });

await http.respondWith(new Response(file));
