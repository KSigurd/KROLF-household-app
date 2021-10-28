export const generateHouseholdInviteCode = () => {
  var result = "";
  const characters = "01234567829";
  const charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const code = Number(result);
  return code;
};
