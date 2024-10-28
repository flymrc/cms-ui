// custom iterator
interface Set<T> {
    addEntities(entities: Iterable<T>);
    clearAddEnities(entities: Iterable<T>)
}

/**
 * return iterable execute item
 */
type IterableExecuteFunc<Source, Exec> = (item: Source, index: number) => Exec
/**
 * if return true, will call execute func and yield returnd.
 * else ignore this element.
 */
type IterableBeforeFunc<Source> = (item: Source, index: number) => boolean
declare function createIterable<Source, Exec>(source: Iterable<Source>, execute: IterableExecuteFunc<Source, Exec>, before?: IterableBeforeFunc<Source>): Iterable<Exec>;
declare function createEntityIdIterable<Source extends { id: number }>(source: Iterable<Source>): Iterable<number>

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;
type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;