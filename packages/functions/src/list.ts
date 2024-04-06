import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export async function main() {
  const params = {
    TableName: Table.final_table.tableName,
  };

  const results = await dynamoDb.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
