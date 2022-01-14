import { fetchSessionFromFile } from "../../../../../../lib/api/v1/system/session/utils.js";
import { fetchTabsFromFile } from "../../../../../../lib/api/v1/system/tabs/utils.js";
import { setCorsHeaders } from "../../../../../../lib/api/cors.js";

const {
  log,
  Response,
  events: { http },
} = Tera;

async function main() {
  let appId = http.request.uri.query.get("appId");
  let projectId = http.request.uri.query.get("projectId");
  let focus = http.request.uri.query.get("focus");

  let openTabs = await fetchSessionFromFile("open_tabs");
  let tabs = await fetchTabsFromFile();

  // Filtering.
  openTabs = focus ? openTabs.filter((tab) => tab.focus) : openTabs;
  tabs = appId ? tabs.filter((tab) => tab.appId === appId) : tabs;
  tabs = projectId
    ? tabs.filter((tab) => tab.projectId === projectId)
    : tabs;

  // Get tabs corresponding to openTabs.
  let result = [];
  for (const openTab of openTabs) {
    for (const tab of tabs) {
      if (tab.id === openTab.tabId) {
        result.push(tab);
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
