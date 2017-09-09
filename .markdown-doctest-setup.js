module.exports = {
  require: {
    'cycle-webworker': require('.'),
    '@cycle/run': ({run: () => {}})
  },

  globals: {
    Worker: function () {}
  }
}
