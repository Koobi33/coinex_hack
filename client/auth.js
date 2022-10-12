class AuthClientClass {
  getNonce = async (account) => {
    const res = await fetch(
      `https://financefor.fun:3000/auth/${account}/nonce`,
      {
        method: "GET",
      }
    );
    return await res.json();
  };

  signSignature = async (account, signature) => {
    const tokenRes = await fetch(
      `https://financefor.fun:3000/auth/${account}/signature`,
      {
        method: "POST",
        body: JSON.stringify({
          signature,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return await tokenRes.json();
  };
}

const AuthClient = new AuthClientClass();

export { AuthClient };
