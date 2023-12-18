import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { useState } from "react";
import { Link } from "react-router-dom";

const pages = [
  ["Home", "/home"],
  ["Imagine", "/imagine"],
  ["Contest", "/contest"],
  ["About", "/about"],
];

function AppMenu() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div style={{ flexGrow: 1 }}>
            <PrecisionManufacturingIcon
              sx={{ display: { xs: "none", md: "flex" }, float: "left", mr: 2 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DALL-E Imagination Contest
            </Typography>
          </div>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page[0]}>
                  <Link key={page[1]} to={page[1]}>
                    {page[0]}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <div style={{ flexGrow: 1, float: "left" }}>
            <PrecisionManufacturingIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
            DALL-E Imagination Contest
            </Typography>
          </div>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link key={index} to={page[1]}>
                  {page[0]}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppMenu;
