export const getGroupUrlFront = function (groupId: string) {
  const url = process.env.NEXT_PUBLIC_FRONTEND_URL;
  return url + "/groupes/join/" + groupId;
};
export const groupeLinkTosee = function (groupId: string) {
  return "/groupes/" + groupId;
};
