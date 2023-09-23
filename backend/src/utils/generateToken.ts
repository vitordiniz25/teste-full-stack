import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};

export default generateToken;