import { HttpError } from '@/hooks'
import type { HttpClient } from '@/services/http/client'
import { useAuthStore } from '@/state'
import type { DataRepository } from '@/types'

export interface GitHubRepositoryProps {
  databaseId: string
  databaseName: string
}

interface GistResponsePayload {
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

interface GistRequestPayload {
  gist_id: string
  files: {
    [k: string]: {
      content: string
    }
  }
}

export class GitHubRepository<T> implements DataRepository<T> {
  constructor(
    private readonly client: HttpClient,
    private readonly props: GitHubRepositoryProps,
    private readonly token = useAuthStore().sessionToken,
  ) {}

  async get() {
    return this.client
      .get<GistResponsePayload>(`/gists/${this.props.databaseId}`)
      .then(({ data, ok }) => {
        if (!ok) {
          throw new HttpError('failed to fetch data from db')
        }

        return JSON.parse(this.getDbFile(data, this.props.databaseName)) as T[]
      })
  }

  // TODO: paginate writes to mult files
  async update(payload: T[]) {
    return this.client
      .patch<GistResponsePayload, GistRequestPayload>(
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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        },
      )
      .then(({ data, ok }) => {
        if (!ok) {
          throw new HttpError('failed to fetch data from db')
        }

        return JSON.parse(this.getDbFile(data, this.props.databaseName)) as T[]
      })
  }

  private getDbFile({ files }: GistResponsePayload, name: string) {
    return files[name].content
  }
}
