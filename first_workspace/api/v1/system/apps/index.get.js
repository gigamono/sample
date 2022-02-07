import { fetchAppsFromFile } from "../../../../lib/api/v1/system/apps/utils.js";
import { setCorsHeaders } from "../../../../lib/api/cors.js";

const {
  Response,
  events: { http },
} = Tera;

async function main() {
  const enabled = http.request.uri.query.get("enabled");

  let result = await fetchAppsFromFile();

  if (enabled) {
    result = result.filter((item) => item.enabled);
  }

  const response = new Response(JSON.stringify({ data: result }));

  // Set CORS headers.
  setCorsHeaders(response);

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
