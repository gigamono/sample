import { fetchSessionFromFile } from "../../../../lib/api/v1/system/session/utils.js";

const {
  Response,
  events: { http },
} = Tera;

async function main() {
  let result = await fetchSessionFromFile();

  const response = new Response(JSON.stringify({ data: result }), {
    headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
  });

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
