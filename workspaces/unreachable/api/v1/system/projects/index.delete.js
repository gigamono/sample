import { fetchProjectsFromFile, saveProjectsToFile } from "../../../../lib/api/v1/system/projects/utils.js";

const {
  log,
  Response,
  File,
  decode,
  events: { http },
} = Tera;


async function main() {
  const projectId = http.request.uri.path.get("projects");

  const allProjects = await fetchProjectsFromFile();

  if (projectId) {
    space = space.replace('%20', ' ');
    result = projectId.filter((item) => item.id !== projectId);
  }

  let response = new Response(JSON.stringify({ data: result }), {
    headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
  });

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
