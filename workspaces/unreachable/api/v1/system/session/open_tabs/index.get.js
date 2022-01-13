import { fetchSessionFromFile } from "../../../../../lib/api/v1/system/session/utils.js";
import { setCorsHeaders } from "../../../../../lib/api/cors.js";

const {
  log,
  Response,
  events: { http },
} = Tera;

async function main() {
  let app = http.request.uri.query.get("app");

  let result = await fetchSessionFromFile("open_tabs");

  if (app) {
    result = result.filter((tab) => tab.app === app);
  }

  const response = new Response(JSON.stringify({ data: result }));

  // Set CORS headers.
  setCorsHeaders(response);

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
