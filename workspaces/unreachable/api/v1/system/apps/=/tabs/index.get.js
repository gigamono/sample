import { fetchAppTabsFromFile } from "../../../../../../lib/api/v1/system/apps/utils.js";
import { setCorsHeaders } from "../../../../../../lib/api/cors.js";

const {
  Response,
  events: { http },
} = Tera;

async function main() {
  const projectId = http.request.uri.query.get("projectId");
  let result = await fetchAppTabsFromFile();

  let response = new Response(JSON.stringify({ data: result }));

  if (projectId) {
    result = result.find((item) => item.id === projectId);
    if (result) {
      response = new Response(JSON.stringify({ data: result }));
    } else {
      response = new Response(
        '{ "error": [ { "message": "resource not found" }] }'
      );
    }
  }

  // Set CORS headers.
  setCorsHeaders(response);

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
