import { update } from './update';

describe('update', () => {
  it('should handle errors', () => {
    console.error = jest.fn();
    const mockCallback = jest.fn();

    update(
      { body: '{"key": "value"}', pathParameters: { id: 'to-update' } },
      {},
      mockCallback,
    );

    expect(mockCallback).toHaveBeenCalledWith(null, {
      statusCode: 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'No album name supplied',
    });
  });

  it('should call the DynamoDB update function', () => {
    const mockDynamoClient = { update: jest.fn() };
    update(
      { body: '{"name": "newValue"}', pathParameters: { id: 'to-update' } },
      {},
      () => {},
      mockDynamoClient,
    );

    expect(mockDynamoClient.update).toHaveBeenCalled();
  });
});
