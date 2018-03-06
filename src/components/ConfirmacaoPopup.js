import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import Modal from './Modal'

export default class ConfirmacaoPopup extends React.Component {
  constructor(props) {
    super(props)
  }

  handleOpen = () => {
    this.refs.modal.handleOpen()
  }

  handleClose = () => {
    this.refs.modal.handleClose()
  }

  confirm = () => {}

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
