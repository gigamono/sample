const {
  log,
  Response,
  events: { http },
} = Tera;

let installed = http.request.uri.query.get("installed");

// TODO(appcypher): Get from database.
const all_apps = [
  { name: "frontend@v0.1", installed: true },
  { name: "backend@v0.1", installed: true },
  { name: "deck@v0.1", installed: true },
  { name: "database@v0.1", installed: true },
  { name: "security@v0.1", installed: false },
];

let result = all_apps;
if (installed === null || installed) {
  result = all_apps.filter((item) => item.installed);
}

let response = new Response(JSON.stringify({ data: result }), {
  headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
});

await http.respondWith(response);
