import isPromise from 'is-promise';

export default function errorMiddleware() {
  return next => action => {

    // If not a promise, continue on
    if (!isPromise(action.payload)) {
      return next(action);
    }
    /*
     * Another solution would would be to include a property in `meta`
     * and evaulate that property.
     *
     * if (action.meta.globalError === true) {
     *   // handle error
     * }
     *
     * The error middleware serves to dispatch the initial pending promise to
     * the promise middleware, but adds a `catch`.
     */

      // Dispatch initial pending promise, but catch any errors
      return next(action).catch(error => {
        console.warn(error);

        return error;
      });
  };
}