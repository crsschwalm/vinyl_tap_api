import { DynamoDB } from 'aws-sdk';
import { Album } from '../types';
import { normalizeAlbum } from '../services/record-normalizer';

const dynamoDb = new DynamoDB.DocumentClient();

export const update = (
  { body, pathParameters }: { body: string; pathParameters: { id: string } },
  context,
  callback,
  dynamoClient = dynamoDb,
) => {
  const data: Partial<Album> = JSON.parse(body);

  try {
    const album = normalizeAlbum(data);

    const params = {
      TableName: process.env.DYNAMODB_TABLE!,
      Key: {
        id: pathParameters.id,
      },
      ExpressionAttributeNames: {
        '#record_name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': album.name,
        ':image': album.image,
        ':artists': album.artists,
        ':tracks': album.tracks,
        ':genres': album.genres,
        ':updatedAt': album.updatedAt,
      },
      UpdateExpression:
        'SET #record_name = :name, image = :image, artists = :artists, tracks = :tracks, genres = :genres, updatedAt = :updatedAt',
      ReturnValues: 'ALL_NEW',
    };

    dynamoClient.update(params, (error, result) => {
      if (error) {
        throw error;
      }

      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(result.Attributes),
      });
    });
  } catch (e) {
    console.error(e);
    callback(null, {
      statusCode: e.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: e.message || "Couldn't fetch the record item :(",
    });
  }
};
