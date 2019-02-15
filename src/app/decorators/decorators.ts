import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {QuerySnapshot} from 'firebase/firestore';
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

export interface Pendable {
  pending: any;
}

export const Array$ToObj$ = function (key: string) {
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const method = descriptor.value;

    descriptor.value = function () {
      const result$ = method.call(this, arguments) as Observable<any>;
      return result$.pipe(
        map((arr) => {
          return arr.reduce((acc, curr) => {
            acc[curr[key]] = curr;
            return acc;
          }, {});
        })
      );
    };

    return descriptor;
  };
};

export const Obj$ToArray$ = function () {
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const method = descriptor.value;

    descriptor.value = function () {
      const result$ = method.call(this, arguments) as Observable<any>;
      return result$.pipe(map((obj) => obj ? Object.values(obj) : null));
    };

    return descriptor;
  };
};

export const OpInProg = function (key) {
  return function (target: Pendable, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

    const method = descriptor.value;

    descriptor.value = function () {
      this.pending[key] = true;
      const result$ = method.call(this, arguments) as Observable<any>;
      return result$.pipe(
        tap(_ => {
          this.pending[key] = false;
        })
      );
    };

    return descriptor;
  };
};

export const ToEvent = function (key: string) {
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const method = descriptor.value;

    descriptor.value = function () {
      const result$ = method.apply(this, arguments) as Observable<any>;
      return result$.pipe(map((res) => ({type: key + '_COMPLETE', payload: res})));
    };

    return descriptor;
  };
};

export const FireBaseTransform = function () {
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const method = descriptor.value;

    descriptor.value = function () {
      const result$ = method.apply(this, arguments) as Observable<any>;
      return result$.pipe(map((res: QuerySnapshot) => res.docs
        .map((y: QueryDocumentSnapshot) => y.data()))
      );
    };

    return descriptor;
  };
};


export const SnackBar = function () {
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const method = descriptor.value;

    descriptor.value = function () {
      const result$ = method.apply(this, arguments) as Observable<any>;
      return result$.pipe(map((res) => {
        const meta = res.meta ? {...res.meta, snackBar: true} : {snackBar: true};
        return {...res, meta};
      }));
    };

    return descriptor;
  };
};


export const DistinctUntilChanged = function () {
  const cache = {};
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const key: symbol = Symbol(propertyKey);
    if (typeof descriptor.value === 'function') {
      return distinctUntilChangedMethod(key, cache)(target, propertyKey, descriptor);
    } else if (typeof descriptor.set === 'function') {
      return distinctUntilChangedSet(key, cache)(target, propertyKey, descriptor);
    } else {
      throw new Error('@DistinctUntilChanged decorator can be applied to methods or getters, got ' + String(descriptor.value) + ' instead');
    }
  };
};

function getValue(args: any[]) {
  if (args.length > 1) {
    throw new Error('@DistinctUntilChanged only work with 1 arguments');
  }
  return JSON.stringify(args[0]);
}

const distinctUntilChangedMethod = function (key, cache) {

  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const method = descriptor.value;
    descriptor.value = function () {
      const val = getValue(Array.from(arguments));
      if (cache[key] !== val) {
        cache[key] = val;
        return method.apply(this, arguments);
      }
    };
    return descriptor;
  };
};

const distinctUntilChangedSet = function (key, cache) {

  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const method = descriptor.set;
    descriptor.set = function () {
      const val = getValue(Array.from(arguments));
      if (cache[key] !== val) {
        cache[key] = val;
        return method.apply(this, arguments);
      }
    };
    return descriptor;
  };
};



