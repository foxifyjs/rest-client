import { AxiosInstance } from "axios";
import { object } from "prototyped.js/es6/methods";
import * as Client from "..";
import Filter from "../Filter";

class Count<T extends object> extends Filter<T> {
  constructor(protected _axios: AxiosInstance, protected _resource: string, protected _prefix = "") {
    super();
  }

  public get(): Promise<number>;
  public get(callback: Client.Callback<number>): void;
  public get(callback?: Client.Callback<number>) {
    const resource = this._resource;
    const params: { [key: string]: any } = {};

    const filters = this._filters;
    if (object.size(filters)) params.filter = filters;

    const request = this._axios.get(`${this._prefix}/${resource}/count`, { params });

    if (!callback) return request.then(response => response.data[resource]);

    request
      .then(response => callback(null, response.data[resource]))
      .catch((err: Error) => (callback as any)(err));
  }
}

export default Count;
