import React from 'react'
import FlatButton from 'material-ui/FlatButton'

import Modal from './Modal'

export default class ConfirmacaoPopup extends React.Component {
  handleOpen = () => {
    this.refs.modal.handleOpen()
  }

  handleClose = () => {
    this.refs.modal.handleClose()
  }

  confirm = () => {
    this.props.confirm()
    this.handleClose()
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.confirm}
      />
    ]
    return (
      <div>
        <Modal ref="modal" title={'Tem certeza disso?'} actions={actions} />
      </div>
    )
  }
}
