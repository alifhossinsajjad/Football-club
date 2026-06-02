const fetch = require('node-fetch');

async function test() {
  const res = await fetch("http://98.81.136.120:9000/api/account/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", password: "password" })
  });
  const data = await res.json();
  console.log(data);
}
test();
