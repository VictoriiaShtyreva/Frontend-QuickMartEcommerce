import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios, { delayResponse: 500 });

export default mockAxios;
