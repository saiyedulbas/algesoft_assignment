import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";

export const TeamEntity = new Entity(
    {
      model: {
        version: "1",
        entity: "Team",
        service: "jira",
      },
      attributes: {
        teamId: {
          type: "string",
          required: true,
          readOnly: true,
        },
        profile: {
          type: "string",
          required: true,
          readOnly: true,
        },
        name: {
          type: "string",
          required: true,
        },
      },
      indexes: {
        teams: {
          collection: "jira",
          pk: {
            field: "pk",
            composite: [],
          },
          sk: {
            field: "sk",
            composite: ["teamId"],
          },
        },
      },
    },
    Dynamo.Configuration
  );
  
  export const TicketEntity = new Entity(
    {
      model: {
        version: "1",
        entity: "Ticket",
        service: "jira",
      },
      attributes: {
        ticketId: {
          type: "string",
          required: true,
          readOnly: true,
        },
        status: {
          type: ["pending", "blocked", "inprogress", "complete"] as const,
          required: true,
        },
        title: {
          type: "string",
          required: true,
        },
        teamId: {
          type: "string",
          required: true,
          readOnly: true,
        },
      },
      indexes: {
        tickets: {
          collection: "jira",
          pk: {
            field: "pk",
            composite: ["teamId"],
          },
          sk: {
            field: "sk",
            composite: ["ticketId"],
          },
        },
      },
    },
    Dynamo.Configuration
  );
  
  export type TTicketEntity = EntityItem<typeof TicketEntity>;
  export type TTeamEntity = EntityItem<typeof TeamEntity>;