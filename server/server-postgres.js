/* Postgres Server */
const Pool = require('pg-pool');

const pool = new Pool({
  user: 'louis',
  password: '123',
  database: 'nearby'
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

let queryPostgres = (req, res) => {
  const placeId = req.params.id;
  console.log(`GET ${req.url}`);

  const results = [];
  pool.query('SELECT * FROM restaurants WHERE place_id = ' + placeId, (err, data) => {
    if (err) {
      res.status(500);
      console.log(err);
    } else {
      console.log('restaurant info: ', data);
      const nearbyArr = data.rows[0].nearby;
      console.log('Nearby Arr: ', nearbyArr);
      results.push(data.rows[0]);
      console.log('==============',results);

      pool.query('SELECT * FROM restaurants WHERE place_id IN ('
      + nearbyArr[0] + ','
       + nearbyArr[1] + ','
        + nearbyArr[2] + ','
         + nearbyArr[3] + ','
          + nearbyArr[4] + ','
           + nearbyArr[5] + ')',
            (err, data) => {

        if (err) {
          res.status(500);
          console.log(err);
        } else {
          console.log('recommended restaurants:', data);
          results.push(data.rows);
          console.log(`number of recommended: ${data.length}`);
          res.status(200);
          console.log('Results Length: ', results.length);
          res.send(results);
        }
      })
    }
  });
};

const query = (queryText, queryArgs, callback) =>
  pool.query(queryText, queryArgs)
    .then((res) => {
      callback(null, res.rows);
    })
    .catch((err) => {
      callback(err, null);
    });

module.exports = queryPostgres;