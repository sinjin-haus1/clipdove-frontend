'use client';
import React from 'react';
import { Box, Typography, Grid, Button, Card, CardContent, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EventIcon from '@mui/icons-material/Event';
import GameCard from '@/components/GameCard';
import { mockGames, mockTeams } from '@/lib/mock-data';

export default function GamesPage() {
  const getTeamName = (teamId: string) => {
    const team = mockTeams.find((t) => t.id === teamId);
    return team?.name || 'Unknown Team';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Games
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#2196f3' }}>
          Schedule Game
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockGames.map((game) => (
          <Grid key={game.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <GameCard game={game} teamName={getTeamName(game.teamId)} />
          </Grid>
        ))}
      </Grid>

      {mockGames.length === 0 && (
        <Card sx={{ bgcolor: '#1e1e1e' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 8,
            }}
          >
            <EventIcon sx={{ fontSize: 64, color: '#b0b0b0', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              No Games Scheduled
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 3 }}>
              Schedule your first game to start capturing highlights
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#2196f3' }}>
              Schedule Game
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
