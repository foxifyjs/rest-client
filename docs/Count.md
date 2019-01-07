# Count <!-- omit in toc -->

Extends [Filter](Filter.md)

## Table on Contents <!-- omit in toc -->

- [count.get()](#countget)

## count.get()

```typescript
class Count<T extends object> extends Filter<T> {
  public get(): Promise<number>;
  public get(callback: Client.Callback<number>): void;
}
```

Results the count of the queried resources
