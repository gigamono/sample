const {
  log,
  Response,
  events: { http },
} = Tera;

if (http.request.method !== "GET") {
  throw Error("expected a GET method");
}

let installed = http.request.uri.query.get("installed");

// TODO(appcypher): Get from database.
const all_spaces = [
  { name: "marketing" },
  { name: "development" },
  { name: "product" },
];

let result = all_spaces;
if (installed) {
  result = all_spaces.filter((item) => item.installed);
}

let response = new Response(JSON.stringify({ data: result }));

await http.respondWith(response);
