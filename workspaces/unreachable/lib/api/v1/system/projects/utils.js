
const {
  File,
  decode,
} = Tera;

async function fetchProjectsFromFile() {
  const filename = "/data/api/v1/system/projects/projects.json";

  const file = await File.open(filename, { read: true });

  const content = await file.readAll();

  return JSON.parse(decode(content));
}

async function saveProjectsToFile(filename, content) {
}

export {
  fetchProjectsFromFile,
  saveProjectsToFile,
}
