const { File, decode, encode, log } = Tera;

const filename = "/data/api/v1/system/apps/apps.json";

async function fetchAppsFromFile() {
  // Read file content.
  const file = await File.open(filename, { read: true });
  const content = await file.readAll();

  // Parse content.
  const apps = JSON.parse(decode(content));

  // Filter out deleted items.
  return apps.filter((app) => !app.deleted);
}

export { fetchAppsFromFile };
