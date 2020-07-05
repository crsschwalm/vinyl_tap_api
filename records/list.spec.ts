import { list } from './list';

describe('list', () => {
  it('should call the DynamoDB list function', () => {
    const mockDynamoClient = { scan: jest.fn() };
    list({}, {}, () => {}, mockDynamoClient);

    expect(mockDynamoClient.scan).toHaveBeenCalled();
  });
});
