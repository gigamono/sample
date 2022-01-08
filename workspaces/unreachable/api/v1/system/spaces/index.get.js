import { fetchSpacesFromFile } from "../../../../lib/api/v1/system/spaces/utils.js";

const {
  log,
  Response,
  events: { http },
} = Tera;

async function main() {
  let result = await fetchSpacesFromFile();

  let response = new Response(JSON.stringify({ data: result }), {
    headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
  });

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
