async function send(queries) {
  const response = await fetch('http://localhost:3000/api/prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ queries: queries })
  });

  const { message } = await response.json();
  return message;
}

module.exports = send;