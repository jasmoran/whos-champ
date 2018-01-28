var express = require('express')
var app = express()

const data = {
  regions: {
    '04jp51zq': { id: '04jp51zq', name: 'Wellington' },
    'ltpkbcoe': { id: 'ltpkbcoe', name: 'Auckland' },
    'cmh2h4r8': { id: 'cmh2h4r8', name: 'Napier' },
    'ahqq2j94': { id: 'ahqq2j94', name: 'London' },
    'txlcs06u': { id: 'txlcs06u', name: 'World' }
  },
  users: {
    'gb9mi5xl': { id: 'gb9mi5xl', name: 'Person 0' },
    'z3g4ccgj': { id: 'z3g4ccgj', name: 'Person 1' },
    'w9xacb5s': { id: 'w9xacb5s', name: 'Person 2' },
    'p0lxe44x': { id: 'p0lxe44x', name: 'Person 3' },
    'e14m9b5u': { id: 'e14m9b5u', name: 'Person 4' }
  },
  results: [
    { region: 'ltpkbcoe', winner: 'gb9mi5xl', date: '2018-01-27', score: 0},
    { region: 'ahqq2j94', winner: 'gb9mi5xl', date: '2018-01-27', score: 3},
    { region: 'txlcs06u', winner: 'p0lxe44x', date: '2018-01-23', score: 45}
  ]
};

app.get('/api/state', function (req, res) {
  res.send(data)
})

app.listen(3001, function () {
  console.log('Listening on port 3001')
})
