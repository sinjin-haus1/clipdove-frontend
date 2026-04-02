'use client';
import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import ClipCard from '@/components/ClipCard';
import { mockClips, mockTeams } from '@/lib/mock-data';

export default function ClipsPage() {
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredClips = mockClips.filter((clip) => {
    const teamMatch = filterTeam === 'all' || clip.team === filterTeam;
    const statusMatch = filterStatus === 'all' || clip.status === filterStatus;
    return teamMatch && statusMatch;
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Clips
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Team</InputLabel>
          <Select
            value={filterTeam}
            label="Team"
            onChange={(e) => setFilterTeam(e.target.value)}
          >
            <MenuItem value="all">All Teams</MenuItem>
            {mockTeams.map((team) => (
              <MenuItem key={team.id} value={team.name}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="ready">Ready</MenuItem>
            <MenuItem value="posted">Posted</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredClips.length > 0 ? (
        <Grid container spacing={3}>
          {filteredClips.map((clip) => (
            <Grid key={clip.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ClipCard clip={clip} />
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
            <MovieIcon sx={{ fontSize: 64, color: '#b0b0b0', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              No Clips Found
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
              {filterTeam !== 'all' || filterStatus !== 'all'
                ? 'No clips match your current filters'
                : 'Clips will appear here after games are processed'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
