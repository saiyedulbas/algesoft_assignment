import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import { TeamEntity } from "./entity";


const dynamoDb = new DynamoDB.DocumentClient();

export async function main() {
  const params = {
    TableName: Table.final_table.tableName,
  };


    const result = await TeamEntity.query.teams({}).go();
  

  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
