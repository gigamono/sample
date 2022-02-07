import { fetchSpacesFromFile } from "../../../../lib/api/v1/system/spaces/utils.js";
import { setCorsHeaders } from "../../../../lib/api/cors.js";

const {
  log,
  Response,
  events: { http },
} = Tera;

async function main() {
  let result = await fetchSpacesFromFile();

  let response = new Response(JSON.stringify({ data: result }));

  // Set CORS headers.
  setCorsHeaders(response);

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
