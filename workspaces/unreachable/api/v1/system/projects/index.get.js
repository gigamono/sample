const {
  log,
  Response,
  events: { http },
} = Tera;

let space = http.request.uri.query.get("space");

// TODO(appcypher): Get from database.
const all_projects = [
  { name: "zero-hero campaign", space: "marketing" },
  { name: "email automations", space: "marketing" },
  { name: "outreach", space: "marketing" },
  { name: "generateX", space: "development" },
  { name: "generateX game", space: "development" },
  { name: "marketing site", space: "development" },
  { name: "user feedback", space: "product" },
  { name: "wishlist", space: "product" },
  { name: "new game", space: "product" },
];

let result = all_projects;
if (space) {
  result = all_projects.filter((item) => item.space == space);
}

let response = new Response(JSON.stringify({ data: result }), {
  headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
});

await http.respondWith(response);
