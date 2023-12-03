import { IBaseDto } from "./interfaces/base-dto.interface";
import { BaseEntitiy } from "./interfaces/base-entitiy.abstract";

export interface IRepository<T extends BaseEntitiy> {
  create<D extends IBaseDto>(model: D): Promise<T>;
  delete(id: string): Promise<Boolean>;
  update<D extends IBaseDto>(model: D): Promise<T>;
  getById(id: string): Promise<T>;
  getAll(): Promise<Array<T>>;
}
