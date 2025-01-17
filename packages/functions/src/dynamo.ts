export * as Dynamo from "./dynamo";

import { EntityConfiguration } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Table } from "sst/node/table";

export const Client = new DynamoDBClient({});

export const Configuration: EntityConfiguration = {
  // @ts-ignore
  table: Table.final_table.tableName,
  client: Client,
};