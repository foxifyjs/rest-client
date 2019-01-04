import { AxiosInstance } from "axios";
import { string } from "prototyped.js/es6/methods";
import * as Client from "..";

class Show<T extends object> {
  protected _params: { [key: string]: any } = {};

  constructor(protected _axios: AxiosInstance, protected _resource: string, protected _prefix = "") { }

  public include(relation: string) {
    if (!this._params.include) this._params.include = [];

    this._params.include.push(relation);

    return this;
  }

  public get(id: string): Promise<T>;
  public get(id: string, callback: Client.Callback<T>): void;
  public get(id: string, callback?: Client.Callback<T>) {
    const key = string.pluralize(this._resource, 1);
    const params = Object.assign({}, this._params);

    const request = this._axios.get(`${this._prefix}/${this._resource}/${id}`, { params });

    if (!callback) return request.then(response => response.data[key]);

    request
      .then(response => callback(null, response.data[key]))
      .catch((err: Error) => (callback as any)(err));
  }
}

export default Show;
