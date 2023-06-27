export const validateFriend = (userName, groupId, groups) => {
  let message = '';
  const isFriendAvailable =
    groups[groupId].memebers?.find((x) => x === userName) || null;
  if (isFriendAvailable) {
    message = `${userName} is already in your FriendList`;
    return message;
  }
  return message;
};
