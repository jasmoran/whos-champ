// Based on: https://github.com/netcode/node-prettydate/blob/master/index.js

function createHandler(divisor: number, noun: string, restOfString: string) {
  return function(diff: number, date: Date) {
    var n = Math.floor(diff / divisor);
    var pluralizedNoun = noun + ( n > 1 ? 's' : '' );
    return `${n} ${pluralizedNoun} ${restOfString}`;
  };
}

function short(date: Date) {
  const full = date.toLocaleDateString('en-AU');
  return full.substring(0, 6) + full.substring(8);
}

var formatters = [
  { threshold: -31535999, handler: createHandler(-31536000, 'year',   'from now' ) },
  { threshold: -2591999,  handler: createHandler(-2592000,  'month',  'from now' ) },
  { threshold: -604799,   handler: createHandler(-604800,   'week',   'from now' ) },
  { threshold: -172799,   handler: createHandler(-86400,    'day',    'from now' ) },
  { threshold: -86399,    handler: () => 'tomorrow' },
  { threshold: -3599,     handler: createHandler(-3600,     'hour',   'from now' ) },
  { threshold: -59,       handler: createHandler(-60,       'minute', 'from now' ) },
  { threshold: -0.9999,   handler: createHandler(-1,        'second', 'from now' ) },
  { threshold: 1,         handler: () => 'just now' },
  { threshold: 60,        handler: createHandler(1,         'second', 'ago' ) },
  { threshold: 3600,      handler: createHandler(60,        'minute', 'ago' ) },
  { threshold: 86400,     handler: createHandler(3600,      'hour',   'ago' ) },
  { threshold: 172800,    handler: () => 'yesterday' },
  { threshold: 604800,    handler: createHandler(86400,     'day',    'ago' ) },
  { threshold: Infinity,  handler: (diff: number, date: Date) => `on ${short(date)}` }
];

export default {
  describe: function (date: Date) {
    const diff = (((new Date()).getTime() - date.getTime()) / 1000);
    for (var i = 0; i < formatters.length; i++) {
      if (diff < formatters[i].threshold) {
        return formatters[i].handler(diff, date);
      }
    }
    throw new Error('exhausted all formatter options, none found'); // should never be reached
  },
  short,
  toInput: (date: Date) => date.toISOString().substr(0, 10)
};
