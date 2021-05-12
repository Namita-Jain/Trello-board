import React from 'react';
import { Dialog, makeStyles } from '@material-ui/core';
import { COLORS } from '../constants/color';


export interface DialogProps {
  opened: boolean
  handleClose: () => void
  title?: string,
  id: string
}

const useStyles = () => makeStyles(()  =>  ({
  paper: {
    maxHeight: '75vh',
    minHeight: '40vh',
    width: '414px',
    borderRadius: `12px`,
    paddingBottom: '20px',
    margin: 'inherit'
  },
  heading: {
    fontSize: '24px',
    lineHeight: '28px',
    textAlign: 'left',
    color: COLORS.primaryColor,
    wordBreak: 'break-word',
    marginBottom: 0,
    padding: '0 10px 10px',
    borderBottom: `1px solid ${COLORS.primaryColor}`,

  },
  closeButton: {
    position: 'absolute',
    right: '15px',
    top: '15px',
    cursor: 'pointer',
    zIndex: 1,
    fontSize: '30px',
    color: COLORS.secondaryColor,
    background: COLORS.primaryColor,
    boxShadow: '0px 0px 15px rgb(0 0 0 / 25%)',
    borderRadius: '100px',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    margin: '10px 20px',
    minHeight: '40vh'
  },
}));
export const Modal: React.FC<DialogProps> = ({ opened, handleClose, title, children, id })=> {
    const { paper, closeButton, heading, modalBody } = useStyles()();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.keyCode === 13) {
      e.preventDefault();
      handleClose();
    }
  };

  return (
    <div>
      <Dialog
        PaperProps={{
            classes: {
                root: paper
            }
        }}
        scroll="paper"
        open={opened}
        keepMounted
        onClose={handleClose}
        aria-describedby = {id}
        aria-labelledby= {id}
      >
        {title && (
          <div>
            <h3 className={heading}>{title}</h3>
          </div>
        )}
         <div className={ closeButton } onClick={handleClose} aria-hidden="true" role="button" tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
            <i>X</i>
          </div>
        <div className={modalBody}>
          {children}
        </div>
      </Dialog>
    </div>
  );
};
