import { setCorsHeaders } from "../../../../../../lib/api/cors.js";

const {
  File,
  log,
  Response,
  events: { http },
} = Tera;

async function main() {
  let path = http.request.uri.query.get("path") || "index.html";

  // Get the app name from url path.
  const app = http.request.uri.path.get("apps");
  if (app == null) {
    throw Error("Must specify app query");
  }

  // Set filename.
  const filename = `/apps/${app}/dist/${path}`;

  log.info(`>>>>> Serving file ${filename}`);

  // Open file
  const file = await File.open(filename, { read: true });

  // Set response and send content of file as response
  let response = new Response(file);

  // Set CORS headers.
  setCorsHeaders(response);

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
