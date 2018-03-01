// Based on: https://github.com/netcode/node-prettydate/blob/master/index.js

class DateUtil {
  readonly timezoneOffset = -new Date().getTimezoneOffset() / 60;
  readonly timezone = 'GMT' + ((this.timezoneOffset >= 0) ? '+' : '') + this.timezoneOffset;

  private readonly formatters = [
    { threshold: -31535999, handler: this.createHandler(-31536000, 'year',   'from now' ) },
    { threshold: -2591999,  handler: this.createHandler(-2592000,  'month',  'from now' ) },
    { threshold: -604799,   handler: this.createHandler(-604800,   'week',   'from now' ) },
    { threshold: -172799,   handler: this.createHandler(-86400,    'day',    'from now' ) },
    { threshold: -86399,    handler: () => 'tomorrow' },
    { threshold: -3599,     handler: this.createHandler(-3600,     'hour',   'from now' ) },
    { threshold: -59,       handler: this.createHandler(-60,       'minute', 'from now' ) },
    { threshold: -0.9999,   handler: this.createHandler(-1,        'second', 'from now' ) },
    { threshold: 1,         handler: () => 'just now' },
    { threshold: 60,        handler: this.createHandler(1,         'second', 'ago' ) },
    { threshold: 3600,      handler: this.createHandler(60,        'minute', 'ago' ) },
    { threshold: 86400,     handler: this.createHandler(3600,      'hour',   'ago' ) },
    { threshold: 172800,    handler: () => 'yesterday' },
    { threshold: 604800,    handler: this.createHandler(86400,     'day',    'ago' ) },
    { threshold: Infinity,  handler: (diff: number, date: Date) => `on ${this.short(date)}` }
  ];

  describe(date: Date) {
    const diff = (((new Date()).getTime() - date.getTime()) / 1000);
    for (var i = 0; i < this.formatters.length; i++) {
      if (diff < this.formatters[i].threshold) {
        return this.formatters[i].handler(diff, date);
      }
    }

    // should never be reached
    throw new Error('Exhausted all formatter options');
  }

  short(date: Date) {
    return this.zeroPad(date.getDate()) + '/' +
           this.zeroPad(date.getMonth() + 1) + '/' +
           date.getFullYear().toString().substring(2);
  }

  toInput(date: Date) {
    return date.getFullYear() + '-' +
           this.zeroPad(date.getMonth() + 1) + '-' +
           this.zeroPad(date.getDate());
  }

  fromInput(str: string) {
    return new Date(str + this.timezone);
  }

  private zeroPad(n: Number): string {
    const s = n.toString();
    if (s.length === 1) { return '0' + s; }
    return s;
  }

  private createHandler(divisor: number, noun: string, restOfString: string) {
    return function (diff: number, date: Date) {
      var n = Math.floor(diff / divisor);
      var pluralizedNoun = noun + (n > 1 ? 's' : '');
      return `${n} ${pluralizedNoun} ${restOfString}`;
    };
  }
}

export default new DateUtil();