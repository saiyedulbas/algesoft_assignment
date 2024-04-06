import { StackContext, Api, use, Table } from "sst/constructs";


// const db = use(Database);
export function API({ stack }: StackContext) {
    

  const table = new Table(stack, "final_table", {
    fields: {
      pk: "string",
      sk: "string",
      gsi1pk: "string",
      gsi1sk: "string",
      gsi2pk: "string",
      gsi2sk: "string",
    },
    primaryIndex: {
      partitionKey: "pk",
      sortKey: "sk",
    },
    globalIndexes: {
      gsi1: {
        partitionKey: "gsi1pk",
        sortKey: "gsi1sk",
      },
    },
  });

  // remember when you add global indexes, you need to add
  // them to the table fields
  table.addGlobalIndexes({
    gsi2: {
      partitionKey: "gsi2pk",
      sortKey: "gsi2sk",
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET    /item": "packages/functions/src/list.main",
      "GET    /list_teams": "packages/functions/src/list_teams.main",
      "POST   /create": "packages/functions/src/create.main",
      "POST   /create_ticket": "packages/functions/src/create_ticket.main",
      "GET    /items/{id}": "packages/functions/src/items.main",
      "PUT    /item": "packages/functions/src/update.main",
      "DELETE /item/{id}": "packages/functions/src/delete.main",
    },
  });

  // bus.subscribe("todo.created", {
  //   handler: "packages/functions/src/events/todo-created.handler",
  // });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
