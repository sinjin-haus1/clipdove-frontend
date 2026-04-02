'use client';
import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, Button, Switch, FormControlLabel, Alert } from '@mui/material';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [clipReadyNotifications, setClipReadyNotifications] = useState(true);
  const [gameReminderNotifications, setGameReminderNotifications] = useState(true);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ bgcolor: '#1e1e1e' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Account Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Name"
                  defaultValue="Coach Smith"
                  fullWidth
                />
                <TextField
                  label="Email"
                  defaultValue="coach@team.com"
                  fullWidth
                />
                <TextField
                  label="Organization"
                  defaultValue="Riverside Youth Sports"
                  fullWidth
                />
                <Button variant="contained" sx={{ bgcolor: '#2196f3', alignSelf: 'flex-start' }}>
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ bgcolor: '#1e1e1e' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Team Profile
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Default Team Name"
                  defaultValue="Riverside Youth Baseball"
                  fullWidth
                />
                <TextField
                  label="Sport"
                  defaultValue="Baseball"
                  fullWidth
                />
                <TextField
                  label="Timezone"
                  defaultValue="America/New_York"
                  fullWidth
                />
                <Button variant="contained" sx={{ bgcolor: '#2196f3', alignSelf: 'flex-start' }}>
                  Update Team Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ bgcolor: '#1e1e1e' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Notification Preferences
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={clipReadyNotifications}
                      onChange={(e) => setClipReadyNotifications(e.target.checked)}
                    />
                  }
                  label="Clip Ready Alerts"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={gameReminderNotifications}
                      onChange={(e) => setGameReminderNotifications(e.target.checked)}
                    />
                  }
                  label="Game Reminders"
                />
                <Button variant="outlined" sx={{ borderColor: '#2196f3', color: '#2196f3', alignSelf: 'flex-start', mt: 2 }}>
                  Save Preferences
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ bgcolor: '#1e1e1e' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                System Status
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity="success" sx={{ bgcolor: '#4caf5020', color: '#4caf50' }}>
                  FFmpeg: Installed (v6.0)
                </Alert>
                <Alert severity="success" sx={{ bgcolor: '#4caf5020', color: '#4caf50' }}>
                  AI Detection: Online
                </Alert>
                <Alert severity="success" sx={{ bgcolor: '#4caf5020', color: '#4caf50' }}>
                  Video Storage: 12.4 GB used of 50 GB
                </Alert>
                <Alert severity="info" sx={{ bgcolor: '#2196f320', color: '#2196f3' }}>
                  API Quota: 847/1000 requests remaining today
                </Alert>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
