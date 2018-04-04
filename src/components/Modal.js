import React from 'react'
import Dialog from 'material-ui/Dialog'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      user: {}
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = event => {
    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={this.props.actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        />
      </div>
    )
  }
}
