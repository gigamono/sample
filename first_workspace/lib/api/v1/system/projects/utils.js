const { File, decode, encode, log } = Tera;

const filename = "/data/api/v1/system/projects/projects.json";

async function fetchProjectsFromFile() {
  // Read file content.
  const file = await File.open(filename, { read: true });
  const content = await file.readAll();

  // Parse content.
  const projects = JSON.parse(decode(content));

  // Filter out deleted items.
  return projects.filter((project) => !project.deleted);
}

async function saveProjectsToFile(name, space, color = null) {
  // Read and parse content.
  let file = await File.open(filename, { read: true });
  const content = await file.readAll();
  const projects = JSON.parse(decode(content));

  // Push new content into list.
  projects.push({
    id: "", // TODO: generate id.
    name,
    color,
    space,
    deleted: false,
  });

  // Open file in truncate and write mode.
  file = await File.open(filename, { write: true, truncate: true });

  // Write updated projects to file.
  file.writeAll(encode(JSON.stringify(projects)));

  return false;
}

async function deleteProjectFromFile(projectId) {
  // Read and parse content.
  let file = await File.open(filename, { read: true });
  const content = await file.readAll();
  const projects = JSON.parse(decode(content));

  let found = false;
  for (const project of projects) {
    if (project.id === projectId) {
      // Set delete to true.
      project.deleted = true;

      // Open file in truncate and write mode.
      file = await File.open(filename, { write: true, truncate: true });

      // Write updated projects to file.
      file.writeAll(encode(JSON.stringify(projects)));

      found = true;
      break;
    }
  }

  return found;
}

export { fetchProjectsFromFile, saveProjectsToFile, deleteProjectFromFile };
