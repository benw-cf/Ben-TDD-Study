const fetch = require("node-fetch");

const codeString =
  "<!doctype html><html><head><title>Example Domain</title> <meta charset=utf-8 /> <meta http-equiv=Content-type content=text/html; charset=utf-8 /> <meta name=viewport content=width=device-width, initial-scale=1 /> <style type=text/css> body { background-color: #f0f0f2; margin: 0; padding: 0; font-family: -apple-system, system-ui BlinkMacSystemFont, Segoe UI, Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;} div { width: 600px; margin: 5em auto; padding: 2em;        background-color: #fdfdff; border-radius: 0.5em; box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02); } a:link, a:visited { color: #38488f; text-decoration: none; } @media (max-width: 700px) { div { margin: 0 auto; width: auto; } } </style> <meta name=NetsparkQuiltingResult total-length=1256 removed=0 rules-found=w3669,w3089,w2339,w3070,w4908 /></head><body><div> <h1>Example Domain</h1> <p>This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.</p> <p><a href=https://www.iana.org/domains/example>More information...</a></></div></body></html>";

const fontCheck = {
  appleSystemCheck: (codeString) => {
    if (codeString.includes("apple-system")) {
      return;
    }
  },
  systemUiCheck: (codeString) => {
    if (codeString.includes("system-ui")) {
      return;
    }
  },
  blinkMacCheck: (codeString) => {
    if (codeString.includes("BlinkMacSystemFont")) {
      return;
    }
  },
  segoeUICheck: (codeString) => {
    if (codeString.includes("Segoe UI")) {
      return;
    }
  },
  openSansCheck: (codeString) => {
    if (codeString.includes("Open Sans")) {
      return;
    }
  },
  helveticaNeueCheck: (codeString) => {
    if (codeString.includes("Helvetica Neue")) {
      return;
    }
  },
  helveticaCheck: (codeString) => {
    if (codeString.includes("Helvetica,")) {
      return;
    }
  },
  arialCheck: (codeString) => {
    if (codeString.includes("Arial")) {
      return;
    }
  },
  sansSerifCheck: (codeString) => {
    if (codeString.includes("sans-serif")) {
      return;
    }
  },
  serifCheck: (codeString) => {
    if (codeString.includes(" serif")) {
      throw new Error("Contains serif!");
    } else {
      return;
    }
  },
};

const elementCheck = {
  divCheck: (codeString) => {
    if (codeString.includes("div")) {
      return;
    } else {
      throw new Error("No div!");
    }
  },
  h1Check: (codeString) => {
    if (codeString.includes("h1")) {
      return;
    } else {
      throw new Error("No h1!");
    }
  },
  h1TextCheck: (codeString) => {
    if (codeString.includes("<h1>Example Domain</h1>")) {
      return;
    } else {
      throw new Error("Not correct text in h1!");
    }
  },
  pCheck: (codeString) => {
    if (codeString.includes("<p>")) {
      return;
    } else {
      throw new Error("No 'p' tag!");
    }
  },
  aTagCheck: (codeString) => {
    if (codeString.includes("<p><a")) {
      return;
    } else {
      throw new Error("Need 'a' tag in 'p' tag!");
    }
  },
  wikiCheck: (codeString) => {
    if (codeString.includes("href=https://www.iana.org/domains/example")) {
      return;
    } else {
      throw new Error("Not correct wiki link in href!");
    }
  },
  moreInfoCheck: (codeString) => {
    if (codeString.includes("More information...</a>")) {
      return;
    } else {
      throw new Error("Not correct 'More Info' text!");
    }
  },
  titleMetaTagCheck: (codeString) => {
    if (codeString.includes("<title>Example Domain</title>")) {
      return;
    } else {
      throw new Error("Not correct title meta tag: Example Domain!");
    }
  },
  deviceMetaTagCheck: (codeString) => {
    if (
      codeString.includes(
        "<meta name=viewport content=width=device-width, initial-scale=1"
      )
    ) {
      return;
    } else {
      throw new Error("Not correct device scale=1 meta tag");
    }
  },
};

const elementFunctionCheck = {
  characterCount: (codeString = " ") => {
    const charCount = codeString.split("").length;
    if (charCount === 1114) {
      return charCount;
    } else {
      throw new Error("Invalid character count");
    }
  },
  tagCount: (codeString = " ", tag = " ") => {
    return codeString.split(tag).length - 1;
  },
  totalTagCount: (codeString = " ") => {
    const divTagCount = codeString.split("div").length - 1;
    const pTagCount = codeString.split("<p>").length - 1;
    const h1TagCount = codeString.split("<h1>").length - 1;
    const aTagCount = codeString.split("<a").length - 1;
    const totalTag = divTagCount + pTagCount + h1TagCount + aTagCount;
    if (totalTag < 5) {
      console.log("Beware, tagCount is below 5");
    }
    return totalTag;
  },
};

const fetchFunctionsCheck = {
  callApi: async () => {
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    const response = await onFetchObj.onFetch(url);
    // console.log("response", response);
    // const data = await response.json();
    return fetchFunctionsCheck.apiLogic(response);
  },

  apiLogic: (response) => {
    const { status, body } = response;
    if (!body) {
      throw new Error("No Content");
    } else if (status >= 200 && status < 300 && body) {
      return response;
    } else if (status === 400) {
      throw new Error("Client Error: Bad Request");
    } else if (status === 401) {
      throw new Error("Client Error: Unathorized");
    } else if (status === 404) {
      throw new Error("Client Error: Not Found");
    } else if (status === 413 && fetchFunctionsCheck.jZipCounter <= 2) {
      setTimeout(() => {
        fetchFunctionsCheck.jZipCounter++;
        // callApi();
      }, 2000);
    } else if (status === 413 && fetchFunctionsCheck.jZipCounter >= 3) {
      throw new Error("Client Error: PayLoad Too Large");
    } else if (status === 429 && fetchFunctionsCheck.requestCounter <= 2) {
      setTimeout(() => {
        fetchFunctionsCheck.requestCounter++;
        // callApi();
      }, 2000);
    } else if (status === 429 && fetchFunctionsCheck.requestCounter >= 3) {
      throw new Error("Client Error: Too Many Requests");
    } else if (status >= 430 && status < 500) {
      throw new Error("Client Error: Bad Request");
    } else if (status >= 500 && fetchFunctionsCheck.serverCounter <= 2) {
      setTimeout(() => {
        fetchFunctionsCheck.serverCounter++;
        // callApi();
      }, 2000);
      return;
    } else if (status >= 500 && fetchFunctionsCheck.serverCounter >= 3) {
      throw new Error("Server Error: Please Try Later");
    } else if (body === null || body === 0) {
    } else if (!status && fetchFunctionsCheck.networkCounter <= 10) {
      setTimeout(() => {
        fetchFunctionsCheck.networkCounter++;
        // callApi();
      }, 3000);
      return;
    } else if (!status && fetchFunctionsCheck.networkCounter >= 11) {
      throw new Error("Network Error: Please Check Connection");
    }
  },

  serverCounter: 0,
  jZipCounter: 0,
  requestCounter: 0,
  networkCounter: 0,
};

const onFetchObj = {
  onFetch: async (url) => {
    await fetch(url);
  },
};

module.exports = {
  codeString,
  fontCheck,
  elementCheck,
  elementFunctionCheck,
  fetchFunctionsCheck,
  onFetchObj,
};
