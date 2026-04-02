'use client';
import React from 'react';
import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TeamCard from '@/components/TeamCard';
import { mockTeams } from '@/lib/mock-data';
import GroupsIcon from '@mui/icons-material/Groups';

export default function TeamsPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Teams
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#2196f3' }}>
          Add Team
        </Button>
      </Box>

      {mockTeams.length > 0 ? (
        <Grid container spacing={3}>
          {mockTeams.map((team) => (
            <Grid key={team.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <TeamCard team={team} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card sx={{ bgcolor: '#1e1e1e' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 8,
            }}
          >
            <GroupsIcon sx={{ fontSize: 64, color: '#b0b0b0', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              No Teams Yet
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 3 }}>
              Add your first team to get started with highlight reels
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#2196f3' }}>
              Add Team
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
