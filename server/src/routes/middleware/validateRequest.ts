import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";

const validateRequestMW =
  <T>(resourceSchema: SchemaOf<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;

    try {
      await resourceSchema.validate(resource);
      next();
    } catch (e) {
      console.error(e);
      return res.status(400).json({ error: e?.errors?.join(", ") });
    }
  };

export { validateRequestMW };
