const { File, decode, log } = Tera;

const filename = `/data/api/v1/system/profile/profile.json`;

async function fetchProfileFromFile() {
  // Read file content.
  const file = await File.open(filename, { read: true });
  const content = await file.readAll();

  // Parse content.
  let result = JSON.parse(decode(content));

  return result;
}

export { fetchProfileFromFile };
