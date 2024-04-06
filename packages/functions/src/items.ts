import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import { Entity, EntityConfiguration } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { TicketEntity } from "./entity";


const Client = new DynamoDBClient({});



const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const id = event.pathParameters.id
  const result = await TicketEntity.query.tickets({ teamId: id }).go();

  return {
    statusCode: 200,
    body: JSON.stringify(result.data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

