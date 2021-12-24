const {
  File,
  log,
  Response,
  events: { http },
} = Tera;

let path = http.request.uri.query.get("path") || "index.html";
const app = http.request.uri.path.get_param("apps");
if (app == null) {
  throw Error("Must specify app query");
}

log.info(">>> path =", path);
log.info(">>> app =", app);

const appPath = `apps/${app}/dist/${path}`;

log.info(">>> appPath =", appPath);

const file = await File.open(appPath, { read: true });

await http.respondWith(new Response(file));
