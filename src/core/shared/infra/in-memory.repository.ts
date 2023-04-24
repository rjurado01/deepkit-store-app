interface Criteria {
  filter: {
    id: string
  }
}

interface Entity {
  id: string
}

export abstract class InMemeoryRepository<E extends Entity, C extends Criteria> {
  private items: E[] = []

  findAll(query?: C | undefined): Promise<E[]> {
    let result = this.items

    if (query?.filter) {
      result = this.applyFilter(query.filter, result)
    }

    return Promise.resolve(result)
  }

  findOne(filter: C['filter']): Promise<E> {
    const item = this.applyFilter(filter, this.items)[0]

    if (!item) this.notFound(filter)

    return Promise.resolve(item)
  }

  count(filter: C['filter'] | undefined): Promise<number> {
    const items = filter ? this.applyFilter(filter, this.items) : this.items

    return Promise.resolve(items.length)
  }

  async create(user: E): Promise<void> {
    this.items.push(user)
  }

  async update(user: E): Promise<void> {
    this.items.splice(this.findIndex(user), 1, user)

    return Promise.resolve()
  }

  async delete(user: E): Promise<void> {
    this.items.splice(this.findIndex(user), 1)

    return Promise.resolve()
  }

  async clear() {
    this.items = []
  }

  protected abstract applyFilter(filter: C['filter'], items: E[]): E[]

  protected abstract notFound(filter: C['filter']): void

  protected findIndex(user: E): number {
    const index = this.items.findIndex(item => item.id === user.id)

    if (index < 0) this.notFound({id: user.id})

    return index
  }
}
