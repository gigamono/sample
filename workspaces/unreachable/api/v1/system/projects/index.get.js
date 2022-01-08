import { fetchProjectsFromFile } from "../../../../lib/api/v1/system/projects/utils.js";
import { setCorsHeaders } from "../../../../lib/api/cors.js";

const {
  Response,
  events: { http },
} = Tera;

async function main() {
  let space = http.request.uri.query.get("space");

  let result = await fetchProjectsFromFile();

  if (space) {
    space = space.replace("%20", " ");
    result = result.filter((item) => item.space == space);
  }

  const response = new Response(JSON.stringify({ data: result }));

  // Set CORS headers.
  setCorsHeaders(response);

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
