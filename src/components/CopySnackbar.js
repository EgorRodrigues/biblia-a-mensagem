import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from '../styles/pages/CopySnackbar.module.css'
import { SnackbarContent } from '@material-ui/core';
import { BibleContext } from '../contexts/BibleContext';

export default function CopySnackbar(props) {
  const { darkMode } = useContext(BibleContext)

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>Top-Center</Button>
      <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>Top-Right</Button>
      <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
        Bottom-Right
      </Button>
      <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
        Bottom-Center
      </Button>
      <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}>Bottom-Left</Button>
      <Button onClick={handleClick({ vertical: 'top', horizontal: 'left' })}>Top-Left</Button>
    </React.Fragment>
  );
  
  return (
    <>
      <CopyToClipboard
        text={props.content}
        onCopy={handleClick({ vertical: 'bottom', horizontal: 'left' })}
      >
        <FileCopyIcon fontSize="small" className={darkMode ? styles.iconDark : styles.icon}/>
      </CopyToClipboard>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        color="secondary"
        autoHideDuration={2000}
        onClose={handleClose}
        key={vertical + horizontal}
        className={styles.root}
      >
        <SnackbarContent className={darkMode ? styles.snackbarDark : styles.snackbar}
        message={'Texto copiado para a área de transferência'}
      />
      </Snackbar>
    </>
  );
}
