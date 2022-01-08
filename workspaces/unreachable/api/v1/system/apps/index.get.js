import { fetchAppsFromFile } from "../../../../lib/api/v1/system/apps/utils.js";

const {
  Response,
  events: { http },
} = Tera;

async function main() {
  let installed = http.request.uri.query.get("installed");

  let result = await fetchAppsFromFile();

  if (installed) {
    result = result.filter((item) => item.installed);
  }

  const response = new Response(JSON.stringify({ data: result }), {
    headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
  });

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
