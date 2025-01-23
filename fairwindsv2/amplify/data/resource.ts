import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  RV: a
    .model({
      make: a.string(),
      model: a.string(),
      year: a.integer(),
      vin: a.string(),  // Optional by default
      ownerEmail: a.string(), // Link to authenticated user
      notes: a.string(), // Optional by default
    })
    .authorization((allow) => allow.owner()),

  MaintenanceRecord: a
    .model({
      title: a.string(),
      date: a.datetime(),
      description: a.string(),
      type: a.enum(['scheduled', 'repair', 'upgrade']),
      status: a.enum(['pending', 'completed']),
      cost: a.float(), // Optional by default
      notes: a.string(), // Optional by default
      photos: a.string(), // Store as comma-separated URLs, optional by default
      rvID: a.string(), // Reference to RV
      ownerEmail: a.string(), // Link to authenticated user
    })
    .authorization((allow) => allow.owner()),

  MaintenanceSchedule: a
    .model({
      title: a.string(),
      frequency: a.enum(['once', 'weekly', 'monthly', 'quarterly', 'yearly']),
      nextDueDate: a.datetime(),
      description: a.string(),
      isRecurring: a.boolean(),
      rvID: a.string(), // Reference to RV
      ownerEmail: a.string(), // Link to authenticated user
    })
    .authorization((allow) => allow.owner()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
