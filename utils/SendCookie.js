const sendCookie = async (user, payload, tokenName, res) => {
  res.cookie(tokenName.toString(), payload, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  });
  res.status(200).json({
    status: "success",
    cookieName: tokenName,
    payload,
    user,
  });
};

export default sendCookie;
