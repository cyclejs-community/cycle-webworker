"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = require("@cycle/dom");
var run_1 = require("@cycle/run");
var xstream_1 = require("xstream");
var src_1 = require("../src");
function main(sources) {
    var result$ = sources.Worker.startWith('1');
    var number$ = sources.DOM
        .select('.number')
        .events('change')
        .map(function (ev) { return ev.target.value; })
        .startWith(1);
    var calculating$ = xstream_1.default.merge(number$.mapTo(true), result$.mapTo(false)).startWith(false);
    return {
        DOM: xstream_1.default.combine(result$, number$, calculating$).map(function (_a) {
            var result = _a[0], number = _a[1], calculating = _a[2];
            return dom_1.div('.example', [
                dom_1.input('.number', { attrs: { type: 'range', min: 1, max: 40, value: 1 } }),
                dom_1.div('.result', [
                    "Fibonacci number " + number + ": " + (calculating ? 'Calculating...' : result)
                ])
            ]);
        }),
        Worker: number$
    };
}
var drivers = {
    DOM: dom_1.makeDOMDriver(document.body),
    Worker: src_1.makeWebWorkerDriver('worker.js')
};
run_1.run(main, drivers);
