function mockState() {
  return {
    events: {}
  }
}

function mockEvents(events, emitted = {}) {
  return {
    on(event, fn) {
      events[event] = fn
    },
    emit(event, ...args) {
      emitted[event].call(args)
    }
  }
}

module.exports = {mockState, mockEvents}
