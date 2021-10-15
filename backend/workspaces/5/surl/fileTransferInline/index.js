const { open } = require("fs/promises")


function test() {
  const f = await open("/test", "r")
  const content = await f.read()

  return {
    headers: {
      "Content-Type": ["application/octet-stream"],
      "Content-Disposition": ["inline"],
    },
    data: content.buffer,
    statusCode: 200,
  };
}

test();
