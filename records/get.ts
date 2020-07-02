import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE!,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't fetch the record item :(",
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    });
  });
};
