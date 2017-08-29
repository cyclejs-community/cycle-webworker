import { makeDOMDriver, DOMSource, VNode, div, input } from '@cycle/dom';
import { run } from '@cycle/run';
import xs, { Stream } from 'xstream';

import { makeWebWorkerDriver, WorkerSource, WorkerSink } from '../src';

interface ISources {
  Worker: WorkerSource;
  DOM: DOMSource;
}

interface ISinks {
  Worker: WorkerSink;
  DOM: Stream<VNode>;
}

function main(sources: ISources): ISinks {
  const result$ = sources.Worker.startWith('1');

  const number$ = sources.DOM
    .select('.number')
    .events('change')
    .map((ev: any) => ev.target.value)
    .startWith(1);

  const calculating$ = xs.merge(
    number$.mapTo(true),
    result$.mapTo(false)
  ).startWith(false);

  return {
    DOM: xs.combine(result$, number$, calculating$).map(([result, number, calculating]) =>
      div('.example', [
        input('.number', { attrs: { type: 'range', min: 1, max: 40, value: 1 } }),

        div('.result', [
          `Fibonacci number ${number}: ${calculating ? 'Calculating...' : result}`
        ])
      ])
    ),

    Worker: number$
  };
}

const drivers = {
  DOM: makeDOMDriver(document.body),
  Worker: makeWebWorkerDriver('worker.js')
};

run(main, drivers);
