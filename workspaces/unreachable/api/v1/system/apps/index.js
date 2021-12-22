const {
  log,
  Response,
  events: { http },
} = Tera;

if (http.request.method !== "GET") {
  throw Error("expected a GET method");
}

let installed = http.request.uri.query.get("installed");

log.info(">>> installed =", installed);

// TODO(appcypher): Get from database.
const all_apps = [
  { name: "frontend", version: "0.1", installed: true },
  { name: "backend", version: "0.1", installed: true },
  { name: "deck", version: "0.1", installed: false },
  { name: "database", version: "0.1", installed: false },
];

let result = all_apps;
if (installed) {
  result = all_apps.filter((item) => item.installed);
}

let response = new Response(JSON.stringify(result));

await http.respondWith(response);
