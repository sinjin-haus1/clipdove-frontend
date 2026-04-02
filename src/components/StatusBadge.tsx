'use client';
import React from 'react';
import { Chip } from '@mui/material';

type BadgeStatus = 'processing' | 'ready' | 'posted' | 'scheduled' | 'recording' | 'clips_ready';

interface StatusBadgeProps {
  status: BadgeStatus;
}

const statusConfig: Record<BadgeStatus, { label: string; color: string }> = {
  processing: { label: 'Processing', color: '#ff9800' },
  ready: { label: 'Ready', color: '#4caf50' },
  posted: { label: 'Posted', color: '#2196f3' },
  scheduled: { label: 'Scheduled', color: '#9e9e9e' },
  recording: { label: 'Recording', color: '#f44336' },
  clips_ready: { label: 'Clips Ready', color: '#4caf50' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, color: '#9e9e9e' };

  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        bgcolor: `${config.color}20`,
        color: config.color,
        fontWeight: 600,
        fontSize: '0.75rem',
      }}
    />
  );
}
