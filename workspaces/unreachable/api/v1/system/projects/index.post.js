import { saveProjectsToFile } from "../../../../lib/api/v1/system/projects/utils.js";

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

  response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
