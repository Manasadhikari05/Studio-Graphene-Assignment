import { render, screen } from '@testing-library/react';
import UserCard from '../UserCard';
import { GitHubUser } from '../../types/github';

const mockUser: GitHubUser = {
  login: 'octocat',
  id: 1,
  avatar_url: 'https://github.com/images/error/octocat_happy.gif',
  html_url: 'https://github.com/octocat',
  name: 'The Octocat',
  company: '@github',
  blog: 'https://github.blog',
  location: 'San Francisco',
  bio: 'There once was...',
  public_repos: 2,
  followers: 20,
  following: 0,
  created_at: '2011-01-25T18:44:36Z',
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('The Octocat')).toBeInTheDocument();
    expect(screen.getByText('@octocat')).toBeInTheDocument();
    expect(screen.getByText('There once was...')).toBeInTheDocument();
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
    expect(screen.getByText('@github')).toBeInTheDocument();
  });

  it('renders correct stats', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('20')).toBeInTheDocument(); // Followers
    expect(screen.getByText('2')).toBeInTheDocument(); // Repos
  });
});
