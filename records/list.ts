import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

const params: DynamoDB.DocumentClient.ScanInput = {
  TableName: process.env.DYNAMODB_TABLE!,
};

export const list = (event, context, callback) => {
  dynamoDb.scan(params, (error, result) => {
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
      body: JSON.stringify(result.Items),
    });
  });
};
