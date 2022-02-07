const {
  events: { http },
} = Tera;

export function setCorsHeaders(response) {
  if (http.request.headers.get("Origin") === "http://localhost:3000") {
    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
    );
  }
}
