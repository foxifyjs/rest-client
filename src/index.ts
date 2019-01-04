import Axios, { AxiosProxyConfig } from "axios";
import { string } from "prototyped.js/es6/methods";
import * as QS from "qs";
import Count from "./modules/Count";
import Index from "./modules/Index";
import Show from "./modules/Show";

const CONFIG: Partial<Client.Options> = {};

namespace Client {
  export interface Options {
    API: string;
    TOKEN?: string;
    PROXY?: AxiosProxyConfig;
  }

  export type Callback<T = any> = (error: Error | null, result: T) => void;

  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
}

class Client<T extends object = any> {
  /**
   * Sets global proxy
   */
  public static setProxy = (proxy: AxiosProxyConfig) => CONFIG.PROXY = proxy;

  /**
   * Sets global API address
   */
  public static setAPI = (api: string) => CONFIG.API = api;

  /**
   * Sets global API token
   */
  public static setToken = (token: string) => CONFIG.TOKEN = token;

  protected _config = Object.assign({}, CONFIG);

  protected get _axios() {
    const headers: { [header: string]: string } = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const config = this._config;

    const TOKEN = config.TOKEN;

    if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

    return Axios.create({
      baseURL: config.API,
      headers,
      paramsSerializer: QS.stringify,
      proxy: config.PROXY,
    });
  }

  /**
   * Sets instance's proxy
   */
  public setProxy(proxy: AxiosProxyConfig) {
    this._config.PROXY = proxy;

    return this;
  }

  /**
   * Sets instance's API address
   */
  public setAPI(api: string) {
    this._config.API = api;

    return this;
  }

  /**
   * Sets instance's API token
   */
  public setToken(token: string) {
    this._config.TOKEN = token;

    return this;
  }

  public count<R extends string>(resource: R): Count<T>;
  public count<R extends string>(prefix: string, resource: R): Count<T>;
  public count(prefix: string, resource?: string) {
    if (!resource) {
      resource = prefix;
      prefix = undefined as any;
    }

    return new Count<T>(this._axios, resource, prefix);
  }

  public index<R extends string>(resource: R): Index<T, R>;
  public index<R extends string>(prefix: string, resource: R): Index<T, R>;
  public index(prefix: string, resource?: string) {
    if (!resource) {
      resource = prefix;
      prefix = undefined as any;
    }

    return new Index(this._axios, resource, prefix);
  }

  public show<R extends string>(resource: R): Show<T>;
  public show<R extends string>(prefix: string, resource: R): Show<T>;
  public show(prefix: string, resource?: string) {
    if (!resource) {
      resource = prefix;
      prefix = undefined as any;
    }

    return new Show<T>(this._axios, resource, prefix);
  }

  public store(resource: string, data: T): Promise<T>;
  public store(prefix: string, resource: string, data: T): Promise<T>;
  public store(resource: string, data: T, callback: Client.Callback<T>): void;
  public store(prefix: string, resource: string, data: T, callback: Client.Callback<T>): void;
  public store(prefix: string, resource: string | T, data?: T | Client.Callback<T>, callback?: Client.Callback<T>) {
    if (!string.isString(resource)) {
      callback = data as Client.Callback<T>;
      data = resource;
      resource = prefix;
      prefix = "";
    }

    const key = string.pluralize(resource, 1);

    const request = this._axios.post(`${prefix}/${resource}`, {
      data: {
        [key]: data,
      },
    });

    if (!callback) return request.then(response => response.data[key]);

    request
      .then(response => (callback as any)(null, response.data[key]))
      .catch((err: Error) => (callback as any)(err));
  }

  public update(resource: string, id: string, data: Partial<T>): Promise<T>;
  public update(prefix: string, resource: string, id: string, data: Partial<T>): Promise<T>;
  public update(resource: string, id: string, data: Partial<T>, callback: Client.Callback<T>): void;
  public update(prefix: string, resource: string, id: string, data: Partial<T>, callback: Client.Callback<T>): void;
  public update(
    prefix: string, resource: string, id: string | Partial<T>,
    data?: Partial<T> | Client.Callback<T>, callback?: Client.Callback<T>,
  ) {
    if (!string.isString(id)) {
      callback = data as Client.Callback<T>;
      data = id;
      id = resource;
      resource = prefix;
      prefix = "";
    }

    const key = string.pluralize(resource, 1);

    const request = this._axios.patch(`/${resource}/${id}`, {
      data: {
        [key]: data,
      },
    });

    if (!callback) return request.then(response => response.data[key]);

    request
      .then(response => (callback as any)(null, response.data[key]))
      .catch((err: Error) => (callback as any)(err));
  }

  public delete(path: string, id: string): Promise<string>;
  public delete(path: string, id: string, callback: Client.Callback<string>): void;
  public delete(path: string, id: string, callback?: Client.Callback<string>) {
    const request = this._axios.delete(`/${path}/${id}`);

    if (!callback) return request.then(response => response.data.message);

    request
      .then(response => callback(null, response.data.message))
      .catch((err: Error) => (callback as any)(err));
  }
}

export = Client;
