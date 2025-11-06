const http = require('http');

const url = process.argv[2] || 'http://localhost:3012/api/tickets';

http.get(url, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('HEADERS:', JSON.stringify(res.headers, null, 2));
    console.log('BODY:', data);
    process.exit(0);
  });
}).on('error', err => {
  console.error('ERROR:', err.message || err);
  process.exit(1);
});