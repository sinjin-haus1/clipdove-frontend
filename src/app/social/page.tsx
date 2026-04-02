'use client';
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from '@mui/material';
import { mockRecentPosts } from '@/lib/mock-data';

const platforms = [
  {
    name: 'TikTok',
    icon: '🎵',
    connected: true,
    handle: '@clipdove_official',
    color: '#ff0050',
  },
  {
    name: 'YouTube',
    icon: '📺',
    connected: true,
    handle: 'ClipDove Highlights',
    color: '#ff0000',
  },
  {
    name: 'Instagram',
    icon: '📸',
    connected: false,
    handle: null,
    color: '#e4405f',
  },
];

export default function SocialPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Social Accounts
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {platforms.map((platform) => (
          <Grid key={platform.name} size={{ xs: 12, md: 4 }}>
            <Card sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ mr: 2 }}>
                    {platform.icon}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {platform.name}
                    </Typography>
                    <Chip
                      label={platform.connected ? 'Connected' : 'Not Connected'}
                      size="small"
                      sx={{
                        bgcolor: platform.connected ? '#4caf5020' : '#f4433620',
                        color: platform.connected ? '#4caf50' : '#f44336',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </Box>
                {platform.connected ? (
                  <Box>
                    <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 2 }}>
                      {platform.handle}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ borderColor: '#f44336', color: '#f44336' }}
                    >
                      Disconnect
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 2 }}>
                      Connect your {platform.name} account to auto-post highlights
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: platform.color }}
                    >
                      Connect {platform.name}
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Recent Posts
      </Typography>

      {mockRecentPosts.length > 0 ? (
        <Card sx={{ bgcolor: '#1e1e1e' }}>
          <List>
            {mockRecentPosts.map((post, index) => (
              <ListItem
                key={post.id}
                sx={{
                  borderBottom: index < mockRecentPosts.length - 1 ? '1px solid #2a2a2a' : 'none',
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: post.platform === 'TikTok' ? '#ff0050' : '#ff0000' }}>
                    {post.platform === 'TikTok' ? '🎵' : '📺'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={post.title}
                  secondary={
                    <Box component="span" sx={{ display: 'flex', gap: 2 }}>
                      <span>{post.platform}</span>
                      <span>{post.views.toLocaleString()} views</span>
                      <span>{post.postedAt}</span>
                    </Box>
                  }
                  primaryTypographyProps={{ variant: 'body1', fontWeight: 600 }}
                  secondaryTypographyProps={{ variant: 'body2', component: 'div' }}
                />
              </ListItem>
            ))}
          </List>
        </Card>
      ) : (
        <Card sx={{ bgcolor: '#1e1e1e' }}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              No Posts Yet
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
              Your posted clips will appear here
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
