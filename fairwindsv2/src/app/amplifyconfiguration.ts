import { Amplify } from 'aws-amplify';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import config from "@/amplify_outputs.json";

export const configureAmplify = () => {
  return {
    ...config,
    Auth: {
      Cognito: {
        ...config.auth,
      }
    }
  };
};

export const dataClient = generateClient<Schema>();
