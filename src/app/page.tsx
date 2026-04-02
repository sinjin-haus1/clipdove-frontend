'use client';
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemText } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import MovieIcon from '@mui/icons-material/Movie';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import StatCard from '@/components/StatCard';
import { mockActivity, mockClips } from '@/lib/mock-data';
import Link from 'next/link';

export default function DashboardPage() {
  const totalTeams = 3;
  const totalClips = mockClips.length;
  const totalViews = mockClips.reduce((acc, clip) => acc + clip.views, 0);
  const pendingProcessing = mockClips.filter((c) => c.status === 'processing').length;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        ClipDove — Faceless Highlight Reels
      </Typography>
      <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 4 }}>
        AI-powered highlight reels for youth sports leagues
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={<GroupsIcon sx={{ color: '#2196f3' }} />} value={totalTeams} label="Total Teams" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={<MovieIcon sx={{ color: '#4caf50' }} />} value={totalClips} label="Total Clips" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<VisibilityIcon sx={{ color: '#ff9800' }} />}
            value={totalViews.toLocaleString()}
            label="Total Views"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<HourglassEmptyIcon sx={{ color: '#f44336' }} />}
            value={pendingProcessing}
            label="Pending Processing"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ bgcolor: '#1e1e1e', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Recent Activity
              </Typography>
              <List>
                {mockActivity.map((activity) => (
                  <ListItem key={activity.id} sx={{ px: 0 }}>
                    <ListItemText
                      primary={activity.message}
                      secondary={activity.time}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption', sx: { color: '#b0b0b0' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ bgcolor: '#1e1e1e' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  component={Link}
                  href="/games"
                  variant="contained"
                  sx={{ bgcolor: '#2196f3' }}
                >
                  Start New Game
                </Button>
                <Button
                  component={Link}
                  href="/clips"
                  variant="outlined"
                  sx={{ borderColor: '#2196f3', color: '#2196f3' }}
                >
                  View All Clips
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
