import { CoverLetter } from "../models/coverLetter/coverLetter";
import { IAuthRequest } from "../auth/auth-request.interface";
import { Response } from "express";

export const getCoverLetters = async (req: IAuthRequest, res: Response) => {
  try {
    const coverLetters = await CoverLetter.find({
      userId: req.user.id,
    }).exec();
    res.send(coverLetters);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

export const createCoverLetter = async (req: IAuthRequest, res: Response) => {
  try {
    const { title, body } = req.body;
    const coverLetter = new CoverLetter({
      title,
      body,
      userId: req.user.id,
    });
    await coverLetter.save();
    res.send(coverLetter);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

export const updateCoverLetter = async (req: IAuthRequest, res: Response) => {
  const { coverLetterId } = req.params;
  const { title, body } = req.body;
  try {
    await CoverLetter.findOneAndUpdate(
      { _id: coverLetterId },
      {
        $set: {
          title,
          body,
        },
      },
      {
        omitUndefined: true,
        useFindAndModify: false,
      } as any
    );

    const coverLetter = await CoverLetter.findById(coverLetterId).exec();
    res.send(coverLetter);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

export const deleteCoverLetter = async (req: IAuthRequest, res: Response) => {
  const { coverLetterId } = req.params;

  try {
    const deleted = await CoverLetter.findOneAndDelete({
      _id: coverLetterId,
      userId: req.user.id,
    }).exec();
    res.send({ deleted: true, response: deleted });
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};
