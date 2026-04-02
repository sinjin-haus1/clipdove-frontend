'use client';
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, CardActionArea, Chip } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StatusBadge from './StatusBadge';
import Link from 'next/link';

interface ClipCardProps {
  clip: {
    id: string;
    title: string;
    player: string;
    duration: string;
    views: number;
    status: 'processing' | 'ready' | 'posted';
    team: string;
  };
}

export default function ClipCard({ clip }: ClipCardProps) {
  const [hovered, setHovered] = useState(false);

  const gradientColors = [
    ['#ff6b35', '#f7931e'],
    ['#4caf50', '#8bc34a'],
    ['#2196f3', '#64b5f6'],
    ['#9c27b0', '#e91e63'],
    ['#ff5722', '#ffc107'],
  ];

  const colorIndex = parseInt(clip.id, 10) % gradientColors.length;
  const [color1, color2] = gradientColors[colorIndex];

  return (
    <Card
      sx={{
        bgcolor: '#1e1e1e',
        height: '100%',
        transition: 'transform 0.2s',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardActionArea component={Link} href={`/review/${clip.id}`}>
        <Box
          sx={{
            height: 140,
            background: `linear-gradient(135deg, ${color1}, ${color2})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {hovered && (
            <PlayCircleOutlineIcon
              sx={{
                fontSize: 56,
                color: 'white',
                opacity: 0.9,
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))',
              }}
            />
          )}
          <Chip
            label={clip.duration}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              fontWeight: 600,
            }}
          />
        </Box>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {clip.title}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
            {clip.player}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <StatusBadge status={clip.status} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <VisibilityIcon sx={{ fontSize: 16, color: '#b0b0b0' }} />
              <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                {clip.views.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
