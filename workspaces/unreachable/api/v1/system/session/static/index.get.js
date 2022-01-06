const {
  File,
  log,
  Response,
  events: { http },
} = Tera;

let path = http.request.uri.query.get("path") || "index.html";
const filePath = `/data/api/v1/system/session/${path}`;

log.info(`>>>>> Serving file ${filePath}`);

const file = await File.open(filePath, { read: true });

let response = new Response(file, {
  headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
});

await http.respondWith(response);
