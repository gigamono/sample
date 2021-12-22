const {
  log,
  Response,
  events: { http },
} = Tera;

let response = new Response("Spaces API");

await http.respondWith(response);
