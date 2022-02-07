import { deleteProjectFromFile } from "../../../../lib/api/v1/system/projects/utils.js";
import { setCorsHeaders } from "../../../../lib/api/cors.js";

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

  // Set CORS headers.
  setCorsHeaders(response);

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
