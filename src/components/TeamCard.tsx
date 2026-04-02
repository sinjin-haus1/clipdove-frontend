'use client';
import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, Button, Chip } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

interface TeamCardProps {
  team: {
    id: string;
    name: string;
    sport: string;
    playerCount: number;
    lastGame: string;
  };
}

const sportIcons: Record<string, React.ReactNode> = {
  Baseball: <SportsBaseballIcon sx={{ color: '#ff6b35' }} />,
  Soccer: <SportsSoccerIcon sx={{ color: '#4caf50' }} />,
};

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <Card sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              bgcolor: '#2a2a2a',
              borderRadius: 2,
              p: 1.5,
              mr: 2,
            }}
          >
            {sportIcons[team.sport] || <GroupsIcon sx={{ color: '#2196f3' }} />}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {team.name}
            </Typography>
            <Chip label={team.sport} size="small" sx={{ mt: 0.5, bgcolor: '#2a2a2a' }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
              Players
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {team.playerCount}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
              Last Game
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {team.lastGame}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button size="small" variant="outlined" sx={{ borderColor: '#2196f3', color: '#2196f3' }}>
          View Games
        </Button>
        <Button size="small" variant="outlined" sx={{ borderColor: '#2196f3', color: '#2196f3' }}>
          View Clips
        </Button>
      </CardActions>
    </Card>
  );
}
