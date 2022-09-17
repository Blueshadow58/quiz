import md5 from "md5-hash";

const Token = (data) => {
  const hash = md5(data);
  return hash;
};

export default Token;
