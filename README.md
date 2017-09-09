# cycle-webworker

> A straightforward webworker driver for Cycle.js

This module allows you to send and receive messages to Web Workers with Cycle.js.

If you have not used Web Workers before, please see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

## Usage

```js
import {makeWebWorkerDriver} from 'cycle-webworker';
import {run} from '@cycle/run';

const drivers = {
  Worker: makeWebWorkerDriver(new Worker('/worker.js'))
}

function main (sources) {
  const result$ = sources.Worker;

  const outgoingMessage$ = xs.of('test!');

  return {
    Worker: outgoingMessage$
  }
}

run(main, drivers);
```

There is a working example in `example/`. To run it, clone this project, `npm install && npm start`.

## API

```js
import {makeWebWorkerDriver} from 'cycle-webworker';
```

`makeWebWorkerDriver` takes a single argument, the worker.

This is generally constructed by calling `new Worker()` with a source url for the worker code, but also allows for use of libraries like [webworkify](https://github.com/browserify/webworkify).

Please see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) for documentation around creating workers.

The resulting driver takes a stream of messages to send to the worker as sinks, and returns a stream of messages from the worker.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install cycle-webworker
```

## License

MIT

