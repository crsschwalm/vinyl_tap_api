import { get } from './get';

describe('get', () => {
  it('should call the DynamoDB get function', () => {
    const mockDynamoClient = { get: jest.fn() };
    get({ pathParameters: { id: 'to-get' } }, {}, () => {}, mockDynamoClient);

    expect(mockDynamoClient.get).toHaveBeenCalled();
  });
});
