jest.mock('../model/issues');
const dao = require('../model/issues');
const service = require('./issues');

describe('Test Issues Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Test Happy Path for Issue Creation', async () => {
    // given
    dao.create.mockImplementation(() => {
      return Promise.resolve({
        title: 'Title',
        description: 'Description'
      });
    });
    // when
    const actual = await service.createIssue({
      title: 'Title',
      description: 'Description'
    });
    // then
    expect(actual).toEqual({
      title: 'Title',
      description: 'Description'
    });
    expect(dao.create).toHaveBeenCalled();
  });
});
