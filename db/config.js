const NODE_ENV = process.env.NODE_ENV || 'dev';

const config = {
  dev: {
    DB_URL: `mongodb://localhost:27017/StampBook`
  },
  test: {
    DB_URL: `mongodb://localhost:27017/StampBook`
  }
}

module.exports = config[NODE_ENV];