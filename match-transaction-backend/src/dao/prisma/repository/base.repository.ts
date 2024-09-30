export class BaseRepository<T> {
  protected model;

  constructor(model: any) {
    this.model = model;
  }

  async findUnique(searchData: any): Promise<T> {
    return this.model.findUnique(searchData);
  }

  async findFirst(searchData: any): Promise<T> {
    return this.model.findFirst(searchData);
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async findMany(searchData: any): Promise<T[]> {
    return this.model.findMany(searchData);
  }

  async create(data: any): Promise<T> {
    return this.model.create(data);
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({ where: { id } });
  }

  async count(data: any): Promise<T> {
    return this.model.count(data);
  }
}
