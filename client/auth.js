class AuthClientClass {
  getNonce = async (account) => {
    const res = await fetch(`http://localhost:3000/auth/${account}/nonce`, {
      method: "POST",
    });
    return await res.json();
  };

  signSignature = async (account, signature) => {
    const tokenRes = await fetch(
      `http://localhost:3000/auth/${account}/signature`,
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