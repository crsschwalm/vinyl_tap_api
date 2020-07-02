# Vinyl Tap API

## Pre-reqs

1. Install Serverless Framework\
   (`yarn global add serverless`)
2. [Configure Serverless Credentials](https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/)
3. [Java Runtime Environment >= 6.x](https://www.npmjs.com/package/serverless-dynamodb-local#this-plugin-requires) for running DynamoDB locally
4. Install application dependencies\
   (`yarn`)

### Running Locally

Serverless Framework's local development server.

- [Serverless Offline](https://www.npmjs.com/package/serverless-offline)
- [DynamoDB Plugin](https://www.npmjs.com/package/serverless-dynamodb-local)

From root, run:\
`serverless offline start`

### Deploying

From root, run:\
`serverless deploy`

### Optional Seeding

To get started, there is a script to seed the DB with 5 mock records. (only run at initial setup)
From root, run:\
`yarn setup:seed`

## Usage

You can create, retrieve, update, or delete records with the following commands:

### Create a Record

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/records --data '{ "text": "Learn Serverless" }'
```

### List all records

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/records
```

### Get one Record

```bash
# Replace the <id> part with a real id from your records table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/records/<id>
```

### Update a Record

```bash
# Replace the <id> part with a real id from your records table
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/records/<id> --data '{ "text": "Learn Serverless", "checked": true }'
```

### Delete a Record

```bash
# Replace the <id> part with a real id from your records table
curl -X DELETE https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/records/<id>
```
