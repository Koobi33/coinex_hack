class AuthClientClass {
  getNonce = async (account) => {
    const res = await fetch(`http://45.91.8.175:3000/auth/${account}/nonce`, {
      method: "GET",
    });
    return await res.json();
  };

  signSignature = async (account, signature) => {
    const tokenRes = await fetch(
      `http://45.91.8.175:3000/auth/${account}/signature`,
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
