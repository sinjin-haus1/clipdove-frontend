'use client';
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <Card sx={{ bgcolor: '#1e1e1e', height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              bgcolor: '#1e3a5f',
              borderRadius: 2,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}
