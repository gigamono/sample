const {
  log,
  Response,
  events: { http },
} = Tera;

// TODO(appcypher): Get from database.
const active_session = {
  space: "development",
  project: "generateX",
  app: "frontend",
  tab: "landing page",
};

let response = new Response(JSON.stringify({ data: active_session }));

await http.respondWith(response);