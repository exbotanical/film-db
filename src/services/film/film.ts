import { DataRepository, type Film } from '@/types'

export class FilmService {
  constructor(private readonly repository: DataRepository<Film>) {}

  getAllFilms() {
    return this.repository.getData()
  }
}

// {
//   "url": "https://api.github.com/gists/5cd656b515d8815a6da8dd1abb8110e6",
//   "forks_url": "https://api.github.com/gists/5cd656b515d8815a6da8dd1abb8110e6/forks",
//   "commits_url": "https://api.github.com/gists/5cd656b515d8815a6da8dd1abb8110e6/commits",
//   "id": "5cd656b515d8815a6da8dd1abb8110e6",
//   "node_id": "G_kwDOAtpbUdoAIDVjZDY1NmI1MTVkODgxNWE2ZGE4ZGQxYWJiODExMGU2",
//   "git_pull_url": "https://gist.github.com/5cd656b515d8815a6da8dd1abb8110e6.git",
//   "git_push_url": "https://gist.github.com/5cd656b515d8815a6da8dd1abb8110e6.git",
//   "html_url": "https://gist.github.com/exbotanical/5cd656b515d8815a6da8dd1abb8110e6",
//   "files": {
//     "movies.db": {
//       "filename": "movies.db",
//       "type": "text/plain",
//       "language": null,
//       "raw_url": "https://gist.githubusercontent.com/exbotanical/5cd656b515d8815a6da8dd1abb8110e6/raw/2fccebdc0c05b0d917087dc7abecedbab57bd27a/movies.db",
//       "size": 133,
//       "truncated": false,
//       "content": "[{\"title\":\"The Godfather\",\"createdAt\":1683331313502,\"updatedAt\":1683331313502,\"comments\":\"pretty good\",\"watchDates\":[1683331313502]}]"
//     }
//   },
//   "public": true,
//   "created_at": "2023-05-06T00:02:58Z",
//   "updated_at": "2023-05-06T00:02:58Z",
//   "description": "",
//   "comments": 0,
//   "user": null,
//   "comments_url": "https://api.github.com/gists/5cd656b515d8815a6da8dd1abb8110e6/comments",
//   "owner": {
//     "login": "exbotanical",
//     "id": 47864657,
//     "node_id": "MDQ6VXNlcjQ3ODY0NjU3",
//     "avatar_url": "https://avatars.githubusercontent.com/u/47864657?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/exbotanical",
//     "html_url": "https://github.com/exbotanical",
//     "followers_url": "https://api.github.com/users/exbotanical/followers",
//     "following_url": "https://api.github.com/users/exbotanical/following{/other_user}",
//     "gists_url": "https://api.github.com/users/exbotanical/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/exbotanical/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/exbotanical/subscriptions",
//     "organizations_url": "https://api.github.com/users/exbotanical/orgs",
//     "repos_url": "https://api.github.com/users/exbotanical/repos",
//     "events_url": "https://api.github.com/users/exbotanical/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/exbotanical/received_events",
//     "type": "User",
//     "site_admin": false
//   },
//   "forks": [

//   ],
//   "history": [
//     {
//       "user": {
//         "login": "exbotanical",
//         "id": 47864657,
//         "node_id": "MDQ6VXNlcjQ3ODY0NjU3",
//         "avatar_url": "https://avatars.githubusercontent.com/u/47864657?v=4",
//         "gravatar_id": "",
//         "url": "https://api.github.com/users/exbotanical",
//         "html_url": "https://github.com/exbotanical",
//         "followers_url": "https://api.github.com/users/exbotanical/followers",
//         "following_url": "https://api.github.com/users/exbotanical/following{/other_user}",
//         "gists_url": "https://api.github.com/users/exbotanical/gists{/gist_id}",
//         "starred_url": "https://api.github.com/users/exbotanical/starred{/owner}{/repo}",
//         "subscriptions_url": "https://api.github.com/users/exbotanical/subscriptions",
//         "organizations_url": "https://api.github.com/users/exbotanical/orgs",
//         "repos_url": "https://api.github.com/users/exbotanical/repos",
//         "events_url": "https://api.github.com/users/exbotanical/events{/privacy}",
//         "received_events_url": "https://api.github.com/users/exbotanical/received_events",
//         "type": "User",
//         "site_admin": false
//       },
//       "version": "3a9b1c0e6ba0592977c85a8d267cb514ea189936",
//       "committed_at": "2023-05-06T00:02:58Z",
//       "change_status": {
//         "total": 1,
//         "additions": 1,
//         "deletions": 0
//       },
//       "url": "https://api.github.com/gists/5cd656b515d8815a6da8dd1abb8110e6/3a9b1c0e6ba0592977c85a8d267cb514ea189936"
//     }
//   ],
//   "truncated": false
// }
