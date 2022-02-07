const { File, decode } = Tera;

async function fetchSpacesFromFile() {
  let filename = `/data/api/v1/system/spaces/spaces.json`;

  // Read file content.
  const file = await File.open(filename, { read: true });
  const content = await file.readAll();

  // Parse content.
  let result = JSON.parse(decode(content));

  // Filter out deleted result if result is an array.
  if (result instanceof Array) {
    result = result.filter((value) => !value.deleted);
  }

  return result;
}

export { fetchSpacesFromFile };
