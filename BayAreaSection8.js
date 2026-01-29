const urls =  [
    'https://sfha.org/housing-programs/waitlist',
    'https://www.oakha.org/housing/qualifyandapply/waitlists/',
    'https://bha.berkeleyca.gov/bha-programs/section-8-waitlist'                   ]
                                        
let combinedData = "";                  
// Helper to delay requests
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithDelay() {         
    for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.text(); // or .json() [2]
      getStatus(data, url);
      await wait(1000); // 1-second timer between sites [1]
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
  console.log("\n\n");
}


function fetchPeriodically() {
  //console.log("Fetching new data...");
  fetchWithDelay(urls); // Reusing the function from above
}

function getStatus(data, url) {
  let city = data.toLowerCase().includes("open");

  if (city) {
   alert(url + " list is closed");
  } else {
   alert(url + "  list is open");
  }
}

function pollSite() {
  

  fetchPeriodically();


}


function main() {
 // pollSite();
alert("test");
}

main();
