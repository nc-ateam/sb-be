const NODE_ENV = process.env.NODE_ENV || 'dev';

const config = {
  dev: {
    DB_URL: `mongodb://localhost:27017/StampBook`
  },
  test: {
    DB_URL: `mongodb://localhost:27017/StampBook`
  },
  production: {
    DB_URL: `mongodb://team_na:Whiteboard74!@ds125602.mlab.com:25602/stamp-box`
  }
};

module.exports = config[NODE_ENV];