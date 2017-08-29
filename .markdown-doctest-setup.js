module.exports = {
  require: {
    'cycle-webworker': require('.'),
    '@cycle/run': ({run: () => {}})
  }
}
