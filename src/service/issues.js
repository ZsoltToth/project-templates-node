const winston = require('winston');
const issueDao = require('../model/issues');

const DUMMY_ISSUE = {
  _id: '603c9813eb0dec3a97b29be7',
  title: 'Issue 1',
  description: 'string',
  state: 'open',
  __v: 0
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/service.log'
    }),
    new winston.transports.Console()
  ]
});

const createIssue = async (issue) => {
  try {
    return await issueDao.create(issue);
  } catch (err) {
    logger.error({
      message: 'Data Access Error',
      error: err
    });
    return err;
  }
};

const readIssues = () => {
  return new Promise((resolve, reject) => {
    resolve([DUMMY_ISSUE]);
  });
};

const readIssuesById = (id) => {
  return new Promise((resolve, reject) => {
    resolve(DUMMY_ISSUE);
  });
};

const changeSate = (id, state) => {
  return readIssuesById(id)
    .then(issue => {
      if (!isStateChangeAllowed(issue.state, state)) {
        logger.info(`Invalid State Change ${issue.state} => ${state}`);
        throw new Error({ msg: `Invalid State ohange ${issue.state} => ${state}` });
      }
      return issue;
    }).then(issue => {
      return DUMMY_ISSUE;
    });
};

const isStateChangeAllowed = (from, to) => {
  return true;
};

const changeStateToInProgress = (id) => {
  return changeSate(id, 'in progress');
};
const changeStateToResolved = (id) => {
  return changeSate(id, 'resolved');
};
const changeStateToClosed = (id) => {
  return changeSate(id, 'closed');
};

module.exports = {
  createIssue: createIssue,
  readIssues: readIssues,
  readIssuesById: readIssuesById,
  changeStateToInProgress: changeStateToInProgress,
  changeStateToResolved: changeStateToResolved,
  changeStateToClosed: changeStateToClosed
};
