const server_url = process.env.REACT_APP_SERVER_URL;

async function handleTranslateClickHelper(inputText) {
  const response = await fetch(`${server_url}/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: inputText,
    }),
  });
  const data = await response.json();
  return data.message;
}
