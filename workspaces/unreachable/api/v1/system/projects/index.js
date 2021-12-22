const {
  log,
  Response,
  events: { http },
} = Tera;

let response = new Response("Projects API");

await http.respondWith(response);
