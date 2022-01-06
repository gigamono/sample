const {
  log,
  Response,
  decode,
  events: { http },
} = Tera;

function checkValidCors() {
  log.info("Headers:", http.request.headers);

  const accessMethod = http.request.headers.get("Access-Control-Request-Method");
  const projectId = http.request.uri.path.get("projects");

  log.info("Access-Control-Request-Method:", accessMethod);
  log.info("projectId:", projectId);

  if (
    projectId &&
    ["POST", "GET", "OPTIONS", "DELETE"].includes(accessMethod)
  ) {
    return true;
  }

  return false;
}

async function main() {
  let response = new Response(null, {
    status: 400,
  });

  if (checkValidCors()) {
    response = new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      },
      status: 204,
    });
  }

  await http.respondWith(response);
}

if (import.meta.main) {
  await main();
}
