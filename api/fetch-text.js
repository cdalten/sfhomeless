//import nodefetch from 'node-fetch'

export default async function (request) {
  // The absolute remote external URL to fetch
  const externalUrl = 'https://api.github.com/';
  try {
    // Perform the fetch request server-side
    const response = await nodefetch(externalUrl, {
      cache: 'no-store', // Prevents caching of the response if dynamic data is needed
    });

    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the response body as plain text
    const textData = await response.text();

    // Return the fetched data in a new Response
    return new Response(`Fetched external data (your IP address): ${textData}`, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return new Response(`Error fetching data: ${error.message}`, {
      status: 500,
    });
  }
}
