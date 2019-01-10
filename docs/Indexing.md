# Index <!-- omit in toc -->

```typescript
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
```

Extends [Filter](Filter.md)

## Table on Contents <!-- omit in toc -->

- [index.include()](#indexinclude)
- [index.sort()](#indexsort)
- [index.skip()](#indexskip)
- [index.limit()](#indexlimit)
- [index.get()](#indexget)

## index.include()

```typescript
class Index<T extends object> extends Filter<T> {
  public include(relations: string | string[]): this;
}
```

Includes the given relations

## index.sort()

```typescript
class Index<T extends object> extends Filter<T> {
  public sort(sort: string[]): this;
}
```

Sorts the resources

`+field` means ascending
`-field` means descending

## index.skip()

```typescript
class Index<T extends object> extends Filter<T> {
  public skip(skip: number): this;
}
```

Skips the given number (`skip` parameter) of resources

## index.limit()

```typescript
class Index<T extends object> extends Filter<T> {
  public limit(limit: number): this;
}
```

Skips the given number (`skip` parameter) of resources

## index.get()

```typescript
class Index<T extends object> extends Filter<T> {
  public get(): Promise<Index.Result<T, R>>;
  public get(callback: Client.Callback<Index.Result<T, R>>): void;
}
```

Results an object containing array of queried resources and a meta
