/*
files:
  - name: "/samples/hello.svg"
    level: "read-write"
*/

import { file } from "cap.js";

function test() {
  return {
    headers: {
      "Content-Type": ["application/octet-stream"],
      "Content-Disposition": ["attachment"],
    },
    data: file.readSync("/samples/gigamono.svg"), // ArrayBuffer.
    statusCode: 200,
  };
}

test();
