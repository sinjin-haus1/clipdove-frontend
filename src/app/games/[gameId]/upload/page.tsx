'use client';
import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Alert,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import VideocamIcon from '@mui/icons-material/Videocam';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';

const GET_RAW_VIDEOS = gql`
  query GetRawVideos($gameId: ID!) {
    rawVideos(gameId: $gameId) {
      _id
      gameId
      filename
      duration
      status
      uploadedAt
    }
  }
`;

const UPLOAD_RAW_VIDEO = gql`
  mutation UploadRawVideo($gameId: ID!, $file: Upload!) {
    uploadRawVideo(gameId: $gameId, file: $file) {
      _id
      gameId
      filename
      status
      uploadedAt
    }
  }
`;

export default function UploadPage() {
  const params = useParams();
  const gameId = params.gameId as string;

  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { data, refetch } = useQuery(GET_RAW_VIDEOS, {
    variables: { gameId },
  });

  const [uploadRawVideo] = useMutation(UPLOAD_RAW_VIDEO);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile);
      setUploadError(null);
      setUploadSuccess(false);
    } else {
      setUploadError('Please select a valid video file.');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('video/')) {
        setUploadError('Please select a valid video file.');
        return;
      }
      setFile(selectedFile);
      setUploadError(null);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      // Use XMLHttpRequest for progress tracking with Apollo upload
      const formData = new FormData();
      formData.append('operations', JSON.stringify({
        query: `
          mutation UploadRawVideo($gameId: ID!, $file: Upload!) {
            uploadRawVideo(gameId: $gameId, file: $file) {
              _id
              gameId
              filename
              status
              uploadedAt
            }
          }
        `,
        variables: {
          gameId,
          file: null, // placeholder
        },
      }));
      formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
      formData.append('0', file);

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/graphql');

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress(Math.round((event.loaded / event.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            if (response.errors) {
              reject(new Error(response.errors[0].message));
            } else {
              resolve();
            }
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => reject(new Error('Network error during upload'));
        xhr.send(formData);
      });

      setUploadSuccess(true);
      setFile(null);
      setUploadProgress(100);
      refetch();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const rawVideos = data?.rawVideos ?? [];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <IconButton component={Link} href="/games" sx={{ color: '#b0b0b0' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Upload Video
        </Typography>
      </Box>

      {/* Upload Zone */}
      <Card sx={{ bgcolor: '#1e1e1e', mb: 4 }}>
        <CardContent>
          <Box
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            sx={{
              border: `2px dashed ${dragOver ? '#2196f3' : '#444'}`,
              borderRadius: 2,
              p: 6,
              textAlign: 'center',
              bgcolor: dragOver ? '#1e3a5f' : 'transparent',
              transition: 'all 0.2s',
              cursor: 'pointer',
              mb: file ? 2 : 0,
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <CloudUploadIcon sx={{ fontSize: 64, color: '#2196f3', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              {dragOver ? 'Drop your video here' : 'Drag & drop your video here'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
              or click to browse — MP4, MOV, AVI supported
            </Typography>
          </Box>

          {file && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {file.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              </Box>
              <Button
                size="small"
                color="error"
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                disabled={uploading}
              >
                Remove
              </Button>
            </Box>
          )}

          {uploading && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1, color: '#b0b0b0' }}>
                Uploading... {uploadProgress}%
              </Typography>
              <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 6, borderRadius: 3 }} />
            </Box>
          )}

          {uploadError && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setUploadError(null)}>
              {uploadError}
            </Alert>
          )}

          {uploadSuccess && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setUploadSuccess(false)}>
              Video uploaded successfully!
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            startIcon={<CloudUploadIcon />}
            onClick={handleUpload}
            disabled={!file || uploading}
            sx={{ mt: file ? 0 : 0 }}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </Button>
        </CardContent>
      </Card>

      {/* Uploaded Videos List */}
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Uploaded Videos ({rawVideos.length})
      </Typography>

      {rawVideos.length === 0 ? (
        <Card sx={{ bgcolor: '#1e1e1e' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
            <VideocamIcon sx={{ fontSize: 48, color: '#b0b0b0', mb: 2 }} />
            <Typography variant="body1" sx={{ color: '#b0b0b0' }}>
              No videos uploaded yet
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ bgcolor: '#1e1e1e' }}>
          <List disablePadding>
            {rawVideos.map((video: { _id: string; filename: string; status: string; uploadedAt: string; duration?: number }) => (
              <ListItem
                key={video._id}
                divider
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" sx={{ color: '#b0b0b0' }}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={video.filename}
                  secondary={`${video.status} • ${video.duration ? `${video.duration}s` : 'Duration unknown'} • Uploaded ${new Date(video.uploadedAt).toLocaleDateString()}`}
                  primaryTypographyProps={{ sx: { fontWeight: 600 } }}
                  secondaryTypographyProps={{ sx: { color: '#b0b0b0' } }}
                />
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </Box>
  );
}
