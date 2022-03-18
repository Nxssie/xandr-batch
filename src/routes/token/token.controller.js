import config from '../../config.js'
import Token from './Token.js'
import token from './Token.js'

export const createToken = async (newToken) => {
    const tokenFound = await Token.find({
        tokenId: 0,
        token: newToken
    });
    //⚠️ DEV PURPOSES ⚠️
    /*if (config.ENV === 'DEV') {
        console.log('tokenFound: ', tokenFound);
    }*/
    if (tokenFound.length === 0) {
        const tempToken = new Token({
            tokenId: 0,
            token: newToken
        });
        const savedToken = await tempToken.save();
        return savedToken;
    } else {
        return 'Token already exists'
    }
}

export const getToken = async () => {
    let tokenFound = await Token.find({
        tokenId: 0
    });
    //⚠️ DEV PURPOSES ⚠️
    /*if (config.ENV === 'DEV') {
        console.log('getToken: ', tokenFound);
    }*/
    tokenFound = JSON.parse(JSON.stringify(tokenFound))
    return tokenFound[0].token
}

export const getTokenUpdateTime = async () => {
    let tokenFound = await Token.find({
        tokenId: 0
    });

    tokenFound = JSON.parse(JSON.stringify(tokenFound))
    console.log(tokenFound[0].getTimestamp());
}

export const updateToken = async (updatedToken) => {
    const tokenFound = await Token.find({
        tokenId: 0
    });

    if(tokenFound.length === 0) {
        return await createToken(updatedToken);
    } else {
        return Token.updateOne({
            tokenId: 0
        }, {
            token: updatedToken
        })
    }

}