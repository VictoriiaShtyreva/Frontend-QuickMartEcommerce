import { setupServer } from "msw/node";
import { productsHandlers } from "./productsHandlers";

// This configures a request mocking server with the given request handlers.
export const mockServer = setupServer(...productsHandlers);
