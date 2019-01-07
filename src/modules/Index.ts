import { AxiosInstance } from "axios";
import { object } from "prototyped.js/es6/methods";
import * as Client from "..";
import Filter from "../Filter";

namespace Index {
  export type Result<T extends object, R extends string> = {
    [K in R]: T[];
  } & {
    meta: {
      page: number,
      limit: number,
      page_count: number,
      total_count: number,
    };
  };
}

class Index<T extends object, R extends string = any> extends Filter<T> {
  protected _params: { [key: string]: any } = {};

  constructor(protected _axios: AxiosInstance, protected _resource: R, protected _prefix = "") {
    super();
  }

  public include(relations: string | string[]) {
    if (!this._params.include) this._params.include = [];

    if (Array.isArray) this._params.include = this._params.include.concat(relations);
    else this._params.include.push(relations);

    return this;
  }

  public sort(sort: string[]) {
    this._params.sort = sort;

    return this;
  }

  public skip(skip: number) {
    this._params.skip = skip;

    return this;
  }

  public limit(limit: number) {
    this._params.limit = limit;

    return this;
  }

  public get(): Promise<Index.Result<T, R>>;
  public get(callback: Client.Callback<Index.Result<T, R>>): void;
  public get(callback?: Client.Callback<Index.Result<T, R>>) {
    const params = Object.assign({}, this._params);

    const filters = this._filters;
    if (object.size(filters)) params.filter = filters;

    const request = this._axios.get(`${this._prefix}/${this._resource}`, { params });

    if (!callback) return request.then(response => response.data);

    request
      .then(response => callback(null, response.data))
      .catch((err: Error) => (callback as any)(err));
  }
}

export default Index;
