import { create } from './create';

describe('create', () => {
  it('should handle errors', () => {
    console.error = jest.fn();
    const mockCallback = jest.fn();

    create({ body: '{"key": "value"}' }, {}, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'No album name supplied',
    });
  });

  it('should call the DynamoDB put function', () => {
    const mockDynamoClient = { put: jest.fn() };
    create({ body: '{"name": "value"}' }, {}, () => {}, mockDynamoClient);

    expect(mockDynamoClient.put).toHaveBeenCalled();
  });
});
