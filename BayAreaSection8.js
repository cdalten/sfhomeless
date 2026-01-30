⁸const urls =  [
    'https://sfha.org/housing-programs/waitlist',
    'https://www.oakha.org/housing/qualifyandapply/waitlists/',
    'https://bha.berkeleyca.gov/bha-programs/section-8-waitlist'                   ]
                                        
let combinedData = "";                  
// Helper to delay requests
//const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export default async function handler(req, res) {
    const externalUrl = urls[1];
  try {
    // Perform the server-side fetch request
    const response = await fetch(externalUrl);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Use the .text() method to parse the response body as plain text
    const textData = await response.text();

    // Return the text data in a new Response object.
    // The content-type header is set to plain/text to match the response type.
    return new Response(`Fetched Data (as text):\n\n${textData}`, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });

  } catch (error) {
    console.error('Error fetching external data:', error);
    // Return an error response if something goes wrong
    return new Response('Error fetching data: ' + error.message, {
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

main();
