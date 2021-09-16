declare module "can-query-logic" {
  type BaseT = Record<string, any>;

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

  export interface Query<T extends BaseT> {
    filter?: Filter<T>;
    sort?: string;
    page?: {
      start?: number;
      end?: number;
    };
  }

  export default class QueryLogic<T extends BaseT> {
    constructor(schema: any);

    filterMembersAndGetCount(queryA: Query<T>, allData: T[]);
    filterMembersAndGetCount(
      queryA: Query<T>,
      queryB?: Query<T>,
      allData: T[],
    ): {
      data: T[];
      count: number;
    };
  }
}
