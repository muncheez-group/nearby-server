const Pool = require('pg-pool');
const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT;
const client = redis.createClient();
client.on('error', (err) => {
    console.log('error: ', err);
});

const pool = new Pool({
  password: '1',
  database: 'nearby',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const queryPostgres = (req, res) => {
  const placeId = req.params.id;
  const results = [];

  client.get(placeId, (error, result) => {
    if (result) {
      res.status(200);
      res.send(result);
    } else {
      pool.query('SELECT * FROM restaurants WHERE place_id = ' + placeId, (err, data) => {
        if (err) {
          res.status(500);
          console.log(err);
        } else {
          const nearbyArr = data.rows[0].nearby;
          results.push(data.rows[0]);
    
          pool.query(
            'SELECT * FROM restaurants WHERE place_id IN ('
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
                client.setex(placeId, 60, JSON.stringify(results));
                res.status(200);
                res.send(results);
              }
            },
          );
        }
      });
    }
  })


};

module.exports = queryPostgres;
