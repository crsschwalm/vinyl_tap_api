import { DynamoDB } from 'aws-sdk';
import { Album } from '../types';
import { normalizeAlbum } from '../services/record-normalizer';

const dynamoDb = new DynamoDB.DocumentClient();

export const create = (
  { body }: { body: string },
  context,
  callback,
  dynamoClient = dynamoDb,
) => {
  const data: Partial<Album> = JSON.parse(body);

  try {
    const album = normalizeAlbum(data);

    const params = {
      TableName: process.env.DYNAMODB_TABLE!,
      Item: album,
    };

    dynamoClient.put(params, (error) => {
      if (error) {
        throw error;
      }

      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(params.Item),
      });
    });
  } catch (e) {
    console.error('Failed Creation', e);
    callback(null, {
      statusCode: e.statusCode || 400,
      headers: { 'Content-Type': 'text/plain' },
      body: e.message || "Couldn't create the record item :(",
    });
  }
};
