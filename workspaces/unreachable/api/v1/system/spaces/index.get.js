const {
  log,
  Response,
  events: { http },
} = Tera;

let installed = http.request.uri.query.get("installed");

// TODO(appcypher): Get from database.
const all_spaces = [
  { name: "Marketing Team" },
  { name: "Development Team" },
  { name: "Product Team" },
];

let result = all_spaces;
if (installed) {
  result = all_spaces.filter((item) => item.installed);
}

let response = new Response(JSON.stringify({ data: result }), {
  headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
});

await http.respondWith(response);
