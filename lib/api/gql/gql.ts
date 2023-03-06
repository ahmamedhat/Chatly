/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateNewUser($name: String!, $email: String!) {\n    createNewUser(name: $name, email: $email) {\n      name\n      _id\n      email\n    }\n  }\n": types.CreateNewUserDocument,
    "\n  mutation AddNewMessage($from: ID!, $to: ID!, $body: String!) {\n    addNewMessage(from: $from, to: $to, body: $body) {\n      _id\n      body\n      createdAt\n      from {\n        name\n        _id\n      }\n      to {\n        name\n        _id\n      }\n    }\n  }\n": types.AddNewMessageDocument,
    "\n  mutation MarkAsRead($id: ID!) {\n    markAsRead(id: $id) {\n      read\n    }\n  }\n": types.MarkAsReadDocument,
    "\n  query Chats($userId: ID!) {\n    chats(userId: $userId) {\n      _id\n      createdAt\n      updatedAt\n      users {\n        name\n        image\n      }\n      messages {\n        _id\n        body\n        read\n        from {\n          name\n          _id\n        }\n        to {\n          name\n          _id\n        }\n      }\n    }\n  }\n": types.ChatsDocument,
    "\n  query Chat($chatId: ID!) {\n    chat(id: $chatId) {\n      users {\n        name\n      }\n      messages {\n        _id\n        body\n        from {\n          _id\n        }\n        to {\n          _id\n        }\n        createdAt\n      }\n    }\n  }\n": types.ChatDocument,
    "\n  query Query {\n    users {\n      name\n      _id\n      email\n    }\n  }\n": types.QueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateNewUser($name: String!, $email: String!) {\n    createNewUser(name: $name, email: $email) {\n      name\n      _id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateNewUser($name: String!, $email: String!) {\n    createNewUser(name: $name, email: $email) {\n      name\n      _id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddNewMessage($from: ID!, $to: ID!, $body: String!) {\n    addNewMessage(from: $from, to: $to, body: $body) {\n      _id\n      body\n      createdAt\n      from {\n        name\n        _id\n      }\n      to {\n        name\n        _id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddNewMessage($from: ID!, $to: ID!, $body: String!) {\n    addNewMessage(from: $from, to: $to, body: $body) {\n      _id\n      body\n      createdAt\n      from {\n        name\n        _id\n      }\n      to {\n        name\n        _id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MarkAsRead($id: ID!) {\n    markAsRead(id: $id) {\n      read\n    }\n  }\n"): (typeof documents)["\n  mutation MarkAsRead($id: ID!) {\n    markAsRead(id: $id) {\n      read\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Chats($userId: ID!) {\n    chats(userId: $userId) {\n      _id\n      createdAt\n      updatedAt\n      users {\n        name\n        image\n      }\n      messages {\n        _id\n        body\n        read\n        from {\n          name\n          _id\n        }\n        to {\n          name\n          _id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Chats($userId: ID!) {\n    chats(userId: $userId) {\n      _id\n      createdAt\n      updatedAt\n      users {\n        name\n        image\n      }\n      messages {\n        _id\n        body\n        read\n        from {\n          name\n          _id\n        }\n        to {\n          name\n          _id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Chat($chatId: ID!) {\n    chat(id: $chatId) {\n      users {\n        name\n      }\n      messages {\n        _id\n        body\n        from {\n          _id\n        }\n        to {\n          _id\n        }\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query Chat($chatId: ID!) {\n    chat(id: $chatId) {\n      users {\n        name\n      }\n      messages {\n        _id\n        body\n        from {\n          _id\n        }\n        to {\n          _id\n        }\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query {\n    users {\n      name\n      _id\n      email\n    }\n  }\n"): (typeof documents)["\n  query Query {\n    users {\n      name\n      _id\n      email\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;