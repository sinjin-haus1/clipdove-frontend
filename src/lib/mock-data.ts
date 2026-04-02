export const mockTeams: Array<{
  id: string;
  name: string;
  sport: string;
  playerCount: number;
  lastGame: string;
}> = [
  { id: '1', name: 'Riverside Youth Baseball', sport: 'Baseball', playerCount: 12, lastGame: '2026-03-28' },
  { id: '2', name: 'Eastside Soccer Club', sport: 'Soccer', playerCount: 15, lastGame: '2026-03-30' },
  { id: '3', name: 'Metro Little League', sport: 'Baseball', playerCount: 18, lastGame: '2026-04-01' },
];

export const mockGames: Array<{
  id: string;
  teamId: string;
  opponent: string;
  gameTime: string;
  location: string;
  status: 'scheduled' | 'recording' | 'processing' | 'clips_ready';
}> = [
  { id: '1', teamId: '1', opponent: 'Northside Stars', gameTime: '2026-04-05 10:00', location: 'Riverside Field 1', status: 'scheduled' },
  { id: '2', teamId: '1', opponent: 'Westside Warriors', gameTime: '2026-03-28 14:00', location: 'Riverside Field 2', status: 'clips_ready' },
  { id: '3', teamId: '2', opponent: 'Central FC', gameTime: '2026-03-30 09:00', location: 'Eastside Park', status: 'processing' },
];

export const mockClips: Array<{
  id: string;
  title: string;
  player: string;
  duration: string;
  views: number;
  status: 'processing' | 'ready' | 'posted';
  team: string;
}> = [
  { id: '1', title: "Jake's Grand Slam", player: 'Jake Martinez #7', duration: '0:12', views: 847, status: 'ready', team: 'Riverside Youth Baseball' },
  { id: '2', title: "Emma's Sliding Catch", player: 'Emma Chen #3', duration: '0:08', views: 1203, status: 'posted', team: 'Riverside Youth Baseball' },
  { id: '3', title: 'Lucas - Goalkeeper Save', player: 'Lucas Kim #1', duration: '0:15', views: 0, status: 'processing', team: 'Eastside Soccer Club' },
  { id: '4', title: "Sophia's Home Run", player: 'Sophia Brown #12', duration: '0:10', views: 2341, status: 'posted', team: 'Metro Little League' },
  { id: '5', title: "Noah's Double Play", player: 'Noah Davis #4', duration: '0:09', views: 567, status: 'ready', team: 'Metro Little League' },
];

export const mockActivity = [
  { id: '1', type: 'clip_ready', message: "Jake's Grand Slam is ready for review", time: '2 hours ago' },
  { id: '2', type: 'clip_posted', message: "Emma's Sliding Catch posted to TikTok", time: '4 hours ago' },
  { id: '3', type: 'game_processing', message: 'Processing clips from Westside Warriors game', time: '6 hours ago' },
  { id: '4', type: 'team_added', message: 'Metro Little League added to your teams', time: '1 day ago' },
];

export const mockRecentPosts = [
  { id: '1', platform: 'TikTok', title: "Emma's Sliding Catch", views: 1203, postedAt: '2026-03-28' },
  { id: '2', platform: 'YouTube', title: "Sophia's Home Run", views: 2341, postedAt: '2026-03-27' },
];
