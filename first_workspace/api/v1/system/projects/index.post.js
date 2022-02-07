import { saveProjectsToFile } from "../../../../lib/api/v1/system/projects/utils.js";
import { setCorsHeaders } from "../../../../lib/api/cors.js";

const {
  Response,
  decode,
  events: { http },
} = Tera;

async function main() {
  const string = decode(await http.request.body.readAll());

  // SEC: Only get the following fields from the request body.
  const { name, space, color } = JSON.parse(string);

  await saveProjectsToFile(name, space, color);

  let response = new Response('{ "message": "Resource added" }');

  // Set CORS headers.
  setCorsHeaders(response);

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
