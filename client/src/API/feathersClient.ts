import feathers from "@feathersjs/client";
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';
import axios from "axios";
import { HOST } from "./host";

const feathersClient = feathers()
const restClient = rest(HOST);

feathersClient.configure(restClient.axios(axios))
feathersClient.configure(feathers.authentication())
feathersClient.configure(auth({
    storage: window.localStorage,
    storageKey: 'v-rental-jwt'
}))

export default feathersClient;