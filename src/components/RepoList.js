import React from 'react';

function RepoList({ repos }) {
  if (!repos || repos.length === 0) {
    return <p>No repositories found.</p>;
  }

  console.log('Repositories:', repos);
  return (
    <div>
      <h3>Repositories:</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>{' '}
            ⭐ {repo.stargazers_count}{' '}
            {repo.description ? `- ${repo.description}` : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoList;
