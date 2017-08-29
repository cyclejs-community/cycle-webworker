# cycle-webworker

> A straightforward webworker driver for Cycle.js

This module allows you to send and receive messages to Web Workers with Cycle.js.

If you have not used Web Workers before, please see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

## Usage

```js
import {makeWebWorkerDriver} from 'cycle-webworker';
import {run} from '@cycle/run';

const drivers = {
  Worker: makeWebWorkerDriver('/worker.js')
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

`makeWebWorkerDriver` takes a single argument, the source for the worker.

This is generally the URI to load the script from, but it's also possible to encode JavaScript code into this source.

This argument is passed directly to `new Worker()`.

Please see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) for specifics around different forms this option can take.

The resulting driver takes a stream of messages to send to the worker as sinks, and returns a stream of messages from the worker.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install cycle-webworker
```

## License

MIT

