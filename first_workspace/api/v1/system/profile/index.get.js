import { fetchProfileFromFile } from "../../../../lib/api/v1/system/profile/utils.js";
import { setCorsHeaders } from "../../../../lib/api/cors.js";

const {
  Response,
  events: { http },
} = Tera;

async function main() {
  let result = await fetchProfileFromFile();

  const response = new Response(JSON.stringify({ data: result }));

  // Set CORS headers.
  setCorsHeaders(response);

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
