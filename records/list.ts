import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

const params: DynamoDB.DocumentClient.ScanInput = {
  TableName: process.env.DYNAMODB_TABLE!,
};

export const list = (event, context, callback, dynamoClient = dynamoDb) => {
  dynamoClient.scan(params, (error, result) => {
    if (error) {
      console.error(error);

      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: error.message || "Couldn't fetch the records :(",
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Items),
    });
  });
};
