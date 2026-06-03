import { Request, Response, NextFunction } from 'express';
import { githubService } from '../services/github.service';

/**
 * Controller for GitHub repository-related endpoints.
 * Parses query parameters for sorting and pagination,
 * then delegates to the service layer.
 */
export const getUserRepos = async (
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

    // Parse query parameters with defaults
    const sort = (req.query.sort as string) || 'updated';
    const page = parseInt(req.query.page as string, 10) || 1;
    const perPage = parseInt(req.query.per_page as string, 10) || 10;

    // Validate sort parameter
    const validSorts = ['stars', 'name', 'updated'];
    if (!validSorts.includes(sort)) {
      res.status(400).json({
        error: 'Bad Request',
        message: `Invalid sort parameter. Must be one of: ${validSorts.join(', ')}`,
        statusCode: 400,
      });
      return;
    }

    // Cap per_page to avoid excessive requests
    const clampedPerPage = Math.min(Math.max(perPage, 1), 100);

    const result = await githubService.getUserRepos(username.trim(), {
      sort,
      page,
      perPage: clampedPerPage,
    });

    res.json({
      success: true,
      data: result.repos,
      pagination: {
        page,
        perPage: clampedPerPage,
        returned: result.totalCount,
      },
    });
  } catch (error) {
    next(error);
  }
};
