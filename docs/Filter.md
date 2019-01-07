# Filter <!-- omit in toc -->

```typescript
namespace Filter {
  export type Operator = "<" | "<=" | "=" | "<>" | ">=" | ">";

  export type FilterQuery<T extends object> = (q: Client.Omit<Filter<T>, "whereHas">) => Filter<T>;
}
```

## Table on Contents <!-- omit in toc -->

- [filter.where()](#filterwhere)
- [filter.orWhere()](#filterorwhere)
- [filter.whereLike()](#filterwherelike)
- [filter.whereNotLike()](#filterwherenotlike)
- [filter.whereIn()](#filterwherein)
- [filter.whereNotIn()](#filterwherenotin)
- [filter.whereBetween()](#filterwherebetween)
- [filter.whereNotBetween()](#filterwherenotbetween)
- [filter.whereNull()](#filterwherenull)
- [filter.whereNotNull()](#filterwherenotnull)
- [filter.whereHas()](#filterwherehas)

## filter.where()

```typescript
class Filter<T extends object> {
  public where(query: Filter.FilterQuery<T>): this;
  public where<K extends keyof T>(field: K, value: T[K]): this;
  public where(field: string, value: any): this;
  public where<K extends keyof T>(field: K, operator: Filter.Operator, value: T[K]): this;
  public where(field: string, operator: Filter.Operator, value: any): this;
}
```

## filter.orWhere()

```typescript
class Filter<T extends object> {
  public orWhere(query: Filter.FilterQuery<T>): this;
  public orWhere<K extends keyof T>(field: K, value: T[K]): this;
  public orWhere(field: string, value: any): this;
  public orWhere<K extends keyof T>(field: K, operator: Filter.Operator, value: T[K]): this;
  public orWhere(field: string, operator: Filter.Operator, value: any): this;
}
```

## filter.whereLike()

```typescript
class Filter<T extends object> {
  public whereLike<K extends keyof T>(field: K, value: string | RegExp): this;
  public whereLike(field: string, value: string | RegExp): this;
}
```

## filter.whereNotLike()

```typescript
class Filter<T extends object> {
  public whereNotLike<K extends keyof T>(field: K, value: string | RegExp): this;
  public whereNotLike(field: string, value: string | RegExp): this;
}
```

## filter.whereIn()

```typescript
class Filter<T extends object> {
  public whereIn(field: string, values: any[]): this;
  public whereIn<K extends keyof T>(field: K, values: Array<T[K]>): this;
}
```

## filter.whereNotIn()

```typescript
class Filter<T extends object> {
  public whereNotIn(field: string, values: any[]): this;
  public whereNotIn<K extends keyof T>(field: K, values: Array<T[K]>): this;
}
```

## filter.whereBetween()

```typescript
class Filter<T extends object> {
  public whereBetween<K extends keyof T>(field: K, start: T[K], end: T[K]): this;
  public whereBetween(field: string, start: any, end: any): this;
}
```

## filter.whereNotBetween()

```typescript
class Filter<T extends object> {
  public whereNotBetween<K extends keyof T>(field: K, start: T[K], end: T[K]): this;
  public whereNotBetween(field: string, start: any, end: any): this;
}
```

## filter.whereNull()

```typescript
class Filter<T extends object> {
  public whereNull<K extends keyof T>(field: T[K]): this;
  public whereNull(field: string): this;
}
```

## filter.whereNotNull()

```typescript
class Filter<T extends object> {
  public whereNotNull<K extends keyof T>(field: T[K]): this;
  public whereNotNull(field: string): this;
}
```

## filter.whereHas()

```typescript
class Filter<T extends object> {
  public whereHas(relation: string, query?: Filter.FilterQuery<T>): this;
}
```

Filter by having the given relation matching the query if given or having the relation at all
