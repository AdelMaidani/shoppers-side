import { Router, Response, Request } from "express";
import AWS from "aws-sdk";
import { promisify } from "util";
import crypto from "crypto";

const S3Route = Router();
const randomBytes = promisify(crypto.randomBytes);

const region = "ap-south-1";
const bucketName = "shoppers-side";
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKeyS3;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

S3Route.get("/getUrl", async (req: Request, res: Response) => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const url = await s3.getSignedUrlPromise("putObject", params);
  res.send({ url });
});

export default S3Route;
