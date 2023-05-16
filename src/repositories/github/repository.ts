import { httpClient } from '@/services/http'
import type { HttpClient } from '@/services/http/client'
import type { DataRepository } from '@/types'

import { GITHUB_API_URL } from './config'
import { HttpError } from '@/hooks'

export interface GitHubRepositoryProps {
  databaseId: string
  databaseName: string
}

interface GistPayload {
  files: {
    [key: string]: {
      content: string
      truncated: boolean // TODO: handle
    }
  }
  created_at: string
  updated_at: string
  description: string
  // TODO: rest
}

export class GitHubRepository<T> implements DataRepository<T> {
  private readonly client: HttpClient

  constructor(private readonly props: GitHubRepositoryProps) {
    this.client = httpClient(GITHUB_API_URL)
  }

  async get() {
    return this.client
      .get<GistPayload>(`/gists/${this.props.databaseId}`)
      .then(({ data, ok }) => {
        if (!ok) {
          throw new HttpError('failed to fetch data from db')
        }

        return JSON.parse(this.getDbFile(data, this.props.databaseName)) as T[]
      })
  }
  // TODO: use oktokit
  // TODO: paginate writes to mult files
  async update(payload: T[]) {
    return (
      await this.client.patch(
        `/gists/${this.props.databaseId}`,
        {
          gist_id: this.props.databaseId,
          files: {
            [this.props.databaseName]: { content: JSON.stringify(payload) },
          },
        },
        {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'accept': 'application/vnd.github+json',
          },
        },
      )
    )?.ok
  }

  private getDbFile({ files }: GistPayload, name: string) {
    return files[name].content
  }
}
