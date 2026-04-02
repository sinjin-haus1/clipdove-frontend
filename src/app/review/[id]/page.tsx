'use client';
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, TextField, Grid, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { mockClips } from '@/lib/mock-data';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import { useParams } from 'next/navigation';

export default function ReviewPage() {
  const params = useParams();
  const clipId = params.id as string;
  const clip = mockClips.find((c) => c.id === clipId);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!clip) {
    return (
      <Box>
        <Typography variant="h6">Clip not found</Typography>
        <Button component={Link} href="/clips" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Back to Clips
        </Button>
      </Box>
    );
  }

  const handleAddNote = () => {
    if (note.trim()) {
      setSubmitted(true);
      setNote('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <Box>
      <Button
        component={Link}
        href="/clips"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, color: '#b0b0b0' }}
      >
        Back to Clips
      </Button>

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Review Clip
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ bgcolor: '#1e1e1e', mb: 3 }}>
            <Box
              sx={{
                bgcolor: '#2a2a2a',
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Typography sx={{ color: '#b0b0b0' }}>
                Video Player Placeholder
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  right: 16,
                  display: 'flex',
                  gap: 2,
                }}
              >
                <Box sx={{ flexGrow: 1, bgcolor: '#1e1e1e', height: 4, borderRadius: 2 }}>
                  <Box sx={{ width: '35%', height: '100%', bgcolor: '#2196f3', borderRadius: 2 }} />
                </Box>
                <Typography variant="caption" sx={{ color: '#b0b0b0', alignSelf: 'center' }}>
                  {clip.duration}
                </Typography>
              </Box>
            </Box>
          </Card>

          <Card sx={{ bgcolor: '#1e1e1e' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Add Note
              </Typography>
              {submitted && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Note added successfully
                </Alert>
              )}
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Add feedback or notes about this clip..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                onClick={handleAddNote}
                sx={{ borderColor: '#2196f3', color: '#2196f3' }}
              >
                Add Note
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ bgcolor: '#1e1e1e', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Clip Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                    Title
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {clip.title}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                    Player
                  </Typography>
                  <Typography variant="body1">{clip.player}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                    Team
                  </Typography>
                  <Typography variant="body1">{clip.team}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                    Duration
                  </Typography>
                  <Typography variant="body1">{clip.duration}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                    Status
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <StatusBadge status={clip.status} />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                    Views
                  </Typography>
                  <Typography variant="body1">{clip.views.toLocaleString()}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: '#1e1e1e' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<CheckCircleIcon />}
                  sx={{ bgcolor: '#4caf50' }}
                >
                  Approve & Post
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  sx={{ borderColor: '#ff9800', color: '#ff9800' }}
                >
                  Regenerate
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  sx={{ borderColor: '#f44336', color: '#f44336' }}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
