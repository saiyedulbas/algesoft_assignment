import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { TicketEntity } from "./entity";


const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const data = JSON.parse(event.body);

  const result = await TicketEntity.update({ ticketId: data.ticketId, teamId: data.teamId })
    .set({ status: data.status })
    .go();

  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};