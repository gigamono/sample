import {
  deleteProjectFromFile,
} from "../../../../lib/api/v1/system/projects/utils.js";

const {
  Response,
  events: { http },
} = Tera;

async function main() {
  const projectId = http.request.uri.path.get("projects");

  let response = new Response('{ "message": "Resource deleted" }');

  if (!(await deleteProjectFromFile(projectId))) {
    response = new Response(null, { status: 404 });
  }

  response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
