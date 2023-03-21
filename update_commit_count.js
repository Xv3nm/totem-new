const repoName = "Xv3nm/totem-new";
const branchName = "main";

const commitCountQuery = `query {
  repository(owner: "Xv3nm", name: "totem-new") {
    ref(qualifiedName: "${branchName}") {
      target {
        ... on Commit {
          history {
            totalCount
          }
        }
      }
    }
  }
}`;

const endpoint = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json"
};

const commitCountBody = JSON.stringify({ query: commitCountQuery });

(async () => {
  const fetch = await import("node-fetch").then(module => module.default);
  
  try {
    const response = await fetch(endpoint, { method: "POST", headers, body: commitCountBody });
    const data = await response.json();
    const commitCount = data.data.repository.ref.target.history.totalCount;

    console.log("Number of commits:", commitCount);
  } catch (error) {
    console.error("Error getting commit count:", error);
  }
})();
