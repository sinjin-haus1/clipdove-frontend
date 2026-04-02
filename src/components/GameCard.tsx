'use client';
import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StatusBadge from './StatusBadge';

interface GameCardProps {
  game: {
    id: string;
    teamId: string;
    opponent: string;
    gameTime: string;
    location: string;
    status: 'scheduled' | 'recording' | 'processing' | 'clips_ready';
  };
  teamName?: string;
}

export default function GameCard({ game, teamName }: GameCardProps) {
  return (
    <Card sx={{ bgcolor: '#1e1e1e' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            vs {game.opponent}
          </Typography>
          <StatusBadge status={game.status} />
        </Box>
        {teamName && (
          <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
            {teamName}
          </Typography>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 18, color: '#b0b0b0' }} />
            <Typography variant="body2">{game.gameTime}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ fontSize: 18, color: '#b0b0b0' }} />
            <Typography variant="body2">{game.location}</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button size="small" variant="contained" sx={{ bgcolor: '#2196f3' }}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
