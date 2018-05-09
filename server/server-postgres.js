/* Postgres Server */
const Pool = require('pg-pool');

const pool = new Pool({
  password: '1',
  database: 'nearby'
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

let queryPostgres = (req, res) => {
  const placeId = req.params.id;

  const results = [];
  pool.query('SELECT * FROM restaurants WHERE place_id = ' + placeId, (err, data) => {
    if (err) {
      res.status(500);
      console.log(err);
    } else {
      const nearbyArr = data.rows[0].nearby;
      results.push(data.rows[0]);

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
          results.push(data.rows);
          res.status(200);
          res.send(results);
        }
      })
    }
  });
};

module.exports = queryPostgres;