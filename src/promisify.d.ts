declare module 'pify' {
  // copied from node type definitions
  export default function promisify<T1, TResult>(fn: (arg1: T1, callback: (err: NodeJS.ErrnoException, result: TResult) => void) => void): (arg1: T1) => Promise<TResult>;
  export default function promisify<T1>(fn: (arg1: T1, callback: (err: NodeJS.ErrnoException) => void) => void): (arg1: T1) => Promise<void>;
  export default function promisify<T1, T2, TResult>(fn: (arg1: T1, arg2: T2, callback: (err: NodeJS.ErrnoException, result: TResult) => void) => void): (arg1: T1, arg2: T2) => Promise<TResult>;
  export default function promisify<T1, T2>(fn: (arg1: T1, arg2: T2, callback: (err: NodeJS.ErrnoException) => void) => void): (arg1: T1, arg2: T2) => Promise<void>;
  export default function promisify<T1, T2, T3, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, callback: (err: NodeJS.ErrnoException, result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3) => Promise<TResult>;
  export default function promisify<T1, T2, T3>(fn: (arg1: T1, arg2: T2, arg3: T3, callback: (err: NodeJS.ErrnoException) => void) => void): (arg1: T1, arg2: T2, arg3: T3) => Promise<void>;
  export default function promisify<T1, T2, T3, T4, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: NodeJS.ErrnoException, result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<TResult>;
  export default function promisify<T1, T2, T3, T4>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, callback: (err: NodeJS.ErrnoException) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<void>;
  export default function promisify<T1, T2, T3, T4, T5, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: NodeJS.ErrnoException, result: TResult) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<TResult>;
  export default function promisify<T1, T2, T3, T4, T5>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, callback: (err: NodeJS.ErrnoException) => void) => void): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<void>;
  export default function promisify(fn: Function): Function;
}
