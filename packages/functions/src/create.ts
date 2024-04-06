import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import { Entity, EntityConfiguration } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { TeamEntity } from "./entity";

import * as uuid from "uuid";

const Client = new DynamoDBClient({});



const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const data = JSON.parse(event.body);
  const name= data.name;
  const result = await TeamEntity.create({
    name,
    profile: data.profile,
    teamId: data.teamId,
  }).go();

  return {
    statusCode: 200,
    body: JSON.stringify(result.data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

