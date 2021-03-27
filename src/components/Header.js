import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from 'next/link';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import styles from '../styles/pages/Header.module.css'
import { BibleContext } from '../contexts/BibleContext';
import { Paper, Switch } from '@material-ui/core';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness2Icon from '@material-ui/icons/Brightness2';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Header(props) {
  const {
    darkMode,
    setDarkMode
  } = useContext(BibleContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper elevation={0} className={styles.root}>
      <header className={styles.header}>
        <ElevationScroll {...props}>
          <AppBar color="inherit">
            <Toolbar
              className={darkMode ? styles.toolbarDark : styles.toolbar}
              // style={darkMode ? {backgroundColor: secondaryBgColor} : {backgroundColor: lightBgColor}}
            >
              <div className={styles.container}>
              
                <Link href="/">
                  <a className={darkMode ? styles.linkDark : styles.link}>
                    <Typography variant='h6'>Bíblia a Mensagem</Typography>
                  </a>
                </Link>

                <div className={styles.headerItems}>
                  <Link href='/sobre'>
                    <a className={darkMode ? styles.linkDark : styles.link}>
                      <Typography variant='h6'>Sobre</Typography>
                    </a>
                  </Link>

                  <Link href='/docs/api'>
                    <a className={darkMode ? styles.linkDark : styles.link}>
                      <Typography variant='h6'>API</Typography>
                    </a>
                  </Link>
                  
                  <div className={styles.darkMode}>
                    <Brightness7Icon />
                    <Switch color="secondary" checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
                    <Brightness2Icon />
                  </div>
                </div>


                <div className={styles.menuIcon}>
                  <IconButton
                    aria-label="menu icon"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link href="/">
                        Livros
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <Link href="/sobre">
                        Sobre
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <Link href="/docs/api">
                          API
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <Brightness7Icon fontSize="small"/>
                      <Switch color="secondary" checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
                      <Brightness2Icon fontSize="small"/>
                    </MenuItem>

                  </Menu>
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </header>
    </Paper>
  );
}
