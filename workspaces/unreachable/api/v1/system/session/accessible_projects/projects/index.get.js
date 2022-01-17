import { fetchSessionFromFile } from "../../../../../../lib/api/v1/system/session/utils.js";
import { fetchProjectsFromFile } from "../../../../../../lib/api/v1/system/projects/utils.js";
import { setCorsHeaders } from "../../../../../../lib/api/cors.js";

const {
  log,
  Response,
  events: { http },
} = Tera;

async function main() {
  let focus = http.request.uri.query.get("focus");

  let accessibleProjects = await fetchSessionFromFile("accessible_projects");
  let projects = await fetchProjectsFromFile();

  // Filtering.
  accessibleProjects = focus
    ? accessibleProjects.filter((project) => project.focus)
    : accessibleProjects;

  // Get projects corresponding to accessible.
  let result = [];
  for (const accessibleProject of accessibleProjects) {
    const project = projects.find(
      (project) => project.id === accessibleProject.projectId
    );
    if (project) {
      result.push({
        ...project,
        focus: accessibleProject.focus,
        order: accessibleProject.order,
        accessibleProjectId: accessibleProject.id,
      });
    }
  }

  const response = new Response(JSON.stringify({ data: result }));

  // Set CORS headers.
  setCorsHeaders(response);

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
