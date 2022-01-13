import { fetchSessionFromFile } from "../../../../../../lib/api/v1/system/session/utils.js";
import { fetchTabsFromFile } from "../../../../../../lib/api/v1/system/tabs/utils.js";
import { setCorsHeaders } from "../../../../../../lib/api/cors.js";

const {
  log,
  Response,
  events: { http },
} = Tera;

async function main() {
  let app = http.request.uri.query.get("app");

  let openTabs = await fetchSessionFromFile("open_tabs");
  let tabs = await fetchTabsFromFile();

  let tabIds = app
    ? openTabs.filter((tab) => tab.appName === app).map((tab) => tab.tabId)
    : openTabs.map((tab) => tab.tabId);

  const result = tabs.filter((tab) => tabIds.includes(tab.id));

  const response = new Response(JSON.stringify({ data: result }));

  // Set CORS headers.
  setCorsHeaders(response);

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
