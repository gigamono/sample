const {
  log,
  Response,
  events: { http },
} = Tera;

let installed = http.request.uri.query.get("installed");

// TODO(appcypher): Get from database.
const all_apps = [
  { name: "frontend", version: "0.1", installed: true },
  { name: "backend", version: "0.1", installed: true },
  { name: "deck", version: "0.1", installed: true },
  { name: "database", version: "0.1", installed: true },
  { name: "security", version: "0.1", installed: false },
];

let result = all_apps;
if (installed === null || installed) {
  result = all_apps.filter((item) => item.installed);
}

let response = new Response(JSON.stringify({ data: result }), {
  headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
});

await http.respondWith(response);
