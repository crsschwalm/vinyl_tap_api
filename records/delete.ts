import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

const _delete = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE!,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.delete(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: error.message || "Couldn't remove the record item :(",
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({}),
    });
  });
};

//did not like naming function `delete`
export { _delete as delete };
