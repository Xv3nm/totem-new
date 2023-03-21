import fs from 'fs/promises';
import fetch from 'node-fetch';

const repoName = 'Xv3nm/totem-new';
const branchName = 'main';

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

const endpoint = 'https://api.github.com/graphql';

const headers = {
  'Content-Type': 'application/json',
};

const commitCountBody = JSON.stringify({ query: commitCountQuery });

(async () => {
  try {
    const response = await fetch(endpoint, { method: 'POST', headers, body: commitCountBody });
    const data = await response.json();
    const commitCount = data;

    console.log('Number of commits:', commitCount);

    // Write the commit count to commit_count.json
    const commitCountData = {
      commitCount,
    };

    await fs.writeFile('commit_count.json', JSON.stringify(data, null, 2));

    console.log('commit_count.json has been updated');
  } catch (error) {
    console.error('Error getting commit count and updating file:', error);
  }
})();
