# Show <!-- omit in toc -->

## Table on Contents <!-- omit in toc -->

- [index.include()](#indexinclude)
- [show.get()](#showget)

## index.include()

```typescript
class Show<T extends object> {
  public include(relations: string | string[]): this;
}
```

Includes the given relations

## show.get()

```typescript
class Show<T extends object> {
  public get(id: string): Promise<T>;
  public get(id: string, callback: Client.Callback<T>): void;
}
```

Results an object which is the desired resource
