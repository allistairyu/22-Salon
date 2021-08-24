import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'

export default function CancelDialog(props) {
    return (
        <div>
            <Dialog
                open={props.cancelDialog}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Cancel appointment?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to cancel this appointment?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => props.handleClose(true)} style={{backgroundColor: "#b90d1f", color: "white"}}>
                    Yes
                </Button>
                <Button onClick={() => props.handleClose(false)} color="primary" autoFocus>
                    No
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
