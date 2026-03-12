
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Contest
 * 
 */
export type Contest = $Result.DefaultSelection<Prisma.$ContestPayload>
/**
 * Model Participation
 * 
 */
export type Participation = $Result.DefaultSelection<Prisma.$ParticipationPayload>
/**
 * Model CallLog
 * 
 */
export type CallLog = $Result.DefaultSelection<Prisma.$CallLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Students
 * const students = await prisma.student.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Students
   * const students = await prisma.student.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs>;

  /**
   * `prisma.contest`: Exposes CRUD operations for the **Contest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contests
    * const contests = await prisma.contest.findMany()
    * ```
    */
  get contest(): Prisma.ContestDelegate<ExtArgs>;

  /**
   * `prisma.participation`: Exposes CRUD operations for the **Participation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Participations
    * const participations = await prisma.participation.findMany()
    * ```
    */
  get participation(): Prisma.ParticipationDelegate<ExtArgs>;

  /**
   * `prisma.callLog`: Exposes CRUD operations for the **CallLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CallLogs
    * const callLogs = await prisma.callLog.findMany()
    * ```
    */
  get callLog(): Prisma.CallLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Student: 'Student',
    Contest: 'Contest',
    Participation: 'Participation',
    CallLog: 'CallLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "student" | "contest" | "participation" | "callLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Contest: {
        payload: Prisma.$ContestPayload<ExtArgs>
        fields: Prisma.ContestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestPayload>
          }
          findFirst: {
            args: Prisma.ContestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestPayload>
          }
          findMany: {
            args: Prisma.ContestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestPayload>[]
          }
          create: {
            args: Prisma.ContestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestPayload>
          }
          createMany: {
            args: Prisma.ContestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestPayload>[]
          }
          delete: {
            args: Prisma.ContestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestPayload>
          }
          update: {
            args: Prisma.ContestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestPayload>
          }
          deleteMany: {
            args: Prisma.ContestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContestPayload>
          }
          aggregate: {
            args: Prisma.ContestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContest>
          }
          groupBy: {
            args: Prisma.ContestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContestCountArgs<ExtArgs>
            result: $Utils.Optional<ContestCountAggregateOutputType> | number
          }
        }
      }
      Participation: {
        payload: Prisma.$ParticipationPayload<ExtArgs>
        fields: Prisma.ParticipationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParticipationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParticipationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          findFirst: {
            args: Prisma.ParticipationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParticipationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          findMany: {
            args: Prisma.ParticipationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>[]
          }
          create: {
            args: Prisma.ParticipationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          createMany: {
            args: Prisma.ParticipationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParticipationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>[]
          }
          delete: {
            args: Prisma.ParticipationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          update: {
            args: Prisma.ParticipationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          deleteMany: {
            args: Prisma.ParticipationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParticipationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ParticipationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipationPayload>
          }
          aggregate: {
            args: Prisma.ParticipationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParticipation>
          }
          groupBy: {
            args: Prisma.ParticipationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParticipationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParticipationCountArgs<ExtArgs>
            result: $Utils.Optional<ParticipationCountAggregateOutputType> | number
          }
        }
      }
      CallLog: {
        payload: Prisma.$CallLogPayload<ExtArgs>
        fields: Prisma.CallLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CallLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CallLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          findFirst: {
            args: Prisma.CallLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CallLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          findMany: {
            args: Prisma.CallLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>[]
          }
          create: {
            args: Prisma.CallLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          createMany: {
            args: Prisma.CallLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CallLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>[]
          }
          delete: {
            args: Prisma.CallLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          update: {
            args: Prisma.CallLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          deleteMany: {
            args: Prisma.CallLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CallLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CallLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          aggregate: {
            args: Prisma.CallLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCallLog>
          }
          groupBy: {
            args: Prisma.CallLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.CallLogCountArgs<ExtArgs>
            result: $Utils.Optional<CallLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    participations: number
    callLogs: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participations?: boolean | StudentCountOutputTypeCountParticipationsArgs
    callLogs?: boolean | StudentCountOutputTypeCountCallLogsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipationWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountCallLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallLogWhereInput
  }


  /**
   * Count Type ContestCountOutputType
   */

  export type ContestCountOutputType = {
    participations: number
    callLogs: number
  }

  export type ContestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participations?: boolean | ContestCountOutputTypeCountParticipationsArgs
    callLogs?: boolean | ContestCountOutputTypeCountCallLogsArgs
  }

  // Custom InputTypes
  /**
   * ContestCountOutputType without action
   */
  export type ContestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContestCountOutputType
     */
    select?: ContestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContestCountOutputType without action
   */
  export type ContestCountOutputTypeCountParticipationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipationWhereInput
  }

  /**
   * ContestCountOutputType without action
   */
  export type ContestCountOutputTypeCountCallLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    year: number | null
    cgpa: number | null
    hackathonCount: number | null
  }

  export type StudentSumAggregateOutputType = {
    year: number | null
    cgpa: number | null
    hackathonCount: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: string | null
    name: string | null
    rollNo: string | null
    year: number | null
    department: string | null
    section: string | null
    passwordHash: string | null
    phone: string | null
    email: string | null
    leetcodeId: string | null
    skillrackId: string | null
    createdAt: Date | null
    cgpa: number | null
    githubId: string | null
    hackathonCount: number | null
    semesterHistory: string | null
  }

  export type StudentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    rollNo: string | null
    year: number | null
    department: string | null
    section: string | null
    passwordHash: string | null
    phone: string | null
    email: string | null
    leetcodeId: string | null
    skillrackId: string | null
    createdAt: Date | null
    cgpa: number | null
    githubId: string | null
    hackathonCount: number | null
    semesterHistory: string | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    name: number
    rollNo: number
    year: number
    department: number
    section: number
    passwordHash: number
    phone: number
    email: number
    leetcodeId: number
    skillrackId: number
    createdAt: number
    cgpa: number
    githubId: number
    hackathonCount: number
    semesterHistory: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    year?: true
    cgpa?: true
    hackathonCount?: true
  }

  export type StudentSumAggregateInputType = {
    year?: true
    cgpa?: true
    hackathonCount?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    name?: true
    rollNo?: true
    year?: true
    department?: true
    section?: true
    passwordHash?: true
    phone?: true
    email?: true
    leetcodeId?: true
    skillrackId?: true
    createdAt?: true
    cgpa?: true
    githubId?: true
    hackathonCount?: true
    semesterHistory?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    name?: true
    rollNo?: true
    year?: true
    department?: true
    section?: true
    passwordHash?: true
    phone?: true
    email?: true
    leetcodeId?: true
    skillrackId?: true
    createdAt?: true
    cgpa?: true
    githubId?: true
    hackathonCount?: true
    semesterHistory?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    name?: true
    rollNo?: true
    year?: true
    department?: true
    section?: true
    passwordHash?: true
    phone?: true
    email?: true
    leetcodeId?: true
    skillrackId?: true
    createdAt?: true
    cgpa?: true
    githubId?: true
    hackathonCount?: true
    semesterHistory?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: string
    name: string
    rollNo: string
    year: number
    department: string
    section: string | null
    passwordHash: string
    phone: string
    email: string
    leetcodeId: string | null
    skillrackId: string | null
    createdAt: Date
    cgpa: number | null
    githubId: string | null
    hackathonCount: number | null
    semesterHistory: string | null
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rollNo?: boolean
    year?: boolean
    department?: boolean
    section?: boolean
    passwordHash?: boolean
    phone?: boolean
    email?: boolean
    leetcodeId?: boolean
    skillrackId?: boolean
    createdAt?: boolean
    cgpa?: boolean
    githubId?: boolean
    hackathonCount?: boolean
    semesterHistory?: boolean
    participations?: boolean | Student$participationsArgs<ExtArgs>
    callLogs?: boolean | Student$callLogsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rollNo?: boolean
    year?: boolean
    department?: boolean
    section?: boolean
    passwordHash?: boolean
    phone?: boolean
    email?: boolean
    leetcodeId?: boolean
    skillrackId?: boolean
    createdAt?: boolean
    cgpa?: boolean
    githubId?: boolean
    hackathonCount?: boolean
    semesterHistory?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    name?: boolean
    rollNo?: boolean
    year?: boolean
    department?: boolean
    section?: boolean
    passwordHash?: boolean
    phone?: boolean
    email?: boolean
    leetcodeId?: boolean
    skillrackId?: boolean
    createdAt?: boolean
    cgpa?: boolean
    githubId?: boolean
    hackathonCount?: boolean
    semesterHistory?: boolean
  }

  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participations?: boolean | Student$participationsArgs<ExtArgs>
    callLogs?: boolean | Student$callLogsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      participations: Prisma.$ParticipationPayload<ExtArgs>[]
      callLogs: Prisma.$CallLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      rollNo: string
      year: number
      department: string
      section: string | null
      passwordHash: string
      phone: string
      email: string
      leetcodeId: string | null
      skillrackId: string | null
      createdAt: Date
      cgpa: number | null
      githubId: string | null
      hackathonCount: number | null
      semesterHistory: string | null
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participations<T extends Student$participationsArgs<ExtArgs> = {}>(args?: Subset<T, Student$participationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findMany"> | Null>
    callLogs<T extends Student$callLogsArgs<ExtArgs> = {}>(args?: Subset<T, Student$callLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */ 
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'String'>
    readonly name: FieldRef<"Student", 'String'>
    readonly rollNo: FieldRef<"Student", 'String'>
    readonly year: FieldRef<"Student", 'Int'>
    readonly department: FieldRef<"Student", 'String'>
    readonly section: FieldRef<"Student", 'String'>
    readonly passwordHash: FieldRef<"Student", 'String'>
    readonly phone: FieldRef<"Student", 'String'>
    readonly email: FieldRef<"Student", 'String'>
    readonly leetcodeId: FieldRef<"Student", 'String'>
    readonly skillrackId: FieldRef<"Student", 'String'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly cgpa: FieldRef<"Student", 'Float'>
    readonly githubId: FieldRef<"Student", 'String'>
    readonly hackathonCount: FieldRef<"Student", 'Int'>
    readonly semesterHistory: FieldRef<"Student", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
  }

  /**
   * Student.participations
   */
  export type Student$participationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    where?: ParticipationWhereInput
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    cursor?: ParticipationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParticipationScalarFieldEnum | ParticipationScalarFieldEnum[]
  }

  /**
   * Student.callLogs
   */
  export type Student$callLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    where?: CallLogWhereInput
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    cursor?: CallLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Contest
   */

  export type AggregateContest = {
    _count: ContestCountAggregateOutputType | null
    _avg: ContestAvgAggregateOutputType | null
    _sum: ContestSumAggregateOutputType | null
    _min: ContestMinAggregateOutputType | null
    _max: ContestMaxAggregateOutputType | null
  }

  export type ContestAvgAggregateOutputType = {
    durationMins: number | null
  }

  export type ContestSumAggregateOutputType = {
    durationMins: number | null
  }

  export type ContestMinAggregateOutputType = {
    id: string | null
    name: string | null
    platform: string | null
    externalId: string | null
    scheduledAt: Date | null
    durationMins: number | null
    cronJobId: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ContestMaxAggregateOutputType = {
    id: string | null
    name: string | null
    platform: string | null
    externalId: string | null
    scheduledAt: Date | null
    durationMins: number | null
    cronJobId: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ContestCountAggregateOutputType = {
    id: number
    name: number
    platform: number
    externalId: number
    scheduledAt: number
    durationMins: number
    cronJobId: number
    status: number
    createdAt: number
    _all: number
  }


  export type ContestAvgAggregateInputType = {
    durationMins?: true
  }

  export type ContestSumAggregateInputType = {
    durationMins?: true
  }

  export type ContestMinAggregateInputType = {
    id?: true
    name?: true
    platform?: true
    externalId?: true
    scheduledAt?: true
    durationMins?: true
    cronJobId?: true
    status?: true
    createdAt?: true
  }

  export type ContestMaxAggregateInputType = {
    id?: true
    name?: true
    platform?: true
    externalId?: true
    scheduledAt?: true
    durationMins?: true
    cronJobId?: true
    status?: true
    createdAt?: true
  }

  export type ContestCountAggregateInputType = {
    id?: true
    name?: true
    platform?: true
    externalId?: true
    scheduledAt?: true
    durationMins?: true
    cronJobId?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ContestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contest to aggregate.
     */
    where?: ContestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contests to fetch.
     */
    orderBy?: ContestOrderByWithRelationInput | ContestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contests
    **/
    _count?: true | ContestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContestMaxAggregateInputType
  }

  export type GetContestAggregateType<T extends ContestAggregateArgs> = {
        [P in keyof T & keyof AggregateContest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContest[P]>
      : GetScalarType<T[P], AggregateContest[P]>
  }




  export type ContestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContestWhereInput
    orderBy?: ContestOrderByWithAggregationInput | ContestOrderByWithAggregationInput[]
    by: ContestScalarFieldEnum[] | ContestScalarFieldEnum
    having?: ContestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContestCountAggregateInputType | true
    _avg?: ContestAvgAggregateInputType
    _sum?: ContestSumAggregateInputType
    _min?: ContestMinAggregateInputType
    _max?: ContestMaxAggregateInputType
  }

  export type ContestGroupByOutputType = {
    id: string
    name: string
    platform: string
    externalId: string
    scheduledAt: Date
    durationMins: number
    cronJobId: string | null
    status: string
    createdAt: Date
    _count: ContestCountAggregateOutputType | null
    _avg: ContestAvgAggregateOutputType | null
    _sum: ContestSumAggregateOutputType | null
    _min: ContestMinAggregateOutputType | null
    _max: ContestMaxAggregateOutputType | null
  }

  type GetContestGroupByPayload<T extends ContestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContestGroupByOutputType[P]>
            : GetScalarType<T[P], ContestGroupByOutputType[P]>
        }
      >
    >


  export type ContestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    platform?: boolean
    externalId?: boolean
    scheduledAt?: boolean
    durationMins?: boolean
    cronJobId?: boolean
    status?: boolean
    createdAt?: boolean
    participations?: boolean | Contest$participationsArgs<ExtArgs>
    callLogs?: boolean | Contest$callLogsArgs<ExtArgs>
    _count?: boolean | ContestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contest"]>

  export type ContestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    platform?: boolean
    externalId?: boolean
    scheduledAt?: boolean
    durationMins?: boolean
    cronJobId?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contest"]>

  export type ContestSelectScalar = {
    id?: boolean
    name?: boolean
    platform?: boolean
    externalId?: boolean
    scheduledAt?: boolean
    durationMins?: boolean
    cronJobId?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ContestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participations?: boolean | Contest$participationsArgs<ExtArgs>
    callLogs?: boolean | Contest$callLogsArgs<ExtArgs>
    _count?: boolean | ContestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ContestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contest"
    objects: {
      participations: Prisma.$ParticipationPayload<ExtArgs>[]
      callLogs: Prisma.$CallLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      platform: string
      externalId: string
      scheduledAt: Date
      durationMins: number
      cronJobId: string | null
      status: string
      createdAt: Date
    }, ExtArgs["result"]["contest"]>
    composites: {}
  }

  type ContestGetPayload<S extends boolean | null | undefined | ContestDefaultArgs> = $Result.GetResult<Prisma.$ContestPayload, S>

  type ContestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContestCountAggregateInputType | true
    }

  export interface ContestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contest'], meta: { name: 'Contest' } }
    /**
     * Find zero or one Contest that matches the filter.
     * @param {ContestFindUniqueArgs} args - Arguments to find a Contest
     * @example
     * // Get one Contest
     * const contest = await prisma.contest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContestFindUniqueArgs>(args: SelectSubset<T, ContestFindUniqueArgs<ExtArgs>>): Prisma__ContestClient<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Contest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContestFindUniqueOrThrowArgs} args - Arguments to find a Contest
     * @example
     * // Get one Contest
     * const contest = await prisma.contest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContestFindUniqueOrThrowArgs>(args: SelectSubset<T, ContestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContestClient<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Contest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestFindFirstArgs} args - Arguments to find a Contest
     * @example
     * // Get one Contest
     * const contest = await prisma.contest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContestFindFirstArgs>(args?: SelectSubset<T, ContestFindFirstArgs<ExtArgs>>): Prisma__ContestClient<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Contest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestFindFirstOrThrowArgs} args - Arguments to find a Contest
     * @example
     * // Get one Contest
     * const contest = await prisma.contest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContestFindFirstOrThrowArgs>(args?: SelectSubset<T, ContestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContestClient<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Contests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contests
     * const contests = await prisma.contest.findMany()
     * 
     * // Get first 10 Contests
     * const contests = await prisma.contest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contestWithIdOnly = await prisma.contest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContestFindManyArgs>(args?: SelectSubset<T, ContestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Contest.
     * @param {ContestCreateArgs} args - Arguments to create a Contest.
     * @example
     * // Create one Contest
     * const Contest = await prisma.contest.create({
     *   data: {
     *     // ... data to create a Contest
     *   }
     * })
     * 
     */
    create<T extends ContestCreateArgs>(args: SelectSubset<T, ContestCreateArgs<ExtArgs>>): Prisma__ContestClient<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Contests.
     * @param {ContestCreateManyArgs} args - Arguments to create many Contests.
     * @example
     * // Create many Contests
     * const contest = await prisma.contest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContestCreateManyArgs>(args?: SelectSubset<T, ContestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contests and returns the data saved in the database.
     * @param {ContestCreateManyAndReturnArgs} args - Arguments to create many Contests.
     * @example
     * // Create many Contests
     * const contest = await prisma.contest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contests and only return the `id`
     * const contestWithIdOnly = await prisma.contest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContestCreateManyAndReturnArgs>(args?: SelectSubset<T, ContestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Contest.
     * @param {ContestDeleteArgs} args - Arguments to delete one Contest.
     * @example
     * // Delete one Contest
     * const Contest = await prisma.contest.delete({
     *   where: {
     *     // ... filter to delete one Contest
     *   }
     * })
     * 
     */
    delete<T extends ContestDeleteArgs>(args: SelectSubset<T, ContestDeleteArgs<ExtArgs>>): Prisma__ContestClient<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Contest.
     * @param {ContestUpdateArgs} args - Arguments to update one Contest.
     * @example
     * // Update one Contest
     * const contest = await prisma.contest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContestUpdateArgs>(args: SelectSubset<T, ContestUpdateArgs<ExtArgs>>): Prisma__ContestClient<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Contests.
     * @param {ContestDeleteManyArgs} args - Arguments to filter Contests to delete.
     * @example
     * // Delete a few Contests
     * const { count } = await prisma.contest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContestDeleteManyArgs>(args?: SelectSubset<T, ContestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contests
     * const contest = await prisma.contest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContestUpdateManyArgs>(args: SelectSubset<T, ContestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Contest.
     * @param {ContestUpsertArgs} args - Arguments to update or create a Contest.
     * @example
     * // Update or create a Contest
     * const contest = await prisma.contest.upsert({
     *   create: {
     *     // ... data to create a Contest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contest we want to update
     *   }
     * })
     */
    upsert<T extends ContestUpsertArgs>(args: SelectSubset<T, ContestUpsertArgs<ExtArgs>>): Prisma__ContestClient<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Contests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestCountArgs} args - Arguments to filter Contests to count.
     * @example
     * // Count the number of Contests
     * const count = await prisma.contest.count({
     *   where: {
     *     // ... the filter for the Contests we want to count
     *   }
     * })
    **/
    count<T extends ContestCountArgs>(
      args?: Subset<T, ContestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContestAggregateArgs>(args: Subset<T, ContestAggregateArgs>): Prisma.PrismaPromise<GetContestAggregateType<T>>

    /**
     * Group by Contest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContestGroupByArgs['orderBy'] }
        : { orderBy?: ContestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contest model
   */
  readonly fields: ContestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participations<T extends Contest$participationsArgs<ExtArgs> = {}>(args?: Subset<T, Contest$participationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findMany"> | Null>
    callLogs<T extends Contest$callLogsArgs<ExtArgs> = {}>(args?: Subset<T, Contest$callLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contest model
   */ 
  interface ContestFieldRefs {
    readonly id: FieldRef<"Contest", 'String'>
    readonly name: FieldRef<"Contest", 'String'>
    readonly platform: FieldRef<"Contest", 'String'>
    readonly externalId: FieldRef<"Contest", 'String'>
    readonly scheduledAt: FieldRef<"Contest", 'DateTime'>
    readonly durationMins: FieldRef<"Contest", 'Int'>
    readonly cronJobId: FieldRef<"Contest", 'String'>
    readonly status: FieldRef<"Contest", 'String'>
    readonly createdAt: FieldRef<"Contest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Contest findUnique
   */
  export type ContestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contest
     */
    select?: ContestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestInclude<ExtArgs> | null
    /**
     * Filter, which Contest to fetch.
     */
    where: ContestWhereUniqueInput
  }

  /**
   * Contest findUniqueOrThrow
   */
  export type ContestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contest
     */
    select?: ContestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestInclude<ExtArgs> | null
    /**
     * Filter, which Contest to fetch.
     */
    where: ContestWhereUniqueInput
  }

  /**
   * Contest findFirst
   */
  export type ContestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contest
     */
    select?: ContestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestInclude<ExtArgs> | null
    /**
     * Filter, which Contest to fetch.
     */
    where?: ContestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contests to fetch.
     */
    orderBy?: ContestOrderByWithRelationInput | ContestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contests.
     */
    cursor?: ContestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contests.
     */
    distinct?: ContestScalarFieldEnum | ContestScalarFieldEnum[]
  }

  /**
   * Contest findFirstOrThrow
   */
  export type ContestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contest
     */
    select?: ContestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestInclude<ExtArgs> | null
    /**
     * Filter, which Contest to fetch.
     */
    where?: ContestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contests to fetch.
     */
    orderBy?: ContestOrderByWithRelationInput | ContestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contests.
     */
    cursor?: ContestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contests.
     */
    distinct?: ContestScalarFieldEnum | ContestScalarFieldEnum[]
  }

  /**
   * Contest findMany
   */
  export type ContestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contest
     */
    select?: ContestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestInclude<ExtArgs> | null
    /**
     * Filter, which Contests to fetch.
     */
    where?: ContestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contests to fetch.
     */
    orderBy?: ContestOrderByWithRelationInput | ContestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contests.
     */
    cursor?: ContestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contests.
     */
    skip?: number
    distinct?: ContestScalarFieldEnum | ContestScalarFieldEnum[]
  }

  /**
   * Contest create
   */
  export type ContestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contest
     */
    select?: ContestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestInclude<ExtArgs> | null
    /**
     * The data needed to create a Contest.
     */
    data: XOR<ContestCreateInput, ContestUncheckedCreateInput>
  }

  /**
   * Contest createMany
   */
  export type ContestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contests.
     */
    data: ContestCreateManyInput | ContestCreateManyInput[]
  }

  /**
   * Contest createManyAndReturn
   */
  export type ContestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contest
     */
    select?: ContestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Contests.
     */
    data: ContestCreateManyInput | ContestCreateManyInput[]
  }

  /**
   * Contest update
   */
  export type ContestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contest
     */
    select?: ContestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestInclude<ExtArgs> | null
    /**
     * The data needed to update a Contest.
     */
    data: XOR<ContestUpdateInput, ContestUncheckedUpdateInput>
    /**
     * Choose, which Contest to update.
     */
    where: ContestWhereUniqueInput
  }

  /**
   * Contest updateMany
   */
  export type ContestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contests.
     */
    data: XOR<ContestUpdateManyMutationInput, ContestUncheckedUpdateManyInput>
    /**
     * Filter which Contests to update
     */
    where?: ContestWhereInput
  }

  /**
   * Contest upsert
   */
  export type ContestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contest
     */
    select?: ContestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestInclude<ExtArgs> | null
    /**
     * The filter to search for the Contest to update in case it exists.
     */
    where: ContestWhereUniqueInput
    /**
     * In case the Contest found by the `where` argument doesn't exist, create a new Contest with this data.
     */
    create: XOR<ContestCreateInput, ContestUncheckedCreateInput>
    /**
     * In case the Contest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContestUpdateInput, ContestUncheckedUpdateInput>
  }

  /**
   * Contest delete
   */
  export type ContestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contest
     */
    select?: ContestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestInclude<ExtArgs> | null
    /**
     * Filter which Contest to delete.
     */
    where: ContestWhereUniqueInput
  }

  /**
   * Contest deleteMany
   */
  export type ContestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contests to delete
     */
    where?: ContestWhereInput
  }

  /**
   * Contest.participations
   */
  export type Contest$participationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    where?: ParticipationWhereInput
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    cursor?: ParticipationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParticipationScalarFieldEnum | ParticipationScalarFieldEnum[]
  }

  /**
   * Contest.callLogs
   */
  export type Contest$callLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    where?: CallLogWhereInput
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    cursor?: CallLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * Contest without action
   */
  export type ContestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contest
     */
    select?: ContestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContestInclude<ExtArgs> | null
  }


  /**
   * Model Participation
   */

  export type AggregateParticipation = {
    _count: ParticipationCountAggregateOutputType | null
    _min: ParticipationMinAggregateOutputType | null
    _max: ParticipationMaxAggregateOutputType | null
  }

  export type ParticipationMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    contestId: string | null
    status: string | null
    joinedAt: Date | null
    updatedAt: Date | null
  }

  export type ParticipationMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    contestId: string | null
    status: string | null
    joinedAt: Date | null
    updatedAt: Date | null
  }

  export type ParticipationCountAggregateOutputType = {
    id: number
    studentId: number
    contestId: number
    status: number
    joinedAt: number
    updatedAt: number
    _all: number
  }


  export type ParticipationMinAggregateInputType = {
    id?: true
    studentId?: true
    contestId?: true
    status?: true
    joinedAt?: true
    updatedAt?: true
  }

  export type ParticipationMaxAggregateInputType = {
    id?: true
    studentId?: true
    contestId?: true
    status?: true
    joinedAt?: true
    updatedAt?: true
  }

  export type ParticipationCountAggregateInputType = {
    id?: true
    studentId?: true
    contestId?: true
    status?: true
    joinedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ParticipationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Participation to aggregate.
     */
    where?: ParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participations to fetch.
     */
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Participations
    **/
    _count?: true | ParticipationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParticipationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParticipationMaxAggregateInputType
  }

  export type GetParticipationAggregateType<T extends ParticipationAggregateArgs> = {
        [P in keyof T & keyof AggregateParticipation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParticipation[P]>
      : GetScalarType<T[P], AggregateParticipation[P]>
  }




  export type ParticipationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipationWhereInput
    orderBy?: ParticipationOrderByWithAggregationInput | ParticipationOrderByWithAggregationInput[]
    by: ParticipationScalarFieldEnum[] | ParticipationScalarFieldEnum
    having?: ParticipationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParticipationCountAggregateInputType | true
    _min?: ParticipationMinAggregateInputType
    _max?: ParticipationMaxAggregateInputType
  }

  export type ParticipationGroupByOutputType = {
    id: string
    studentId: string
    contestId: string
    status: string
    joinedAt: Date | null
    updatedAt: Date
    _count: ParticipationCountAggregateOutputType | null
    _min: ParticipationMinAggregateOutputType | null
    _max: ParticipationMaxAggregateOutputType | null
  }

  type GetParticipationGroupByPayload<T extends ParticipationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParticipationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParticipationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParticipationGroupByOutputType[P]>
            : GetScalarType<T[P], ParticipationGroupByOutputType[P]>
        }
      >
    >


  export type ParticipationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    contestId?: boolean
    status?: boolean
    joinedAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    contest?: boolean | ContestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participation"]>

  export type ParticipationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    contestId?: boolean
    status?: boolean
    joinedAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    contest?: boolean | ContestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participation"]>

  export type ParticipationSelectScalar = {
    id?: boolean
    studentId?: boolean
    contestId?: boolean
    status?: boolean
    joinedAt?: boolean
    updatedAt?: boolean
  }

  export type ParticipationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    contest?: boolean | ContestDefaultArgs<ExtArgs>
  }
  export type ParticipationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    contest?: boolean | ContestDefaultArgs<ExtArgs>
  }

  export type $ParticipationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Participation"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      contest: Prisma.$ContestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      contestId: string
      status: string
      joinedAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["participation"]>
    composites: {}
  }

  type ParticipationGetPayload<S extends boolean | null | undefined | ParticipationDefaultArgs> = $Result.GetResult<Prisma.$ParticipationPayload, S>

  type ParticipationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ParticipationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ParticipationCountAggregateInputType | true
    }

  export interface ParticipationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Participation'], meta: { name: 'Participation' } }
    /**
     * Find zero or one Participation that matches the filter.
     * @param {ParticipationFindUniqueArgs} args - Arguments to find a Participation
     * @example
     * // Get one Participation
     * const participation = await prisma.participation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParticipationFindUniqueArgs>(args: SelectSubset<T, ParticipationFindUniqueArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Participation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ParticipationFindUniqueOrThrowArgs} args - Arguments to find a Participation
     * @example
     * // Get one Participation
     * const participation = await prisma.participation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParticipationFindUniqueOrThrowArgs>(args: SelectSubset<T, ParticipationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Participation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationFindFirstArgs} args - Arguments to find a Participation
     * @example
     * // Get one Participation
     * const participation = await prisma.participation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParticipationFindFirstArgs>(args?: SelectSubset<T, ParticipationFindFirstArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Participation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationFindFirstOrThrowArgs} args - Arguments to find a Participation
     * @example
     * // Get one Participation
     * const participation = await prisma.participation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParticipationFindFirstOrThrowArgs>(args?: SelectSubset<T, ParticipationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Participations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Participations
     * const participations = await prisma.participation.findMany()
     * 
     * // Get first 10 Participations
     * const participations = await prisma.participation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const participationWithIdOnly = await prisma.participation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParticipationFindManyArgs>(args?: SelectSubset<T, ParticipationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Participation.
     * @param {ParticipationCreateArgs} args - Arguments to create a Participation.
     * @example
     * // Create one Participation
     * const Participation = await prisma.participation.create({
     *   data: {
     *     // ... data to create a Participation
     *   }
     * })
     * 
     */
    create<T extends ParticipationCreateArgs>(args: SelectSubset<T, ParticipationCreateArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Participations.
     * @param {ParticipationCreateManyArgs} args - Arguments to create many Participations.
     * @example
     * // Create many Participations
     * const participation = await prisma.participation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParticipationCreateManyArgs>(args?: SelectSubset<T, ParticipationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Participations and returns the data saved in the database.
     * @param {ParticipationCreateManyAndReturnArgs} args - Arguments to create many Participations.
     * @example
     * // Create many Participations
     * const participation = await prisma.participation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Participations and only return the `id`
     * const participationWithIdOnly = await prisma.participation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParticipationCreateManyAndReturnArgs>(args?: SelectSubset<T, ParticipationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Participation.
     * @param {ParticipationDeleteArgs} args - Arguments to delete one Participation.
     * @example
     * // Delete one Participation
     * const Participation = await prisma.participation.delete({
     *   where: {
     *     // ... filter to delete one Participation
     *   }
     * })
     * 
     */
    delete<T extends ParticipationDeleteArgs>(args: SelectSubset<T, ParticipationDeleteArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Participation.
     * @param {ParticipationUpdateArgs} args - Arguments to update one Participation.
     * @example
     * // Update one Participation
     * const participation = await prisma.participation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParticipationUpdateArgs>(args: SelectSubset<T, ParticipationUpdateArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Participations.
     * @param {ParticipationDeleteManyArgs} args - Arguments to filter Participations to delete.
     * @example
     * // Delete a few Participations
     * const { count } = await prisma.participation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParticipationDeleteManyArgs>(args?: SelectSubset<T, ParticipationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Participations
     * const participation = await prisma.participation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParticipationUpdateManyArgs>(args: SelectSubset<T, ParticipationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Participation.
     * @param {ParticipationUpsertArgs} args - Arguments to update or create a Participation.
     * @example
     * // Update or create a Participation
     * const participation = await prisma.participation.upsert({
     *   create: {
     *     // ... data to create a Participation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Participation we want to update
     *   }
     * })
     */
    upsert<T extends ParticipationUpsertArgs>(args: SelectSubset<T, ParticipationUpsertArgs<ExtArgs>>): Prisma__ParticipationClient<$Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Participations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationCountArgs} args - Arguments to filter Participations to count.
     * @example
     * // Count the number of Participations
     * const count = await prisma.participation.count({
     *   where: {
     *     // ... the filter for the Participations we want to count
     *   }
     * })
    **/
    count<T extends ParticipationCountArgs>(
      args?: Subset<T, ParticipationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParticipationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Participation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParticipationAggregateArgs>(args: Subset<T, ParticipationAggregateArgs>): Prisma.PrismaPromise<GetParticipationAggregateType<T>>

    /**
     * Group by Participation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParticipationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParticipationGroupByArgs['orderBy'] }
        : { orderBy?: ParticipationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParticipationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Participation model
   */
  readonly fields: ParticipationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Participation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParticipationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    contest<T extends ContestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContestDefaultArgs<ExtArgs>>): Prisma__ContestClient<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Participation model
   */ 
  interface ParticipationFieldRefs {
    readonly id: FieldRef<"Participation", 'String'>
    readonly studentId: FieldRef<"Participation", 'String'>
    readonly contestId: FieldRef<"Participation", 'String'>
    readonly status: FieldRef<"Participation", 'String'>
    readonly joinedAt: FieldRef<"Participation", 'DateTime'>
    readonly updatedAt: FieldRef<"Participation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Participation findUnique
   */
  export type ParticipationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter, which Participation to fetch.
     */
    where: ParticipationWhereUniqueInput
  }

  /**
   * Participation findUniqueOrThrow
   */
  export type ParticipationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter, which Participation to fetch.
     */
    where: ParticipationWhereUniqueInput
  }

  /**
   * Participation findFirst
   */
  export type ParticipationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter, which Participation to fetch.
     */
    where?: ParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participations to fetch.
     */
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Participations.
     */
    cursor?: ParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Participations.
     */
    distinct?: ParticipationScalarFieldEnum | ParticipationScalarFieldEnum[]
  }

  /**
   * Participation findFirstOrThrow
   */
  export type ParticipationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter, which Participation to fetch.
     */
    where?: ParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participations to fetch.
     */
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Participations.
     */
    cursor?: ParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Participations.
     */
    distinct?: ParticipationScalarFieldEnum | ParticipationScalarFieldEnum[]
  }

  /**
   * Participation findMany
   */
  export type ParticipationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter, which Participations to fetch.
     */
    where?: ParticipationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participations to fetch.
     */
    orderBy?: ParticipationOrderByWithRelationInput | ParticipationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Participations.
     */
    cursor?: ParticipationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participations.
     */
    skip?: number
    distinct?: ParticipationScalarFieldEnum | ParticipationScalarFieldEnum[]
  }

  /**
   * Participation create
   */
  export type ParticipationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * The data needed to create a Participation.
     */
    data: XOR<ParticipationCreateInput, ParticipationUncheckedCreateInput>
  }

  /**
   * Participation createMany
   */
  export type ParticipationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Participations.
     */
    data: ParticipationCreateManyInput | ParticipationCreateManyInput[]
  }

  /**
   * Participation createManyAndReturn
   */
  export type ParticipationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Participations.
     */
    data: ParticipationCreateManyInput | ParticipationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Participation update
   */
  export type ParticipationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * The data needed to update a Participation.
     */
    data: XOR<ParticipationUpdateInput, ParticipationUncheckedUpdateInput>
    /**
     * Choose, which Participation to update.
     */
    where: ParticipationWhereUniqueInput
  }

  /**
   * Participation updateMany
   */
  export type ParticipationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Participations.
     */
    data: XOR<ParticipationUpdateManyMutationInput, ParticipationUncheckedUpdateManyInput>
    /**
     * Filter which Participations to update
     */
    where?: ParticipationWhereInput
  }

  /**
   * Participation upsert
   */
  export type ParticipationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * The filter to search for the Participation to update in case it exists.
     */
    where: ParticipationWhereUniqueInput
    /**
     * In case the Participation found by the `where` argument doesn't exist, create a new Participation with this data.
     */
    create: XOR<ParticipationCreateInput, ParticipationUncheckedCreateInput>
    /**
     * In case the Participation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParticipationUpdateInput, ParticipationUncheckedUpdateInput>
  }

  /**
   * Participation delete
   */
  export type ParticipationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
    /**
     * Filter which Participation to delete.
     */
    where: ParticipationWhereUniqueInput
  }

  /**
   * Participation deleteMany
   */
  export type ParticipationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Participations to delete
     */
    where?: ParticipationWhereInput
  }

  /**
   * Participation without action
   */
  export type ParticipationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participation
     */
    select?: ParticipationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipationInclude<ExtArgs> | null
  }


  /**
   * Model CallLog
   */

  export type AggregateCallLog = {
    _count: CallLogCountAggregateOutputType | null
    _min: CallLogMinAggregateOutputType | null
    _max: CallLogMaxAggregateOutputType | null
  }

  export type CallLogMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    contestId: string | null
    vapiCallId: string | null
    callStatus: string | null
    whatsappSent: boolean | null
    whatsappStatus: string | null
    initiatedAt: Date | null
    answeredAt: Date | null
    completedAt: Date | null
    triggeredBy: string | null
    errorMessage: string | null
  }

  export type CallLogMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    contestId: string | null
    vapiCallId: string | null
    callStatus: string | null
    whatsappSent: boolean | null
    whatsappStatus: string | null
    initiatedAt: Date | null
    answeredAt: Date | null
    completedAt: Date | null
    triggeredBy: string | null
    errorMessage: string | null
  }

  export type CallLogCountAggregateOutputType = {
    id: number
    studentId: number
    contestId: number
    vapiCallId: number
    callStatus: number
    whatsappSent: number
    whatsappStatus: number
    initiatedAt: number
    answeredAt: number
    completedAt: number
    triggeredBy: number
    errorMessage: number
    _all: number
  }


  export type CallLogMinAggregateInputType = {
    id?: true
    studentId?: true
    contestId?: true
    vapiCallId?: true
    callStatus?: true
    whatsappSent?: true
    whatsappStatus?: true
    initiatedAt?: true
    answeredAt?: true
    completedAt?: true
    triggeredBy?: true
    errorMessage?: true
  }

  export type CallLogMaxAggregateInputType = {
    id?: true
    studentId?: true
    contestId?: true
    vapiCallId?: true
    callStatus?: true
    whatsappSent?: true
    whatsappStatus?: true
    initiatedAt?: true
    answeredAt?: true
    completedAt?: true
    triggeredBy?: true
    errorMessage?: true
  }

  export type CallLogCountAggregateInputType = {
    id?: true
    studentId?: true
    contestId?: true
    vapiCallId?: true
    callStatus?: true
    whatsappSent?: true
    whatsappStatus?: true
    initiatedAt?: true
    answeredAt?: true
    completedAt?: true
    triggeredBy?: true
    errorMessage?: true
    _all?: true
  }

  export type CallLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallLog to aggregate.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CallLogs
    **/
    _count?: true | CallLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallLogMaxAggregateInputType
  }

  export type GetCallLogAggregateType<T extends CallLogAggregateArgs> = {
        [P in keyof T & keyof AggregateCallLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCallLog[P]>
      : GetScalarType<T[P], AggregateCallLog[P]>
  }




  export type CallLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallLogWhereInput
    orderBy?: CallLogOrderByWithAggregationInput | CallLogOrderByWithAggregationInput[]
    by: CallLogScalarFieldEnum[] | CallLogScalarFieldEnum
    having?: CallLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallLogCountAggregateInputType | true
    _min?: CallLogMinAggregateInputType
    _max?: CallLogMaxAggregateInputType
  }

  export type CallLogGroupByOutputType = {
    id: string
    studentId: string
    contestId: string
    vapiCallId: string | null
    callStatus: string
    whatsappSent: boolean
    whatsappStatus: string | null
    initiatedAt: Date
    answeredAt: Date | null
    completedAt: Date | null
    triggeredBy: string
    errorMessage: string | null
    _count: CallLogCountAggregateOutputType | null
    _min: CallLogMinAggregateOutputType | null
    _max: CallLogMaxAggregateOutputType | null
  }

  type GetCallLogGroupByPayload<T extends CallLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallLogGroupByOutputType[P]>
            : GetScalarType<T[P], CallLogGroupByOutputType[P]>
        }
      >
    >


  export type CallLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    contestId?: boolean
    vapiCallId?: boolean
    callStatus?: boolean
    whatsappSent?: boolean
    whatsappStatus?: boolean
    initiatedAt?: boolean
    answeredAt?: boolean
    completedAt?: boolean
    triggeredBy?: boolean
    errorMessage?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    contest?: boolean | ContestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callLog"]>

  export type CallLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    contestId?: boolean
    vapiCallId?: boolean
    callStatus?: boolean
    whatsappSent?: boolean
    whatsappStatus?: boolean
    initiatedAt?: boolean
    answeredAt?: boolean
    completedAt?: boolean
    triggeredBy?: boolean
    errorMessage?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    contest?: boolean | ContestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callLog"]>

  export type CallLogSelectScalar = {
    id?: boolean
    studentId?: boolean
    contestId?: boolean
    vapiCallId?: boolean
    callStatus?: boolean
    whatsappSent?: boolean
    whatsappStatus?: boolean
    initiatedAt?: boolean
    answeredAt?: boolean
    completedAt?: boolean
    triggeredBy?: boolean
    errorMessage?: boolean
  }

  export type CallLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    contest?: boolean | ContestDefaultArgs<ExtArgs>
  }
  export type CallLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    contest?: boolean | ContestDefaultArgs<ExtArgs>
  }

  export type $CallLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CallLog"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      contest: Prisma.$ContestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      contestId: string
      vapiCallId: string | null
      callStatus: string
      whatsappSent: boolean
      whatsappStatus: string | null
      initiatedAt: Date
      answeredAt: Date | null
      completedAt: Date | null
      triggeredBy: string
      errorMessage: string | null
    }, ExtArgs["result"]["callLog"]>
    composites: {}
  }

  type CallLogGetPayload<S extends boolean | null | undefined | CallLogDefaultArgs> = $Result.GetResult<Prisma.$CallLogPayload, S>

  type CallLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CallLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CallLogCountAggregateInputType | true
    }

  export interface CallLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CallLog'], meta: { name: 'CallLog' } }
    /**
     * Find zero or one CallLog that matches the filter.
     * @param {CallLogFindUniqueArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallLogFindUniqueArgs>(args: SelectSubset<T, CallLogFindUniqueArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CallLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CallLogFindUniqueOrThrowArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallLogFindUniqueOrThrowArgs>(args: SelectSubset<T, CallLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CallLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogFindFirstArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallLogFindFirstArgs>(args?: SelectSubset<T, CallLogFindFirstArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CallLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogFindFirstOrThrowArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallLogFindFirstOrThrowArgs>(args?: SelectSubset<T, CallLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CallLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CallLogs
     * const callLogs = await prisma.callLog.findMany()
     * 
     * // Get first 10 CallLogs
     * const callLogs = await prisma.callLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callLogWithIdOnly = await prisma.callLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CallLogFindManyArgs>(args?: SelectSubset<T, CallLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CallLog.
     * @param {CallLogCreateArgs} args - Arguments to create a CallLog.
     * @example
     * // Create one CallLog
     * const CallLog = await prisma.callLog.create({
     *   data: {
     *     // ... data to create a CallLog
     *   }
     * })
     * 
     */
    create<T extends CallLogCreateArgs>(args: SelectSubset<T, CallLogCreateArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CallLogs.
     * @param {CallLogCreateManyArgs} args - Arguments to create many CallLogs.
     * @example
     * // Create many CallLogs
     * const callLog = await prisma.callLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CallLogCreateManyArgs>(args?: SelectSubset<T, CallLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CallLogs and returns the data saved in the database.
     * @param {CallLogCreateManyAndReturnArgs} args - Arguments to create many CallLogs.
     * @example
     * // Create many CallLogs
     * const callLog = await prisma.callLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CallLogs and only return the `id`
     * const callLogWithIdOnly = await prisma.callLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CallLogCreateManyAndReturnArgs>(args?: SelectSubset<T, CallLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CallLog.
     * @param {CallLogDeleteArgs} args - Arguments to delete one CallLog.
     * @example
     * // Delete one CallLog
     * const CallLog = await prisma.callLog.delete({
     *   where: {
     *     // ... filter to delete one CallLog
     *   }
     * })
     * 
     */
    delete<T extends CallLogDeleteArgs>(args: SelectSubset<T, CallLogDeleteArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CallLog.
     * @param {CallLogUpdateArgs} args - Arguments to update one CallLog.
     * @example
     * // Update one CallLog
     * const callLog = await prisma.callLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CallLogUpdateArgs>(args: SelectSubset<T, CallLogUpdateArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CallLogs.
     * @param {CallLogDeleteManyArgs} args - Arguments to filter CallLogs to delete.
     * @example
     * // Delete a few CallLogs
     * const { count } = await prisma.callLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CallLogDeleteManyArgs>(args?: SelectSubset<T, CallLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CallLogs
     * const callLog = await prisma.callLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CallLogUpdateManyArgs>(args: SelectSubset<T, CallLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CallLog.
     * @param {CallLogUpsertArgs} args - Arguments to update or create a CallLog.
     * @example
     * // Update or create a CallLog
     * const callLog = await prisma.callLog.upsert({
     *   create: {
     *     // ... data to create a CallLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CallLog we want to update
     *   }
     * })
     */
    upsert<T extends CallLogUpsertArgs>(args: SelectSubset<T, CallLogUpsertArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CallLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogCountArgs} args - Arguments to filter CallLogs to count.
     * @example
     * // Count the number of CallLogs
     * const count = await prisma.callLog.count({
     *   where: {
     *     // ... the filter for the CallLogs we want to count
     *   }
     * })
    **/
    count<T extends CallLogCountArgs>(
      args?: Subset<T, CallLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CallLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CallLogAggregateArgs>(args: Subset<T, CallLogAggregateArgs>): Prisma.PrismaPromise<GetCallLogAggregateType<T>>

    /**
     * Group by CallLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CallLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallLogGroupByArgs['orderBy'] }
        : { orderBy?: CallLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CallLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CallLog model
   */
  readonly fields: CallLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CallLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    contest<T extends ContestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContestDefaultArgs<ExtArgs>>): Prisma__ContestClient<$Result.GetResult<Prisma.$ContestPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CallLog model
   */ 
  interface CallLogFieldRefs {
    readonly id: FieldRef<"CallLog", 'String'>
    readonly studentId: FieldRef<"CallLog", 'String'>
    readonly contestId: FieldRef<"CallLog", 'String'>
    readonly vapiCallId: FieldRef<"CallLog", 'String'>
    readonly callStatus: FieldRef<"CallLog", 'String'>
    readonly whatsappSent: FieldRef<"CallLog", 'Boolean'>
    readonly whatsappStatus: FieldRef<"CallLog", 'String'>
    readonly initiatedAt: FieldRef<"CallLog", 'DateTime'>
    readonly answeredAt: FieldRef<"CallLog", 'DateTime'>
    readonly completedAt: FieldRef<"CallLog", 'DateTime'>
    readonly triggeredBy: FieldRef<"CallLog", 'String'>
    readonly errorMessage: FieldRef<"CallLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CallLog findUnique
   */
  export type CallLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog findUniqueOrThrow
   */
  export type CallLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog findFirst
   */
  export type CallLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallLogs.
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallLogs.
     */
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * CallLog findFirstOrThrow
   */
  export type CallLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallLogs.
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallLogs.
     */
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * CallLog findMany
   */
  export type CallLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLogs to fetch.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CallLogs.
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * CallLog create
   */
  export type CallLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * The data needed to create a CallLog.
     */
    data: XOR<CallLogCreateInput, CallLogUncheckedCreateInput>
  }

  /**
   * CallLog createMany
   */
  export type CallLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CallLogs.
     */
    data: CallLogCreateManyInput | CallLogCreateManyInput[]
  }

  /**
   * CallLog createManyAndReturn
   */
  export type CallLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CallLogs.
     */
    data: CallLogCreateManyInput | CallLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CallLog update
   */
  export type CallLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * The data needed to update a CallLog.
     */
    data: XOR<CallLogUpdateInput, CallLogUncheckedUpdateInput>
    /**
     * Choose, which CallLog to update.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog updateMany
   */
  export type CallLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CallLogs.
     */
    data: XOR<CallLogUpdateManyMutationInput, CallLogUncheckedUpdateManyInput>
    /**
     * Filter which CallLogs to update
     */
    where?: CallLogWhereInput
  }

  /**
   * CallLog upsert
   */
  export type CallLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * The filter to search for the CallLog to update in case it exists.
     */
    where: CallLogWhereUniqueInput
    /**
     * In case the CallLog found by the `where` argument doesn't exist, create a new CallLog with this data.
     */
    create: XOR<CallLogCreateInput, CallLogUncheckedCreateInput>
    /**
     * In case the CallLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallLogUpdateInput, CallLogUncheckedUpdateInput>
  }

  /**
   * CallLog delete
   */
  export type CallLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter which CallLog to delete.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog deleteMany
   */
  export type CallLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallLogs to delete
     */
    where?: CallLogWhereInput
  }

  /**
   * CallLog without action
   */
  export type CallLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StudentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    rollNo: 'rollNo',
    year: 'year',
    department: 'department',
    section: 'section',
    passwordHash: 'passwordHash',
    phone: 'phone',
    email: 'email',
    leetcodeId: 'leetcodeId',
    skillrackId: 'skillrackId',
    createdAt: 'createdAt',
    cgpa: 'cgpa',
    githubId: 'githubId',
    hackathonCount: 'hackathonCount',
    semesterHistory: 'semesterHistory'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const ContestScalarFieldEnum: {
    id: 'id',
    name: 'name',
    platform: 'platform',
    externalId: 'externalId',
    scheduledAt: 'scheduledAt',
    durationMins: 'durationMins',
    cronJobId: 'cronJobId',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ContestScalarFieldEnum = (typeof ContestScalarFieldEnum)[keyof typeof ContestScalarFieldEnum]


  export const ParticipationScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    contestId: 'contestId',
    status: 'status',
    joinedAt: 'joinedAt',
    updatedAt: 'updatedAt'
  };

  export type ParticipationScalarFieldEnum = (typeof ParticipationScalarFieldEnum)[keyof typeof ParticipationScalarFieldEnum]


  export const CallLogScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    contestId: 'contestId',
    vapiCallId: 'vapiCallId',
    callStatus: 'callStatus',
    whatsappSent: 'whatsappSent',
    whatsappStatus: 'whatsappStatus',
    initiatedAt: 'initiatedAt',
    answeredAt: 'answeredAt',
    completedAt: 'completedAt',
    triggeredBy: 'triggeredBy',
    errorMessage: 'errorMessage'
  };

  export type CallLogScalarFieldEnum = (typeof CallLogScalarFieldEnum)[keyof typeof CallLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    rollNo?: StringFilter<"Student"> | string
    year?: IntFilter<"Student"> | number
    department?: StringFilter<"Student"> | string
    section?: StringNullableFilter<"Student"> | string | null
    passwordHash?: StringFilter<"Student"> | string
    phone?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    leetcodeId?: StringNullableFilter<"Student"> | string | null
    skillrackId?: StringNullableFilter<"Student"> | string | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    cgpa?: FloatNullableFilter<"Student"> | number | null
    githubId?: StringNullableFilter<"Student"> | string | null
    hackathonCount?: IntNullableFilter<"Student"> | number | null
    semesterHistory?: StringNullableFilter<"Student"> | string | null
    participations?: ParticipationListRelationFilter
    callLogs?: CallLogListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    rollNo?: SortOrder
    year?: SortOrder
    department?: SortOrder
    section?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    leetcodeId?: SortOrderInput | SortOrder
    skillrackId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    cgpa?: SortOrderInput | SortOrder
    githubId?: SortOrderInput | SortOrder
    hackathonCount?: SortOrderInput | SortOrder
    semesterHistory?: SortOrderInput | SortOrder
    participations?: ParticipationOrderByRelationAggregateInput
    callLogs?: CallLogOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    rollNo?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    year?: IntFilter<"Student"> | number
    department?: StringFilter<"Student"> | string
    section?: StringNullableFilter<"Student"> | string | null
    passwordHash?: StringFilter<"Student"> | string
    phone?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    leetcodeId?: StringNullableFilter<"Student"> | string | null
    skillrackId?: StringNullableFilter<"Student"> | string | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    cgpa?: FloatNullableFilter<"Student"> | number | null
    githubId?: StringNullableFilter<"Student"> | string | null
    hackathonCount?: IntNullableFilter<"Student"> | number | null
    semesterHistory?: StringNullableFilter<"Student"> | string | null
    participations?: ParticipationListRelationFilter
    callLogs?: CallLogListRelationFilter
  }, "id" | "rollNo">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    rollNo?: SortOrder
    year?: SortOrder
    department?: SortOrder
    section?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    leetcodeId?: SortOrderInput | SortOrder
    skillrackId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    cgpa?: SortOrderInput | SortOrder
    githubId?: SortOrderInput | SortOrder
    hackathonCount?: SortOrderInput | SortOrder
    semesterHistory?: SortOrderInput | SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Student"> | string
    name?: StringWithAggregatesFilter<"Student"> | string
    rollNo?: StringWithAggregatesFilter<"Student"> | string
    year?: IntWithAggregatesFilter<"Student"> | number
    department?: StringWithAggregatesFilter<"Student"> | string
    section?: StringNullableWithAggregatesFilter<"Student"> | string | null
    passwordHash?: StringWithAggregatesFilter<"Student"> | string
    phone?: StringWithAggregatesFilter<"Student"> | string
    email?: StringWithAggregatesFilter<"Student"> | string
    leetcodeId?: StringNullableWithAggregatesFilter<"Student"> | string | null
    skillrackId?: StringNullableWithAggregatesFilter<"Student"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    cgpa?: FloatNullableWithAggregatesFilter<"Student"> | number | null
    githubId?: StringNullableWithAggregatesFilter<"Student"> | string | null
    hackathonCount?: IntNullableWithAggregatesFilter<"Student"> | number | null
    semesterHistory?: StringNullableWithAggregatesFilter<"Student"> | string | null
  }

  export type ContestWhereInput = {
    AND?: ContestWhereInput | ContestWhereInput[]
    OR?: ContestWhereInput[]
    NOT?: ContestWhereInput | ContestWhereInput[]
    id?: StringFilter<"Contest"> | string
    name?: StringFilter<"Contest"> | string
    platform?: StringFilter<"Contest"> | string
    externalId?: StringFilter<"Contest"> | string
    scheduledAt?: DateTimeFilter<"Contest"> | Date | string
    durationMins?: IntFilter<"Contest"> | number
    cronJobId?: StringNullableFilter<"Contest"> | string | null
    status?: StringFilter<"Contest"> | string
    createdAt?: DateTimeFilter<"Contest"> | Date | string
    participations?: ParticipationListRelationFilter
    callLogs?: CallLogListRelationFilter
  }

  export type ContestOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    externalId?: SortOrder
    scheduledAt?: SortOrder
    durationMins?: SortOrder
    cronJobId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    participations?: ParticipationOrderByRelationAggregateInput
    callLogs?: CallLogOrderByRelationAggregateInput
  }

  export type ContestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContestWhereInput | ContestWhereInput[]
    OR?: ContestWhereInput[]
    NOT?: ContestWhereInput | ContestWhereInput[]
    name?: StringFilter<"Contest"> | string
    platform?: StringFilter<"Contest"> | string
    externalId?: StringFilter<"Contest"> | string
    scheduledAt?: DateTimeFilter<"Contest"> | Date | string
    durationMins?: IntFilter<"Contest"> | number
    cronJobId?: StringNullableFilter<"Contest"> | string | null
    status?: StringFilter<"Contest"> | string
    createdAt?: DateTimeFilter<"Contest"> | Date | string
    participations?: ParticipationListRelationFilter
    callLogs?: CallLogListRelationFilter
  }, "id">

  export type ContestOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    externalId?: SortOrder
    scheduledAt?: SortOrder
    durationMins?: SortOrder
    cronJobId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ContestCountOrderByAggregateInput
    _avg?: ContestAvgOrderByAggregateInput
    _max?: ContestMaxOrderByAggregateInput
    _min?: ContestMinOrderByAggregateInput
    _sum?: ContestSumOrderByAggregateInput
  }

  export type ContestScalarWhereWithAggregatesInput = {
    AND?: ContestScalarWhereWithAggregatesInput | ContestScalarWhereWithAggregatesInput[]
    OR?: ContestScalarWhereWithAggregatesInput[]
    NOT?: ContestScalarWhereWithAggregatesInput | ContestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contest"> | string
    name?: StringWithAggregatesFilter<"Contest"> | string
    platform?: StringWithAggregatesFilter<"Contest"> | string
    externalId?: StringWithAggregatesFilter<"Contest"> | string
    scheduledAt?: DateTimeWithAggregatesFilter<"Contest"> | Date | string
    durationMins?: IntWithAggregatesFilter<"Contest"> | number
    cronJobId?: StringNullableWithAggregatesFilter<"Contest"> | string | null
    status?: StringWithAggregatesFilter<"Contest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Contest"> | Date | string
  }

  export type ParticipationWhereInput = {
    AND?: ParticipationWhereInput | ParticipationWhereInput[]
    OR?: ParticipationWhereInput[]
    NOT?: ParticipationWhereInput | ParticipationWhereInput[]
    id?: StringFilter<"Participation"> | string
    studentId?: StringFilter<"Participation"> | string
    contestId?: StringFilter<"Participation"> | string
    status?: StringFilter<"Participation"> | string
    joinedAt?: DateTimeNullableFilter<"Participation"> | Date | string | null
    updatedAt?: DateTimeFilter<"Participation"> | Date | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
    contest?: XOR<ContestRelationFilter, ContestWhereInput>
  }

  export type ParticipationOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    contestId?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
    contest?: ContestOrderByWithRelationInput
  }

  export type ParticipationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_contestId?: ParticipationStudentIdContestIdCompoundUniqueInput
    AND?: ParticipationWhereInput | ParticipationWhereInput[]
    OR?: ParticipationWhereInput[]
    NOT?: ParticipationWhereInput | ParticipationWhereInput[]
    studentId?: StringFilter<"Participation"> | string
    contestId?: StringFilter<"Participation"> | string
    status?: StringFilter<"Participation"> | string
    joinedAt?: DateTimeNullableFilter<"Participation"> | Date | string | null
    updatedAt?: DateTimeFilter<"Participation"> | Date | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
    contest?: XOR<ContestRelationFilter, ContestWhereInput>
  }, "id" | "studentId_contestId">

  export type ParticipationOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    contestId?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ParticipationCountOrderByAggregateInput
    _max?: ParticipationMaxOrderByAggregateInput
    _min?: ParticipationMinOrderByAggregateInput
  }

  export type ParticipationScalarWhereWithAggregatesInput = {
    AND?: ParticipationScalarWhereWithAggregatesInput | ParticipationScalarWhereWithAggregatesInput[]
    OR?: ParticipationScalarWhereWithAggregatesInput[]
    NOT?: ParticipationScalarWhereWithAggregatesInput | ParticipationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Participation"> | string
    studentId?: StringWithAggregatesFilter<"Participation"> | string
    contestId?: StringWithAggregatesFilter<"Participation"> | string
    status?: StringWithAggregatesFilter<"Participation"> | string
    joinedAt?: DateTimeNullableWithAggregatesFilter<"Participation"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Participation"> | Date | string
  }

  export type CallLogWhereInput = {
    AND?: CallLogWhereInput | CallLogWhereInput[]
    OR?: CallLogWhereInput[]
    NOT?: CallLogWhereInput | CallLogWhereInput[]
    id?: StringFilter<"CallLog"> | string
    studentId?: StringFilter<"CallLog"> | string
    contestId?: StringFilter<"CallLog"> | string
    vapiCallId?: StringNullableFilter<"CallLog"> | string | null
    callStatus?: StringFilter<"CallLog"> | string
    whatsappSent?: BoolFilter<"CallLog"> | boolean
    whatsappStatus?: StringNullableFilter<"CallLog"> | string | null
    initiatedAt?: DateTimeFilter<"CallLog"> | Date | string
    answeredAt?: DateTimeNullableFilter<"CallLog"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CallLog"> | Date | string | null
    triggeredBy?: StringFilter<"CallLog"> | string
    errorMessage?: StringNullableFilter<"CallLog"> | string | null
    student?: XOR<StudentRelationFilter, StudentWhereInput>
    contest?: XOR<ContestRelationFilter, ContestWhereInput>
  }

  export type CallLogOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    contestId?: SortOrder
    vapiCallId?: SortOrderInput | SortOrder
    callStatus?: SortOrder
    whatsappSent?: SortOrder
    whatsappStatus?: SortOrderInput | SortOrder
    initiatedAt?: SortOrder
    answeredAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    triggeredBy?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    student?: StudentOrderByWithRelationInput
    contest?: ContestOrderByWithRelationInput
  }

  export type CallLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CallLogWhereInput | CallLogWhereInput[]
    OR?: CallLogWhereInput[]
    NOT?: CallLogWhereInput | CallLogWhereInput[]
    studentId?: StringFilter<"CallLog"> | string
    contestId?: StringFilter<"CallLog"> | string
    vapiCallId?: StringNullableFilter<"CallLog"> | string | null
    callStatus?: StringFilter<"CallLog"> | string
    whatsappSent?: BoolFilter<"CallLog"> | boolean
    whatsappStatus?: StringNullableFilter<"CallLog"> | string | null
    initiatedAt?: DateTimeFilter<"CallLog"> | Date | string
    answeredAt?: DateTimeNullableFilter<"CallLog"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CallLog"> | Date | string | null
    triggeredBy?: StringFilter<"CallLog"> | string
    errorMessage?: StringNullableFilter<"CallLog"> | string | null
    student?: XOR<StudentRelationFilter, StudentWhereInput>
    contest?: XOR<ContestRelationFilter, ContestWhereInput>
  }, "id">

  export type CallLogOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    contestId?: SortOrder
    vapiCallId?: SortOrderInput | SortOrder
    callStatus?: SortOrder
    whatsappSent?: SortOrder
    whatsappStatus?: SortOrderInput | SortOrder
    initiatedAt?: SortOrder
    answeredAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    triggeredBy?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    _count?: CallLogCountOrderByAggregateInput
    _max?: CallLogMaxOrderByAggregateInput
    _min?: CallLogMinOrderByAggregateInput
  }

  export type CallLogScalarWhereWithAggregatesInput = {
    AND?: CallLogScalarWhereWithAggregatesInput | CallLogScalarWhereWithAggregatesInput[]
    OR?: CallLogScalarWhereWithAggregatesInput[]
    NOT?: CallLogScalarWhereWithAggregatesInput | CallLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CallLog"> | string
    studentId?: StringWithAggregatesFilter<"CallLog"> | string
    contestId?: StringWithAggregatesFilter<"CallLog"> | string
    vapiCallId?: StringNullableWithAggregatesFilter<"CallLog"> | string | null
    callStatus?: StringWithAggregatesFilter<"CallLog"> | string
    whatsappSent?: BoolWithAggregatesFilter<"CallLog"> | boolean
    whatsappStatus?: StringNullableWithAggregatesFilter<"CallLog"> | string | null
    initiatedAt?: DateTimeWithAggregatesFilter<"CallLog"> | Date | string
    answeredAt?: DateTimeNullableWithAggregatesFilter<"CallLog"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"CallLog"> | Date | string | null
    triggeredBy?: StringWithAggregatesFilter<"CallLog"> | string
    errorMessage?: StringNullableWithAggregatesFilter<"CallLog"> | string | null
  }

  export type StudentCreateInput = {
    id?: string
    name: string
    rollNo: string
    year?: number
    department?: string
    section?: string | null
    passwordHash?: string
    phone: string
    email: string
    leetcodeId?: string | null
    skillrackId?: string | null
    createdAt?: Date | string
    cgpa?: number | null
    githubId?: string | null
    hackathonCount?: number | null
    semesterHistory?: string | null
    participations?: ParticipationCreateNestedManyWithoutStudentInput
    callLogs?: CallLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: string
    name: string
    rollNo: string
    year?: number
    department?: string
    section?: string | null
    passwordHash?: string
    phone: string
    email: string
    leetcodeId?: string | null
    skillrackId?: string | null
    createdAt?: Date | string
    cgpa?: number | null
    githubId?: string | null
    hackathonCount?: number | null
    semesterHistory?: string | null
    participations?: ParticipationUncheckedCreateNestedManyWithoutStudentInput
    callLogs?: CallLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    department?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableStringFieldUpdateOperationsInput | string | null
    skillrackId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    githubId?: NullableStringFieldUpdateOperationsInput | string | null
    hackathonCount?: NullableIntFieldUpdateOperationsInput | number | null
    semesterHistory?: NullableStringFieldUpdateOperationsInput | string | null
    participations?: ParticipationUpdateManyWithoutStudentNestedInput
    callLogs?: CallLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    department?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableStringFieldUpdateOperationsInput | string | null
    skillrackId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    githubId?: NullableStringFieldUpdateOperationsInput | string | null
    hackathonCount?: NullableIntFieldUpdateOperationsInput | number | null
    semesterHistory?: NullableStringFieldUpdateOperationsInput | string | null
    participations?: ParticipationUncheckedUpdateManyWithoutStudentNestedInput
    callLogs?: CallLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: string
    name: string
    rollNo: string
    year?: number
    department?: string
    section?: string | null
    passwordHash?: string
    phone: string
    email: string
    leetcodeId?: string | null
    skillrackId?: string | null
    createdAt?: Date | string
    cgpa?: number | null
    githubId?: string | null
    hackathonCount?: number | null
    semesterHistory?: string | null
  }

  export type StudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    department?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableStringFieldUpdateOperationsInput | string | null
    skillrackId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    githubId?: NullableStringFieldUpdateOperationsInput | string | null
    hackathonCount?: NullableIntFieldUpdateOperationsInput | number | null
    semesterHistory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    department?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableStringFieldUpdateOperationsInput | string | null
    skillrackId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    githubId?: NullableStringFieldUpdateOperationsInput | string | null
    hackathonCount?: NullableIntFieldUpdateOperationsInput | number | null
    semesterHistory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContestCreateInput = {
    id?: string
    name: string
    platform: string
    externalId: string
    scheduledAt: Date | string
    durationMins: number
    cronJobId?: string | null
    status?: string
    createdAt?: Date | string
    participations?: ParticipationCreateNestedManyWithoutContestInput
    callLogs?: CallLogCreateNestedManyWithoutContestInput
  }

  export type ContestUncheckedCreateInput = {
    id?: string
    name: string
    platform: string
    externalId: string
    scheduledAt: Date | string
    durationMins: number
    cronJobId?: string | null
    status?: string
    createdAt?: Date | string
    participations?: ParticipationUncheckedCreateNestedManyWithoutContestInput
    callLogs?: CallLogUncheckedCreateNestedManyWithoutContestInput
  }

  export type ContestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMins?: IntFieldUpdateOperationsInput | number
    cronJobId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: ParticipationUpdateManyWithoutContestNestedInput
    callLogs?: CallLogUpdateManyWithoutContestNestedInput
  }

  export type ContestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMins?: IntFieldUpdateOperationsInput | number
    cronJobId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: ParticipationUncheckedUpdateManyWithoutContestNestedInput
    callLogs?: CallLogUncheckedUpdateManyWithoutContestNestedInput
  }

  export type ContestCreateManyInput = {
    id?: string
    name: string
    platform: string
    externalId: string
    scheduledAt: Date | string
    durationMins: number
    cronJobId?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type ContestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMins?: IntFieldUpdateOperationsInput | number
    cronJobId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMins?: IntFieldUpdateOperationsInput | number
    cronJobId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationCreateInput = {
    id?: string
    status?: string
    joinedAt?: Date | string | null
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutParticipationsInput
    contest: ContestCreateNestedOneWithoutParticipationsInput
  }

  export type ParticipationUncheckedCreateInput = {
    id?: string
    studentId: string
    contestId: string
    status?: string
    joinedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ParticipationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutParticipationsNestedInput
    contest?: ContestUpdateOneRequiredWithoutParticipationsNestedInput
  }

  export type ParticipationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationCreateManyInput = {
    id?: string
    studentId: string
    contestId: string
    status?: string
    joinedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ParticipationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogCreateInput = {
    id?: string
    vapiCallId?: string | null
    callStatus?: string
    whatsappSent?: boolean
    whatsappStatus?: string | null
    initiatedAt?: Date | string
    answeredAt?: Date | string | null
    completedAt?: Date | string | null
    triggeredBy: string
    errorMessage?: string | null
    student: StudentCreateNestedOneWithoutCallLogsInput
    contest: ContestCreateNestedOneWithoutCallLogsInput
  }

  export type CallLogUncheckedCreateInput = {
    id?: string
    studentId: string
    contestId: string
    vapiCallId?: string | null
    callStatus?: string
    whatsappSent?: boolean
    whatsappStatus?: string | null
    initiatedAt?: Date | string
    answeredAt?: Date | string | null
    completedAt?: Date | string | null
    triggeredBy: string
    errorMessage?: string | null
  }

  export type CallLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vapiCallId?: NullableStringFieldUpdateOperationsInput | string | null
    callStatus?: StringFieldUpdateOperationsInput | string
    whatsappSent?: BoolFieldUpdateOperationsInput | boolean
    whatsappStatus?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    student?: StudentUpdateOneRequiredWithoutCallLogsNestedInput
    contest?: ContestUpdateOneRequiredWithoutCallLogsNestedInput
  }

  export type CallLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    vapiCallId?: NullableStringFieldUpdateOperationsInput | string | null
    callStatus?: StringFieldUpdateOperationsInput | string
    whatsappSent?: BoolFieldUpdateOperationsInput | boolean
    whatsappStatus?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CallLogCreateManyInput = {
    id?: string
    studentId: string
    contestId: string
    vapiCallId?: string | null
    callStatus?: string
    whatsappSent?: boolean
    whatsappStatus?: string | null
    initiatedAt?: Date | string
    answeredAt?: Date | string | null
    completedAt?: Date | string | null
    triggeredBy: string
    errorMessage?: string | null
  }

  export type CallLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    vapiCallId?: NullableStringFieldUpdateOperationsInput | string | null
    callStatus?: StringFieldUpdateOperationsInput | string
    whatsappSent?: BoolFieldUpdateOperationsInput | boolean
    whatsappStatus?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CallLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    vapiCallId?: NullableStringFieldUpdateOperationsInput | string | null
    callStatus?: StringFieldUpdateOperationsInput | string
    whatsappSent?: BoolFieldUpdateOperationsInput | boolean
    whatsappStatus?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ParticipationListRelationFilter = {
    every?: ParticipationWhereInput
    some?: ParticipationWhereInput
    none?: ParticipationWhereInput
  }

  export type CallLogListRelationFilter = {
    every?: CallLogWhereInput
    some?: CallLogWhereInput
    none?: CallLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ParticipationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CallLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rollNo?: SortOrder
    year?: SortOrder
    department?: SortOrder
    section?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    leetcodeId?: SortOrder
    skillrackId?: SortOrder
    createdAt?: SortOrder
    cgpa?: SortOrder
    githubId?: SortOrder
    hackathonCount?: SortOrder
    semesterHistory?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    year?: SortOrder
    cgpa?: SortOrder
    hackathonCount?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rollNo?: SortOrder
    year?: SortOrder
    department?: SortOrder
    section?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    leetcodeId?: SortOrder
    skillrackId?: SortOrder
    createdAt?: SortOrder
    cgpa?: SortOrder
    githubId?: SortOrder
    hackathonCount?: SortOrder
    semesterHistory?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rollNo?: SortOrder
    year?: SortOrder
    department?: SortOrder
    section?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    leetcodeId?: SortOrder
    skillrackId?: SortOrder
    createdAt?: SortOrder
    cgpa?: SortOrder
    githubId?: SortOrder
    hackathonCount?: SortOrder
    semesterHistory?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    year?: SortOrder
    cgpa?: SortOrder
    hackathonCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ContestCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    externalId?: SortOrder
    scheduledAt?: SortOrder
    durationMins?: SortOrder
    cronJobId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ContestAvgOrderByAggregateInput = {
    durationMins?: SortOrder
  }

  export type ContestMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    externalId?: SortOrder
    scheduledAt?: SortOrder
    durationMins?: SortOrder
    cronJobId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ContestMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    externalId?: SortOrder
    scheduledAt?: SortOrder
    durationMins?: SortOrder
    cronJobId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ContestSumOrderByAggregateInput = {
    durationMins?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StudentRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type ContestRelationFilter = {
    is?: ContestWhereInput
    isNot?: ContestWhereInput
  }

  export type ParticipationStudentIdContestIdCompoundUniqueInput = {
    studentId: string
    contestId: string
  }

  export type ParticipationCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    contestId?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParticipationMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    contestId?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParticipationMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    contestId?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CallLogCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    contestId?: SortOrder
    vapiCallId?: SortOrder
    callStatus?: SortOrder
    whatsappSent?: SortOrder
    whatsappStatus?: SortOrder
    initiatedAt?: SortOrder
    answeredAt?: SortOrder
    completedAt?: SortOrder
    triggeredBy?: SortOrder
    errorMessage?: SortOrder
  }

  export type CallLogMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    contestId?: SortOrder
    vapiCallId?: SortOrder
    callStatus?: SortOrder
    whatsappSent?: SortOrder
    whatsappStatus?: SortOrder
    initiatedAt?: SortOrder
    answeredAt?: SortOrder
    completedAt?: SortOrder
    triggeredBy?: SortOrder
    errorMessage?: SortOrder
  }

  export type CallLogMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    contestId?: SortOrder
    vapiCallId?: SortOrder
    callStatus?: SortOrder
    whatsappSent?: SortOrder
    whatsappStatus?: SortOrder
    initiatedAt?: SortOrder
    answeredAt?: SortOrder
    completedAt?: SortOrder
    triggeredBy?: SortOrder
    errorMessage?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ParticipationCreateNestedManyWithoutStudentInput = {
    create?: XOR<ParticipationCreateWithoutStudentInput, ParticipationUncheckedCreateWithoutStudentInput> | ParticipationCreateWithoutStudentInput[] | ParticipationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutStudentInput | ParticipationCreateOrConnectWithoutStudentInput[]
    createMany?: ParticipationCreateManyStudentInputEnvelope
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
  }

  export type CallLogCreateNestedManyWithoutStudentInput = {
    create?: XOR<CallLogCreateWithoutStudentInput, CallLogUncheckedCreateWithoutStudentInput> | CallLogCreateWithoutStudentInput[] | CallLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutStudentInput | CallLogCreateOrConnectWithoutStudentInput[]
    createMany?: CallLogCreateManyStudentInputEnvelope
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
  }

  export type ParticipationUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ParticipationCreateWithoutStudentInput, ParticipationUncheckedCreateWithoutStudentInput> | ParticipationCreateWithoutStudentInput[] | ParticipationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutStudentInput | ParticipationCreateOrConnectWithoutStudentInput[]
    createMany?: ParticipationCreateManyStudentInputEnvelope
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
  }

  export type CallLogUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<CallLogCreateWithoutStudentInput, CallLogUncheckedCreateWithoutStudentInput> | CallLogCreateWithoutStudentInput[] | CallLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutStudentInput | CallLogCreateOrConnectWithoutStudentInput[]
    createMany?: CallLogCreateManyStudentInputEnvelope
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ParticipationUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ParticipationCreateWithoutStudentInput, ParticipationUncheckedCreateWithoutStudentInput> | ParticipationCreateWithoutStudentInput[] | ParticipationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutStudentInput | ParticipationCreateOrConnectWithoutStudentInput[]
    upsert?: ParticipationUpsertWithWhereUniqueWithoutStudentInput | ParticipationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ParticipationCreateManyStudentInputEnvelope
    set?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    disconnect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    delete?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    update?: ParticipationUpdateWithWhereUniqueWithoutStudentInput | ParticipationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ParticipationUpdateManyWithWhereWithoutStudentInput | ParticipationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
  }

  export type CallLogUpdateManyWithoutStudentNestedInput = {
    create?: XOR<CallLogCreateWithoutStudentInput, CallLogUncheckedCreateWithoutStudentInput> | CallLogCreateWithoutStudentInput[] | CallLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutStudentInput | CallLogCreateOrConnectWithoutStudentInput[]
    upsert?: CallLogUpsertWithWhereUniqueWithoutStudentInput | CallLogUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: CallLogCreateManyStudentInputEnvelope
    set?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    disconnect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    delete?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    update?: CallLogUpdateWithWhereUniqueWithoutStudentInput | CallLogUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: CallLogUpdateManyWithWhereWithoutStudentInput | CallLogUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
  }

  export type ParticipationUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ParticipationCreateWithoutStudentInput, ParticipationUncheckedCreateWithoutStudentInput> | ParticipationCreateWithoutStudentInput[] | ParticipationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutStudentInput | ParticipationCreateOrConnectWithoutStudentInput[]
    upsert?: ParticipationUpsertWithWhereUniqueWithoutStudentInput | ParticipationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ParticipationCreateManyStudentInputEnvelope
    set?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    disconnect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    delete?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    update?: ParticipationUpdateWithWhereUniqueWithoutStudentInput | ParticipationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ParticipationUpdateManyWithWhereWithoutStudentInput | ParticipationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
  }

  export type CallLogUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<CallLogCreateWithoutStudentInput, CallLogUncheckedCreateWithoutStudentInput> | CallLogCreateWithoutStudentInput[] | CallLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutStudentInput | CallLogCreateOrConnectWithoutStudentInput[]
    upsert?: CallLogUpsertWithWhereUniqueWithoutStudentInput | CallLogUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: CallLogCreateManyStudentInputEnvelope
    set?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    disconnect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    delete?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    update?: CallLogUpdateWithWhereUniqueWithoutStudentInput | CallLogUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: CallLogUpdateManyWithWhereWithoutStudentInput | CallLogUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
  }

  export type ParticipationCreateNestedManyWithoutContestInput = {
    create?: XOR<ParticipationCreateWithoutContestInput, ParticipationUncheckedCreateWithoutContestInput> | ParticipationCreateWithoutContestInput[] | ParticipationUncheckedCreateWithoutContestInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutContestInput | ParticipationCreateOrConnectWithoutContestInput[]
    createMany?: ParticipationCreateManyContestInputEnvelope
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
  }

  export type CallLogCreateNestedManyWithoutContestInput = {
    create?: XOR<CallLogCreateWithoutContestInput, CallLogUncheckedCreateWithoutContestInput> | CallLogCreateWithoutContestInput[] | CallLogUncheckedCreateWithoutContestInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutContestInput | CallLogCreateOrConnectWithoutContestInput[]
    createMany?: CallLogCreateManyContestInputEnvelope
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
  }

  export type ParticipationUncheckedCreateNestedManyWithoutContestInput = {
    create?: XOR<ParticipationCreateWithoutContestInput, ParticipationUncheckedCreateWithoutContestInput> | ParticipationCreateWithoutContestInput[] | ParticipationUncheckedCreateWithoutContestInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutContestInput | ParticipationCreateOrConnectWithoutContestInput[]
    createMany?: ParticipationCreateManyContestInputEnvelope
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
  }

  export type CallLogUncheckedCreateNestedManyWithoutContestInput = {
    create?: XOR<CallLogCreateWithoutContestInput, CallLogUncheckedCreateWithoutContestInput> | CallLogCreateWithoutContestInput[] | CallLogUncheckedCreateWithoutContestInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutContestInput | CallLogCreateOrConnectWithoutContestInput[]
    createMany?: CallLogCreateManyContestInputEnvelope
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
  }

  export type ParticipationUpdateManyWithoutContestNestedInput = {
    create?: XOR<ParticipationCreateWithoutContestInput, ParticipationUncheckedCreateWithoutContestInput> | ParticipationCreateWithoutContestInput[] | ParticipationUncheckedCreateWithoutContestInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutContestInput | ParticipationCreateOrConnectWithoutContestInput[]
    upsert?: ParticipationUpsertWithWhereUniqueWithoutContestInput | ParticipationUpsertWithWhereUniqueWithoutContestInput[]
    createMany?: ParticipationCreateManyContestInputEnvelope
    set?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    disconnect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    delete?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    update?: ParticipationUpdateWithWhereUniqueWithoutContestInput | ParticipationUpdateWithWhereUniqueWithoutContestInput[]
    updateMany?: ParticipationUpdateManyWithWhereWithoutContestInput | ParticipationUpdateManyWithWhereWithoutContestInput[]
    deleteMany?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
  }

  export type CallLogUpdateManyWithoutContestNestedInput = {
    create?: XOR<CallLogCreateWithoutContestInput, CallLogUncheckedCreateWithoutContestInput> | CallLogCreateWithoutContestInput[] | CallLogUncheckedCreateWithoutContestInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutContestInput | CallLogCreateOrConnectWithoutContestInput[]
    upsert?: CallLogUpsertWithWhereUniqueWithoutContestInput | CallLogUpsertWithWhereUniqueWithoutContestInput[]
    createMany?: CallLogCreateManyContestInputEnvelope
    set?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    disconnect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    delete?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    update?: CallLogUpdateWithWhereUniqueWithoutContestInput | CallLogUpdateWithWhereUniqueWithoutContestInput[]
    updateMany?: CallLogUpdateManyWithWhereWithoutContestInput | CallLogUpdateManyWithWhereWithoutContestInput[]
    deleteMany?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
  }

  export type ParticipationUncheckedUpdateManyWithoutContestNestedInput = {
    create?: XOR<ParticipationCreateWithoutContestInput, ParticipationUncheckedCreateWithoutContestInput> | ParticipationCreateWithoutContestInput[] | ParticipationUncheckedCreateWithoutContestInput[]
    connectOrCreate?: ParticipationCreateOrConnectWithoutContestInput | ParticipationCreateOrConnectWithoutContestInput[]
    upsert?: ParticipationUpsertWithWhereUniqueWithoutContestInput | ParticipationUpsertWithWhereUniqueWithoutContestInput[]
    createMany?: ParticipationCreateManyContestInputEnvelope
    set?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    disconnect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    delete?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    connect?: ParticipationWhereUniqueInput | ParticipationWhereUniqueInput[]
    update?: ParticipationUpdateWithWhereUniqueWithoutContestInput | ParticipationUpdateWithWhereUniqueWithoutContestInput[]
    updateMany?: ParticipationUpdateManyWithWhereWithoutContestInput | ParticipationUpdateManyWithWhereWithoutContestInput[]
    deleteMany?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
  }

  export type CallLogUncheckedUpdateManyWithoutContestNestedInput = {
    create?: XOR<CallLogCreateWithoutContestInput, CallLogUncheckedCreateWithoutContestInput> | CallLogCreateWithoutContestInput[] | CallLogUncheckedCreateWithoutContestInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutContestInput | CallLogCreateOrConnectWithoutContestInput[]
    upsert?: CallLogUpsertWithWhereUniqueWithoutContestInput | CallLogUpsertWithWhereUniqueWithoutContestInput[]
    createMany?: CallLogCreateManyContestInputEnvelope
    set?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    disconnect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    delete?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    update?: CallLogUpdateWithWhereUniqueWithoutContestInput | CallLogUpdateWithWhereUniqueWithoutContestInput[]
    updateMany?: CallLogUpdateManyWithWhereWithoutContestInput | CallLogUpdateManyWithWhereWithoutContestInput[]
    deleteMany?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutParticipationsInput = {
    create?: XOR<StudentCreateWithoutParticipationsInput, StudentUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutParticipationsInput
    connect?: StudentWhereUniqueInput
  }

  export type ContestCreateNestedOneWithoutParticipationsInput = {
    create?: XOR<ContestCreateWithoutParticipationsInput, ContestUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: ContestCreateOrConnectWithoutParticipationsInput
    connect?: ContestWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type StudentUpdateOneRequiredWithoutParticipationsNestedInput = {
    create?: XOR<StudentCreateWithoutParticipationsInput, StudentUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutParticipationsInput
    upsert?: StudentUpsertWithoutParticipationsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutParticipationsInput, StudentUpdateWithoutParticipationsInput>, StudentUncheckedUpdateWithoutParticipationsInput>
  }

  export type ContestUpdateOneRequiredWithoutParticipationsNestedInput = {
    create?: XOR<ContestCreateWithoutParticipationsInput, ContestUncheckedCreateWithoutParticipationsInput>
    connectOrCreate?: ContestCreateOrConnectWithoutParticipationsInput
    upsert?: ContestUpsertWithoutParticipationsInput
    connect?: ContestWhereUniqueInput
    update?: XOR<XOR<ContestUpdateToOneWithWhereWithoutParticipationsInput, ContestUpdateWithoutParticipationsInput>, ContestUncheckedUpdateWithoutParticipationsInput>
  }

  export type StudentCreateNestedOneWithoutCallLogsInput = {
    create?: XOR<StudentCreateWithoutCallLogsInput, StudentUncheckedCreateWithoutCallLogsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutCallLogsInput
    connect?: StudentWhereUniqueInput
  }

  export type ContestCreateNestedOneWithoutCallLogsInput = {
    create?: XOR<ContestCreateWithoutCallLogsInput, ContestUncheckedCreateWithoutCallLogsInput>
    connectOrCreate?: ContestCreateOrConnectWithoutCallLogsInput
    connect?: ContestWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StudentUpdateOneRequiredWithoutCallLogsNestedInput = {
    create?: XOR<StudentCreateWithoutCallLogsInput, StudentUncheckedCreateWithoutCallLogsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutCallLogsInput
    upsert?: StudentUpsertWithoutCallLogsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutCallLogsInput, StudentUpdateWithoutCallLogsInput>, StudentUncheckedUpdateWithoutCallLogsInput>
  }

  export type ContestUpdateOneRequiredWithoutCallLogsNestedInput = {
    create?: XOR<ContestCreateWithoutCallLogsInput, ContestUncheckedCreateWithoutCallLogsInput>
    connectOrCreate?: ContestCreateOrConnectWithoutCallLogsInput
    upsert?: ContestUpsertWithoutCallLogsInput
    connect?: ContestWhereUniqueInput
    update?: XOR<XOR<ContestUpdateToOneWithWhereWithoutCallLogsInput, ContestUpdateWithoutCallLogsInput>, ContestUncheckedUpdateWithoutCallLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ParticipationCreateWithoutStudentInput = {
    id?: string
    status?: string
    joinedAt?: Date | string | null
    updatedAt?: Date | string
    contest: ContestCreateNestedOneWithoutParticipationsInput
  }

  export type ParticipationUncheckedCreateWithoutStudentInput = {
    id?: string
    contestId: string
    status?: string
    joinedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ParticipationCreateOrConnectWithoutStudentInput = {
    where: ParticipationWhereUniqueInput
    create: XOR<ParticipationCreateWithoutStudentInput, ParticipationUncheckedCreateWithoutStudentInput>
  }

  export type ParticipationCreateManyStudentInputEnvelope = {
    data: ParticipationCreateManyStudentInput | ParticipationCreateManyStudentInput[]
  }

  export type CallLogCreateWithoutStudentInput = {
    id?: string
    vapiCallId?: string | null
    callStatus?: string
    whatsappSent?: boolean
    whatsappStatus?: string | null
    initiatedAt?: Date | string
    answeredAt?: Date | string | null
    completedAt?: Date | string | null
    triggeredBy: string
    errorMessage?: string | null
    contest: ContestCreateNestedOneWithoutCallLogsInput
  }

  export type CallLogUncheckedCreateWithoutStudentInput = {
    id?: string
    contestId: string
    vapiCallId?: string | null
    callStatus?: string
    whatsappSent?: boolean
    whatsappStatus?: string | null
    initiatedAt?: Date | string
    answeredAt?: Date | string | null
    completedAt?: Date | string | null
    triggeredBy: string
    errorMessage?: string | null
  }

  export type CallLogCreateOrConnectWithoutStudentInput = {
    where: CallLogWhereUniqueInput
    create: XOR<CallLogCreateWithoutStudentInput, CallLogUncheckedCreateWithoutStudentInput>
  }

  export type CallLogCreateManyStudentInputEnvelope = {
    data: CallLogCreateManyStudentInput | CallLogCreateManyStudentInput[]
  }

  export type ParticipationUpsertWithWhereUniqueWithoutStudentInput = {
    where: ParticipationWhereUniqueInput
    update: XOR<ParticipationUpdateWithoutStudentInput, ParticipationUncheckedUpdateWithoutStudentInput>
    create: XOR<ParticipationCreateWithoutStudentInput, ParticipationUncheckedCreateWithoutStudentInput>
  }

  export type ParticipationUpdateWithWhereUniqueWithoutStudentInput = {
    where: ParticipationWhereUniqueInput
    data: XOR<ParticipationUpdateWithoutStudentInput, ParticipationUncheckedUpdateWithoutStudentInput>
  }

  export type ParticipationUpdateManyWithWhereWithoutStudentInput = {
    where: ParticipationScalarWhereInput
    data: XOR<ParticipationUpdateManyMutationInput, ParticipationUncheckedUpdateManyWithoutStudentInput>
  }

  export type ParticipationScalarWhereInput = {
    AND?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
    OR?: ParticipationScalarWhereInput[]
    NOT?: ParticipationScalarWhereInput | ParticipationScalarWhereInput[]
    id?: StringFilter<"Participation"> | string
    studentId?: StringFilter<"Participation"> | string
    contestId?: StringFilter<"Participation"> | string
    status?: StringFilter<"Participation"> | string
    joinedAt?: DateTimeNullableFilter<"Participation"> | Date | string | null
    updatedAt?: DateTimeFilter<"Participation"> | Date | string
  }

  export type CallLogUpsertWithWhereUniqueWithoutStudentInput = {
    where: CallLogWhereUniqueInput
    update: XOR<CallLogUpdateWithoutStudentInput, CallLogUncheckedUpdateWithoutStudentInput>
    create: XOR<CallLogCreateWithoutStudentInput, CallLogUncheckedCreateWithoutStudentInput>
  }

  export type CallLogUpdateWithWhereUniqueWithoutStudentInput = {
    where: CallLogWhereUniqueInput
    data: XOR<CallLogUpdateWithoutStudentInput, CallLogUncheckedUpdateWithoutStudentInput>
  }

  export type CallLogUpdateManyWithWhereWithoutStudentInput = {
    where: CallLogScalarWhereInput
    data: XOR<CallLogUpdateManyMutationInput, CallLogUncheckedUpdateManyWithoutStudentInput>
  }

  export type CallLogScalarWhereInput = {
    AND?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
    OR?: CallLogScalarWhereInput[]
    NOT?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
    id?: StringFilter<"CallLog"> | string
    studentId?: StringFilter<"CallLog"> | string
    contestId?: StringFilter<"CallLog"> | string
    vapiCallId?: StringNullableFilter<"CallLog"> | string | null
    callStatus?: StringFilter<"CallLog"> | string
    whatsappSent?: BoolFilter<"CallLog"> | boolean
    whatsappStatus?: StringNullableFilter<"CallLog"> | string | null
    initiatedAt?: DateTimeFilter<"CallLog"> | Date | string
    answeredAt?: DateTimeNullableFilter<"CallLog"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CallLog"> | Date | string | null
    triggeredBy?: StringFilter<"CallLog"> | string
    errorMessage?: StringNullableFilter<"CallLog"> | string | null
  }

  export type ParticipationCreateWithoutContestInput = {
    id?: string
    status?: string
    joinedAt?: Date | string | null
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutParticipationsInput
  }

  export type ParticipationUncheckedCreateWithoutContestInput = {
    id?: string
    studentId: string
    status?: string
    joinedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ParticipationCreateOrConnectWithoutContestInput = {
    where: ParticipationWhereUniqueInput
    create: XOR<ParticipationCreateWithoutContestInput, ParticipationUncheckedCreateWithoutContestInput>
  }

  export type ParticipationCreateManyContestInputEnvelope = {
    data: ParticipationCreateManyContestInput | ParticipationCreateManyContestInput[]
  }

  export type CallLogCreateWithoutContestInput = {
    id?: string
    vapiCallId?: string | null
    callStatus?: string
    whatsappSent?: boolean
    whatsappStatus?: string | null
    initiatedAt?: Date | string
    answeredAt?: Date | string | null
    completedAt?: Date | string | null
    triggeredBy: string
    errorMessage?: string | null
    student: StudentCreateNestedOneWithoutCallLogsInput
  }

  export type CallLogUncheckedCreateWithoutContestInput = {
    id?: string
    studentId: string
    vapiCallId?: string | null
    callStatus?: string
    whatsappSent?: boolean
    whatsappStatus?: string | null
    initiatedAt?: Date | string
    answeredAt?: Date | string | null
    completedAt?: Date | string | null
    triggeredBy: string
    errorMessage?: string | null
  }

  export type CallLogCreateOrConnectWithoutContestInput = {
    where: CallLogWhereUniqueInput
    create: XOR<CallLogCreateWithoutContestInput, CallLogUncheckedCreateWithoutContestInput>
  }

  export type CallLogCreateManyContestInputEnvelope = {
    data: CallLogCreateManyContestInput | CallLogCreateManyContestInput[]
  }

  export type ParticipationUpsertWithWhereUniqueWithoutContestInput = {
    where: ParticipationWhereUniqueInput
    update: XOR<ParticipationUpdateWithoutContestInput, ParticipationUncheckedUpdateWithoutContestInput>
    create: XOR<ParticipationCreateWithoutContestInput, ParticipationUncheckedCreateWithoutContestInput>
  }

  export type ParticipationUpdateWithWhereUniqueWithoutContestInput = {
    where: ParticipationWhereUniqueInput
    data: XOR<ParticipationUpdateWithoutContestInput, ParticipationUncheckedUpdateWithoutContestInput>
  }

  export type ParticipationUpdateManyWithWhereWithoutContestInput = {
    where: ParticipationScalarWhereInput
    data: XOR<ParticipationUpdateManyMutationInput, ParticipationUncheckedUpdateManyWithoutContestInput>
  }

  export type CallLogUpsertWithWhereUniqueWithoutContestInput = {
    where: CallLogWhereUniqueInput
    update: XOR<CallLogUpdateWithoutContestInput, CallLogUncheckedUpdateWithoutContestInput>
    create: XOR<CallLogCreateWithoutContestInput, CallLogUncheckedCreateWithoutContestInput>
  }

  export type CallLogUpdateWithWhereUniqueWithoutContestInput = {
    where: CallLogWhereUniqueInput
    data: XOR<CallLogUpdateWithoutContestInput, CallLogUncheckedUpdateWithoutContestInput>
  }

  export type CallLogUpdateManyWithWhereWithoutContestInput = {
    where: CallLogScalarWhereInput
    data: XOR<CallLogUpdateManyMutationInput, CallLogUncheckedUpdateManyWithoutContestInput>
  }

  export type StudentCreateWithoutParticipationsInput = {
    id?: string
    name: string
    rollNo: string
    year?: number
    department?: string
    section?: string | null
    passwordHash?: string
    phone: string
    email: string
    leetcodeId?: string | null
    skillrackId?: string | null
    createdAt?: Date | string
    cgpa?: number | null
    githubId?: string | null
    hackathonCount?: number | null
    semesterHistory?: string | null
    callLogs?: CallLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutParticipationsInput = {
    id?: string
    name: string
    rollNo: string
    year?: number
    department?: string
    section?: string | null
    passwordHash?: string
    phone: string
    email: string
    leetcodeId?: string | null
    skillrackId?: string | null
    createdAt?: Date | string
    cgpa?: number | null
    githubId?: string | null
    hackathonCount?: number | null
    semesterHistory?: string | null
    callLogs?: CallLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutParticipationsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutParticipationsInput, StudentUncheckedCreateWithoutParticipationsInput>
  }

  export type ContestCreateWithoutParticipationsInput = {
    id?: string
    name: string
    platform: string
    externalId: string
    scheduledAt: Date | string
    durationMins: number
    cronJobId?: string | null
    status?: string
    createdAt?: Date | string
    callLogs?: CallLogCreateNestedManyWithoutContestInput
  }

  export type ContestUncheckedCreateWithoutParticipationsInput = {
    id?: string
    name: string
    platform: string
    externalId: string
    scheduledAt: Date | string
    durationMins: number
    cronJobId?: string | null
    status?: string
    createdAt?: Date | string
    callLogs?: CallLogUncheckedCreateNestedManyWithoutContestInput
  }

  export type ContestCreateOrConnectWithoutParticipationsInput = {
    where: ContestWhereUniqueInput
    create: XOR<ContestCreateWithoutParticipationsInput, ContestUncheckedCreateWithoutParticipationsInput>
  }

  export type StudentUpsertWithoutParticipationsInput = {
    update: XOR<StudentUpdateWithoutParticipationsInput, StudentUncheckedUpdateWithoutParticipationsInput>
    create: XOR<StudentCreateWithoutParticipationsInput, StudentUncheckedCreateWithoutParticipationsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutParticipationsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutParticipationsInput, StudentUncheckedUpdateWithoutParticipationsInput>
  }

  export type StudentUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    department?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableStringFieldUpdateOperationsInput | string | null
    skillrackId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    githubId?: NullableStringFieldUpdateOperationsInput | string | null
    hackathonCount?: NullableIntFieldUpdateOperationsInput | number | null
    semesterHistory?: NullableStringFieldUpdateOperationsInput | string | null
    callLogs?: CallLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    department?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableStringFieldUpdateOperationsInput | string | null
    skillrackId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    githubId?: NullableStringFieldUpdateOperationsInput | string | null
    hackathonCount?: NullableIntFieldUpdateOperationsInput | number | null
    semesterHistory?: NullableStringFieldUpdateOperationsInput | string | null
    callLogs?: CallLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ContestUpsertWithoutParticipationsInput = {
    update: XOR<ContestUpdateWithoutParticipationsInput, ContestUncheckedUpdateWithoutParticipationsInput>
    create: XOR<ContestCreateWithoutParticipationsInput, ContestUncheckedCreateWithoutParticipationsInput>
    where?: ContestWhereInput
  }

  export type ContestUpdateToOneWithWhereWithoutParticipationsInput = {
    where?: ContestWhereInput
    data: XOR<ContestUpdateWithoutParticipationsInput, ContestUncheckedUpdateWithoutParticipationsInput>
  }

  export type ContestUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMins?: IntFieldUpdateOperationsInput | number
    cronJobId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callLogs?: CallLogUpdateManyWithoutContestNestedInput
  }

  export type ContestUncheckedUpdateWithoutParticipationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMins?: IntFieldUpdateOperationsInput | number
    cronJobId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callLogs?: CallLogUncheckedUpdateManyWithoutContestNestedInput
  }

  export type StudentCreateWithoutCallLogsInput = {
    id?: string
    name: string
    rollNo: string
    year?: number
    department?: string
    section?: string | null
    passwordHash?: string
    phone: string
    email: string
    leetcodeId?: string | null
    skillrackId?: string | null
    createdAt?: Date | string
    cgpa?: number | null
    githubId?: string | null
    hackathonCount?: number | null
    semesterHistory?: string | null
    participations?: ParticipationCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutCallLogsInput = {
    id?: string
    name: string
    rollNo: string
    year?: number
    department?: string
    section?: string | null
    passwordHash?: string
    phone: string
    email: string
    leetcodeId?: string | null
    skillrackId?: string | null
    createdAt?: Date | string
    cgpa?: number | null
    githubId?: string | null
    hackathonCount?: number | null
    semesterHistory?: string | null
    participations?: ParticipationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutCallLogsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutCallLogsInput, StudentUncheckedCreateWithoutCallLogsInput>
  }

  export type ContestCreateWithoutCallLogsInput = {
    id?: string
    name: string
    platform: string
    externalId: string
    scheduledAt: Date | string
    durationMins: number
    cronJobId?: string | null
    status?: string
    createdAt?: Date | string
    participations?: ParticipationCreateNestedManyWithoutContestInput
  }

  export type ContestUncheckedCreateWithoutCallLogsInput = {
    id?: string
    name: string
    platform: string
    externalId: string
    scheduledAt: Date | string
    durationMins: number
    cronJobId?: string | null
    status?: string
    createdAt?: Date | string
    participations?: ParticipationUncheckedCreateNestedManyWithoutContestInput
  }

  export type ContestCreateOrConnectWithoutCallLogsInput = {
    where: ContestWhereUniqueInput
    create: XOR<ContestCreateWithoutCallLogsInput, ContestUncheckedCreateWithoutCallLogsInput>
  }

  export type StudentUpsertWithoutCallLogsInput = {
    update: XOR<StudentUpdateWithoutCallLogsInput, StudentUncheckedUpdateWithoutCallLogsInput>
    create: XOR<StudentCreateWithoutCallLogsInput, StudentUncheckedCreateWithoutCallLogsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutCallLogsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutCallLogsInput, StudentUncheckedUpdateWithoutCallLogsInput>
  }

  export type StudentUpdateWithoutCallLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    department?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableStringFieldUpdateOperationsInput | string | null
    skillrackId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    githubId?: NullableStringFieldUpdateOperationsInput | string | null
    hackathonCount?: NullableIntFieldUpdateOperationsInput | number | null
    semesterHistory?: NullableStringFieldUpdateOperationsInput | string | null
    participations?: ParticipationUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutCallLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rollNo?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    department?: StringFieldUpdateOperationsInput | string
    section?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    leetcodeId?: NullableStringFieldUpdateOperationsInput | string | null
    skillrackId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    githubId?: NullableStringFieldUpdateOperationsInput | string | null
    hackathonCount?: NullableIntFieldUpdateOperationsInput | number | null
    semesterHistory?: NullableStringFieldUpdateOperationsInput | string | null
    participations?: ParticipationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ContestUpsertWithoutCallLogsInput = {
    update: XOR<ContestUpdateWithoutCallLogsInput, ContestUncheckedUpdateWithoutCallLogsInput>
    create: XOR<ContestCreateWithoutCallLogsInput, ContestUncheckedCreateWithoutCallLogsInput>
    where?: ContestWhereInput
  }

  export type ContestUpdateToOneWithWhereWithoutCallLogsInput = {
    where?: ContestWhereInput
    data: XOR<ContestUpdateWithoutCallLogsInput, ContestUncheckedUpdateWithoutCallLogsInput>
  }

  export type ContestUpdateWithoutCallLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMins?: IntFieldUpdateOperationsInput | number
    cronJobId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: ParticipationUpdateManyWithoutContestNestedInput
  }

  export type ContestUncheckedUpdateWithoutCallLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMins?: IntFieldUpdateOperationsInput | number
    cronJobId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    participations?: ParticipationUncheckedUpdateManyWithoutContestNestedInput
  }

  export type ParticipationCreateManyStudentInput = {
    id?: string
    contestId: string
    status?: string
    joinedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type CallLogCreateManyStudentInput = {
    id?: string
    contestId: string
    vapiCallId?: string | null
    callStatus?: string
    whatsappSent?: boolean
    whatsappStatus?: string | null
    initiatedAt?: Date | string
    answeredAt?: Date | string | null
    completedAt?: Date | string | null
    triggeredBy: string
    errorMessage?: string | null
  }

  export type ParticipationUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contest?: ContestUpdateOneRequiredWithoutParticipationsNestedInput
  }

  export type ParticipationUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    vapiCallId?: NullableStringFieldUpdateOperationsInput | string | null
    callStatus?: StringFieldUpdateOperationsInput | string
    whatsappSent?: BoolFieldUpdateOperationsInput | boolean
    whatsappStatus?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    contest?: ContestUpdateOneRequiredWithoutCallLogsNestedInput
  }

  export type CallLogUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    vapiCallId?: NullableStringFieldUpdateOperationsInput | string | null
    callStatus?: StringFieldUpdateOperationsInput | string
    whatsappSent?: BoolFieldUpdateOperationsInput | boolean
    whatsappStatus?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CallLogUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    contestId?: StringFieldUpdateOperationsInput | string
    vapiCallId?: NullableStringFieldUpdateOperationsInput | string | null
    callStatus?: StringFieldUpdateOperationsInput | string
    whatsappSent?: BoolFieldUpdateOperationsInput | boolean
    whatsappStatus?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParticipationCreateManyContestInput = {
    id?: string
    studentId: string
    status?: string
    joinedAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type CallLogCreateManyContestInput = {
    id?: string
    studentId: string
    vapiCallId?: string | null
    callStatus?: string
    whatsappSent?: boolean
    whatsappStatus?: string | null
    initiatedAt?: Date | string
    answeredAt?: Date | string | null
    completedAt?: Date | string | null
    triggeredBy: string
    errorMessage?: string | null
  }

  export type ParticipationUpdateWithoutContestInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutParticipationsNestedInput
  }

  export type ParticipationUncheckedUpdateWithoutContestInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipationUncheckedUpdateManyWithoutContestInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    joinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogUpdateWithoutContestInput = {
    id?: StringFieldUpdateOperationsInput | string
    vapiCallId?: NullableStringFieldUpdateOperationsInput | string | null
    callStatus?: StringFieldUpdateOperationsInput | string
    whatsappSent?: BoolFieldUpdateOperationsInput | boolean
    whatsappStatus?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    student?: StudentUpdateOneRequiredWithoutCallLogsNestedInput
  }

  export type CallLogUncheckedUpdateWithoutContestInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    vapiCallId?: NullableStringFieldUpdateOperationsInput | string | null
    callStatus?: StringFieldUpdateOperationsInput | string
    whatsappSent?: BoolFieldUpdateOperationsInput | boolean
    whatsappStatus?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CallLogUncheckedUpdateManyWithoutContestInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    vapiCallId?: NullableStringFieldUpdateOperationsInput | string | null
    callStatus?: StringFieldUpdateOperationsInput | string
    whatsappSent?: BoolFieldUpdateOperationsInput | boolean
    whatsappStatus?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use StudentCountOutputTypeDefaultArgs instead
     */
    export type StudentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContestCountOutputTypeDefaultArgs instead
     */
    export type ContestCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContestCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentDefaultArgs instead
     */
    export type StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContestDefaultArgs instead
     */
    export type ContestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ParticipationDefaultArgs instead
     */
    export type ParticipationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ParticipationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CallLogDefaultArgs instead
     */
    export type CallLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CallLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}