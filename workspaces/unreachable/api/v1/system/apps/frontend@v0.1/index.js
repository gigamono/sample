const {
  log,
  Response,
  events: { http },
} = Tera;

log.info("An API for frontend@v0.1");

let response = new Response("Frontend APP API here!");

await http.respondWith(response);
