const { File, decode, log } = Tera;


async function fetchSessionFromFile(type) {
  const filename = `/data/api/v1/system/session/${type}.json`;

  // Read file content.
  const file = await File.open(filename, { read: true });
  const content = await file.readAll();

  // Parse content.
  let result = JSON.parse(decode(content));

  return result;
}

export { fetchSessionFromFile };
