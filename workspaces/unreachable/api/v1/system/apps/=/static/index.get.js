const {
  File,
  log,
  Response,
  events: { http },
} = Tera;

let path = http.request.uri.query.get("path") || "index.html";
const app = http.request.uri.path.get("apps");
if (app == null) {
  throw Error("Must specify app query");
}

const appPath = `/apps/${app}/dist/${path}`;

const file = await File.open(appPath, { read: true });

let response = new Response(file, {
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});

await http.respondWith(response);
