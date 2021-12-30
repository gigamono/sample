const {
  log,
  Response,
  events: { http },
  File,
  decode,
} = Tera;

// Get queries.
const profile = http.request.uri.query.get("profile");
const notifications = http.request.uri.query.get("notifications");

// Set filename.
let filename = "api/v1/system/session/data/state.json";

if (profile) {
  filename = "api/v1/system/session/data/profile.json";
} else if (notifications) {
  filename = "api/v1/system/session/data/notifications.json";
}

// TODO(appcypher): Get from database.
const file = await File.open(filename, {
  read: true,
  write: true,
});

const content = await file.readAll();

const sessionState = JSON.parse(decode(content));

let response = new Response(JSON.stringify({ data: sessionState }), {
  headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
});

await http.respondWith(response);
