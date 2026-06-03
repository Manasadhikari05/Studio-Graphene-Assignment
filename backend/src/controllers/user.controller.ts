import { Request, Response, NextFunction } from 'express';
import { githubService } from '../services/github.service';

/**
 * Controller for GitHub user-related endpoints.
 * Handles request validation and delegates to the service layer.
 */
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const username = req.params.username as string;

    if (!username || username.trim().length === 0) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Username parameter is required',
        statusCode: 400,
      });
      return;
    }

    const userProfile = await githubService.getUserProfile(username.trim());

    res.json({
      success: true,
      data: userProfile,
    });
  } catch (error) {
    next(error);
  }
};
