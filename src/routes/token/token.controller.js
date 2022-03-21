import config from "../../config.js";
import Token from "./Token.js";
import token from "./Token.js";

export const createToken = async (newToken) => {
  const tempToken = new Token({
    tokenId: 0,
    token: newToken,
  });

  const savedToken = await tempToken.save();
  return savedToken;
};

export const getToken = async () => {
  let tokenFound = await Token.find({
    tokenId: 0,
  });
  //⚠️ DEV PURPOSES ⚠️
  /*if (config.ENV === 'DEV') {
        console.log('getToken: ', tokenFound);
    }*/
  tokenFound = JSON.parse(JSON.stringify(tokenFound));

  let token = tokenFound[0]?.token ?? createToken("test");
  return token;
};

export const getTokenUpdateTime = async () => {
  let tokenFound = await Token.find({
    tokenId: 0,
  });

  tokenFound = JSON.parse(JSON.stringify(tokenFound));
  console.log(tokenFound[0].getTimestamp());
};

export const updateToken = async (updatedToken) => {
  const tokenFound = await Token.find({
    tokenId: 0,
  });

  if (tokenFound.length === 0) {
    return await createToken(updatedToken);
  } else {
    return Token.updateOne(
      {
        tokenId: 0,
      },
      {
        token: updatedToken,
      }
    );
  }
};
