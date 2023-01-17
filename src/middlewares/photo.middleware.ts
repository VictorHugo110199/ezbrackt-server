import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { BadRequestError } from "../helpers/Errors.helper";

const multerStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback) => {
    callback(null, "./public/upload/users");
  },
  filename: (req: Request, file: Express.Multer.File, callback) => {
    const filename = `${Date.now().toString()}_${file.originalname}`;
    req.body.image = filename;

    callback(null, filename);
  }
});

const multerFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  const extensionImg = ["image/png", "image/jpeg", "image/jpg"].find(
    (acceptFormat) => acceptFormat === file.mimetype
  );

  if (extensionImg) {
    callback(null, true);
  }

  callback(null, false);
};

export const cloudinaryFunction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.file?.path) {
    const upload = await cloudinary.uploader.upload(req.file!.path, (_error, result) => result);
    req.body.img = upload;

    fs.unlink(req.file!.path, (error) => {
      if (error) {
        console.error(error);
      }
    });

    next();
  } else {
    next();
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadImage = upload.single("image");
