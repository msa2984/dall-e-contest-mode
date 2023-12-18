import Box from '@mui/material/Box';
import { Paper, Container, Typography } from '@mui/material';

export default function AppFooter() {
    return (
      <Paper sx={{marginTop: 'calc(10% + 240px)',
      width: '100%',
      position: 'fixed',
      bottom: 0,
      }} component="footer" square variant="outlined">
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my:1
            }}
          >
          </Box>
  
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="caption" color="initial">
              Copyright ©2023
            </Typography>
          </Box>
        </Container>
      </Paper>
    );
}
