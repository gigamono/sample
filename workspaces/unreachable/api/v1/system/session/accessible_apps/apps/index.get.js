import { fetchSessionFromFile } from "../../../../../../lib/api/v1/system/session/utils.js";
import { fetchAppsFromFile } from "../../../../../../lib/api/v1/system/apps/utils.js";
import { setCorsHeaders } from "../../../../../../lib/api/cors.js";

const {
  log,
  Response,
  events: { http },
} = Tera;

async function main() {
  let focus = http.request.uri.query.get("focus");

  let accessibleApps = await fetchSessionFromFile("accessible_apps");
  let apps = await fetchAppsFromFile();

  // Filtering.
  accessibleApps = focus
    ? accessibleApps.filter((app) => app.focus)
    : accessibleApps;

  // Get apps corresponding to accessible.
  let result = [];
  for (const accessibleApp of accessibleApps) {
    for (const app of apps) {
      if (app.id === accessibleApp.appId) {
        result.push(app);
      }
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
