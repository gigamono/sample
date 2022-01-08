const { File, decode, encode, log } = Tera;

async function fetchAppsFromFile(type) {
  const filename = `/data/api/v1/system/apps/apps.json`;

  // Read file content.
  const file = await File.open(filename, { read: true });
  const content = await file.readAll();

  // Parse content.
  const apps = JSON.parse(decode(content));

  // Filter out deleted items.
  return apps.filter((app) => !app.deleted);
}

async function fetchAppTabsFromFile() {
  const filename = `/data/api/v1/system/apps/tabs.json`;

  // Read file content.
  const file = await File.open(filename, { read: true });
  const content = await file.readAll();

  // Parse content.
  const apps = JSON.parse(decode(content));

  // Filter out deleted items.
  return apps.filter((app) => !app.deleted);
}

export { fetchAppsFromFile, fetchAppTabsFromFile };
