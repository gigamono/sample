import { fetchTabsFromFile } from "../../../../lib/api/v1/system/tabs/utils.js";
import { setCorsHeaders } from "../../../../lib/api/cors.js";

const {
  Response,
  events: { http },
} = Tera;

async function main() {
  const tabId = http.request.uri.path.get("tabs");
  let result = await fetchTabsFromFile();

  let response = new Response(JSON.stringify({ data: result }));

  if (tabId) {
    result = result.find((item) => item.id === tabId);
    if (result) {
      response = new Response(JSON.stringify({ data: result }));
    } else {
      response = new Response(
        '{ "error": [ { "message": "resource not found" }] }',
        {
          status: 400,
        }
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
