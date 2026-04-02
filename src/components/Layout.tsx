'use client';
import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import MovieIcon from '@mui/icons-material/Movie';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const DRAWER_WIDTH = 240;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, href: '/' },
  { label: 'Teams', icon: <GroupsIcon />, href: '/teams' },
  { label: 'Games', icon: <SportsBaseballIcon />, href: '/games' },
  { label: 'Clips', icon: <MovieIcon />, href: '/clips' },
  { label: 'Social', icon: <ShareIcon />, href: '/social' },
  { label: 'Settings', icon: <SettingsIcon />, href: '/settings' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0a0a0a' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            bgcolor: '#121212',
            borderRight: '1px solid #2a2a2a',
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 700 }}>
            🕊️ ClipDove
          </Typography>
        </Toolbar>
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{
                '&.Mui-selected': {
                  bgcolor: '#1e3a5f',
                  borderLeft: '3px solid #2196f3',
                },
                '&:hover': {
                  bgcolor: '#1e1e1e',
                },
              }}
            >
              <ListItemIcon sx={{ color: pathname === item.href ? '#2196f3' : '#b0b0b0' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: '#121212',
            borderBottom: '1px solid #2a2a2a',
            boxShadow: 'none',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
              ClipDove
            </Typography>
            <IconButton>
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#2196f3' }}>
                C
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3, flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
