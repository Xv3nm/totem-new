const fs = require("fs");
const fetch = require("node-fetch");

const repoName = "Xv3nm/totem-new";
const branchName = "main";

const endpoint = `https://api.github.com/repos/${repoName}/commits?sha=${branchName}&per_page=1`;

fetch(endpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error getting commit count: ${response.statusText}`);
    }
    return response.headers.get("link");
  })
  .then(linkHeader => {
    const lastPageMatch = linkHeader.match(/<[^>]+page=(\d+)[^>]+>; rel="last"/);
    if (!lastPageMatch) {
      throw new Error("Cannot find commit count in Link header");
    }
    const commitCount = parseInt(lastPageMatch[1], 10);
    const commitCountData = { commitCount };
    fs.writeFileSync("commit_count.json", JSON.stringify(commitCountData));
  })
  .catch(error => {
    console.error("Error getting commit count:", error);
  });
