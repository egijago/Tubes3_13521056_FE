async function send(queries) {
  const response = await fetch('https://tubes3-13521056-vfnu.vercel.app/api/prompt', {
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