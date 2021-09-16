declare module "can-local-store" {
  type BaseT = Record<string, any>;

  interface Query<T extends BaseT> {
    filter?: Filter<T>;
    sort?: string;
    page?: {
      start?: number;
      end?: number;
    };
  }

  type PropertyFilter<T> = {
    $eq?: T;
    $ne?: T;
    $in?: T[];
    $nin?: T[];
    $gt?: T;
    $gte?: T;
    $lt?: T;
    $lte?: T;
    $all?: T;
    $not?: T;
    $and?: T;
  };

  export type Filter<T extends BaseT> = {
    [key in keyof T]?: T[key] | Array<T[key]> | PropertyFilter<T[key]>;
  };

  export type CanLocalStore<T> = {
    getData(baseId: { id: string }): Promise<?T>;
    getListData(query?: Query<T>): Promise<{ data: T[]; count: number }>;
    createData(data: T): Promise<T>;
    updateData(data: Partial<T> & { id: string }): Promise<?T>;
    updateListData(data: T[]): Promise<Array<T>>;
    destroyData(data: T): Promise<T>;
    clear(): Promise<void>;
  };

  export default function localStore<T extends BaseT>(connection: {
    queryLogic: any;
    name: string;
  }): CanLocalStore<T>;
}
