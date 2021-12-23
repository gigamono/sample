const {
  log,
  Response,
  events: { http },
} = Tera;

if (http.request.method !== "GET") {
  throw Error("expected a GET method");
}

let installed = http.request.uri.query.get("installed");
let apps_param = http.request.uri.path.get_param("apps");

log.info(">>> apps_param =", apps_param);

// TODO(appcypher): Get from database.
const all_apps = [
  { name: "frontend", version: "0.1", installed: true },
  { name: "backend", version: "0.1", installed: true },
  { name: "deck", version: "0.1", installed: false },
  { name: "database", version: "0.1", installed: false },
];

let result = all_apps;
if (installed === null || installed) {
  result = all_apps.filter((item) => item.installed);
}

let response = new Response(JSON.stringify({ data: result }));

await http.respondWith(response);
