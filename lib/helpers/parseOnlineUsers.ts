const parseUsers = (users: [], uid: string) => {
  const newUsers = users
    .map((user: any) => {
      return { ...user, self: user.userID == uid };
    })
    .sort(
      (
        a: { self: boolean; username: string },
        b: { self: boolean; username: string }
      ) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      }
    )
    .filter((user: any) => !user.self);
  return newUsers;
};

export default parseUsers;
