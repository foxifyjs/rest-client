import { function as func, object } from "prototyped.js/es6/methods";
import * as Client from ".";

export const OPERATORS: { [operator: string]: string } = {
  "<": "lt",
  "<=": "lte",
  "<>": "ne",
  "=": "eq",
  ">": "gt",
  ">=": "gte",
};

namespace Filter {
  export type Filters = {
    and: Filters[];
  } | {
    or: Filters[];
  } | {
    field: string;
    operator: string;
    value: any;
  };

  export type Operator = "<" | "<=" | "=" | "<>" | ">=" | ">";

  export type FilterQuery<T extends object> = (q: Client.Omit<Filter<T>, "whereHas">) => Filter<T>;
}

class Filter<T extends object> {
  protected _filter: Filter.Filters = { and: [] };

  protected get _filters() {
    const FILTERS: any = {
      ...this._filter,
    };

    if (FILTERS.and && FILTERS.and.length === 0) delete FILTERS.and;
    else if (FILTERS.or && FILTERS.or.length === 0) delete FILTERS.or;

    return FILTERS;
  }

  /********************************** Helpers *********************************/

  protected _push_filter(operator: "and" | "or", value: any) {
    const _filters: any = { ...this._filter };

    if (operator === "and" && _filters.or) {
      _filters.$and = [this._filter];
      delete _filters.or;
    } else if (operator === "or" && _filters.and) {
      _filters.$or = [this._filter];
      delete _filters.and;
    }

    _filters[`${operator}`].push(value);

    this._filter = _filters;

    return this;
  }

  protected _where(field: string, operator: string, value: any) {
    return this._push_filter("and", {
      field,
      operator,
      value,
    });
  }

  protected _or_where(field: string, operator: string, value: any) {
    return this._push_filter("or", {
      field,
      operator,
      value,
    });
  }

  /******************************* Where Clauses ******************************/

  public where(query: Filter.FilterQuery<T>): this;
  public where<K extends keyof T>(field: K, value: T[K]): this;
  public where(field: string, value: any): this;
  public where<K extends keyof T>(field: K, operator: Filter.Operator, value: T[K]): this;
  public where(field: string, operator: Filter.Operator, value: any): this;
  public where(
    field: string | Filter.FilterQuery<T>, operator?: Filter.Operator | any, value?: any,
  ) {
    if (func.isFunction(field)) {
      const filter = field(new Filter<T>());

      return this._push_filter("and", filter._filters);
    }

    if (value === undefined) {
      value = operator;
      operator = "=";
    }

    return this._where(field, OPERATORS[operator], value);
  }

  public orWhere(query: Filter.FilterQuery<T>): this;
  public orWhere<K extends keyof T>(field: K, value: T[K]): this;
  public orWhere(field: string, value: any): this;
  public orWhere<K extends keyof T>(field: K, operator: Filter.Operator, value: T[K]): this;
  public orWhere(field: string, operator: Filter.Operator, value: any): this;
  public orWhere(
    field: string | Filter.FilterQuery<T>, operator?: Filter.Operator | any, value?: any,
  ) {
    if (func.isFunction(field)) {
      const filter = field(new Filter<T>());

      return this._push_filter("or", filter._filters);
    }

    if (value === undefined) {
      value = operator;
      operator = "=";
    }

    return this._or_where(field, OPERATORS[operator], value);
  }

  public whereLike<K extends keyof T>(field: K, value: string | RegExp): this;
  public whereLike(field: string, value: string | RegExp): this;
  public whereLike(field: string, value: string | RegExp) {
    if (!(value instanceof RegExp)) value = new RegExp(value, "i");

    return this._where(field, "like", value);
  }

  public whereNotLike<K extends keyof T>(field: K, value: string | RegExp): this;
  public whereNotLike(field: string, value: string | RegExp): this;
  public whereNotLike(field: string, value: string | RegExp) {
    if (!(value instanceof RegExp)) value = new RegExp(value, "i");

    return this._where(field, "nlike", value);
  }

  public whereIn(field: string, values: any[]): this;
  public whereIn<K extends keyof T>(field: K, values: Array<T[K]>): this;
  public whereIn(field: string, values: any[]) {
    return this._where(field, "in", values);
  }

  public whereNotIn(field: string, values: any[]): this;
  public whereNotIn<K extends keyof T>(field: K, values: Array<T[K]>): this;
  public whereNotIn(field: string, values: any[]) {
    return this._where(field, "nin", values);
  }

  public whereBetween<K extends keyof T>(field: K, start: T[K], end: T[K]): this;
  public whereBetween(field: string, start: any, end: any): this;
  public whereBetween(field: string, start: any, end: any) {
    return this._where(field, "bet", [start, end]);
  }

  public whereNotBetween<K extends keyof T>(field: K, start: T[K], end: T[K]): this;
  public whereNotBetween(field: string, start: any, end: any): this;
  public whereNotBetween(field: string, start: any, end: any) {
    return this._where(field, "nbe", [start, end]);
  }

  public whereNull<K extends keyof T>(field: T[K]): this;
  public whereNull(field: string): this;
  public whereNull(field: string) {
    return this._where(field, "exists", false);
  }

  public whereNotNull<K extends keyof T>(field: T[K]): this;
  public whereNotNull(field: string): this;
  public whereNotNull(field: string) {
    return this._where(field, "exists", true);
  }

  public whereHas(relation: string, query?: Filter.FilterQuery<T>) {
    if (query) {
      const filter = query(new Filter<T>())._filters;

      if (object.size(filter)) {
        return this._push_filter("and", {
          has: {
            filter,
            relation,
          },
        });
      }
    }

    return this._push_filter("and", {
      has: relation,
    });
  }
}

export default Filter;
