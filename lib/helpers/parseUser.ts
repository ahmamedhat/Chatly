import { User } from "../api/gql/graphql";

const parseUser = (users: User[], currentUserId: string) => {
  return users.filter((user) => user._id !== currentUserId)[0];
};

export default parseUser;
