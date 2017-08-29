import xs, {Stream} from 'xstream';

export function makeWebWorkerDriver(workerSource: string) {
  return function (sink$: Stream<any>): Stream<string> {
    const worker = new Worker(workerSource);

    sink$.addListener({
      next (ev: any) {
        worker.postMessage(ev);
      },

      error (err: Error) {
        throw err;
      },

      complete () {}
    });

    return xs.create<string>({
      start (listener) {
        worker.onmessage = (ev: MessageEvent) => listener.next(ev.data);
      },

      stop () {
        worker.terminate();
      }
    });
  }
}

export type WorkerSource = Stream<string>;
export type WorkerSink = Stream<any>;
