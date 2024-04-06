import * as uuid from "uuid";
import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Table } from "sst/node/table";
import { TicketEntity } from "./entity";


const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const data = JSON.parse(event.body);

  const result = await TicketEntity.create({
    status: data.status,
    teamId: data.teamId,
    ticketId: data.ticketId,
    title: data.title,
  }).go();


  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};