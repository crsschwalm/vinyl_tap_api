import { delete as _delete } from './delete';

describe('delete (calling as _delete)', () => {
  it('should call the DynamoDB delete function', () => {
    const mockDynamoClient = { delete: jest.fn() };
    _delete(
      { pathParameters: { id: 'to-delete' } },
      {},
      () => {},
      mockDynamoClient,
    );

    expect(mockDynamoClient.delete).toHaveBeenCalled();
  });
});
