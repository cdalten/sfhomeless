export const runtime = 'edge';
// Helper to delay requests
//const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function (request) {
  // The absolute remote external URL to fetch
  const externalUrl = 'https://sfha.org/housing-programs/waitlist';

  try {
    // Perform the fetch request server-side
    const response = await fetch(externalUrl, {
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

async function fetchWithDelay() {         
  //  for (const url of urls) {
    try {
        const baseUrl = getBaseUrl();
   const absoluteUrl = `${baseUrl}/index`; //
        document.write("absolute url " + absoluteUrl);
      const response = await fetch(absoluteUrl);
      //const data = await response.text(); // or .json() [2]
     // getStatus(data, url);
      await wait(1000); // 1-second timer between sites [1]
    } catch (error) {
      console.error(`Error: ${error}`);
    }
//  }
  console.log("\n\n");
}


function fetchPeriodically() {
  //console.log("Fetching new data...");
  fetchWithDelay(urls); // Reusing the function from above
}

function getStatus(data, url) {
  let city = data.toLowerCase().includes("open");


  /*if (city) {
   console.log(url + " list is closed");
  } else {
   console.log(url + "  list is open");
  }
    */
    //document.getElementById('content-container').innerHTML = data;
}

function pollSite() {
  fetchPeriodically();
}

function main() {
// pollSite();
//console.log("test\n");
//document.write("<h1>This text was written by document.write()</h1>\n");
}

//main();
