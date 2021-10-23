function test() {
  return {
    headers: {
      "Content-Type": ["application/json", "charset=utf-8"],
    },
    data: `{
      "name":"Tamedun La",
      "age": 22,
      "email": "tamedum.la@gmail.com",
      "address": {
        "street": "21st, tamedun st.",
        "city": "Ikoyi",
        "state": "Lagos",
        "country": "Nigeria"
      }
    }`,
    statusCode: 200,
  };
}

test();
