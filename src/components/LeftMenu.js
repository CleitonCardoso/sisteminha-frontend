import React from 'react'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import BusinessCenter from 'material-ui/svg-icons/places/business-center'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'
import Settings from 'material-ui/svg-icons/action/settings'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

class LeftMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.location.state
  }

  render() {
    return (
      <div style={style}>
        <Paper>
          <Menu>
            <MenuItem
              style={itemButton}
              primaryText="Incubadas"
              containerElement={<NavLink to="/empresas" />}
              leftIcon={<BusinessCenter style={icon} />}
            />
            <MenuItem
              style={itemButton}
              primaryText="Avaliações"
              containerElement={<NavLink to="/avaliacoes" />}
              leftIcon={<ContentPaste style={icon} />}
            />
            <MenuItem
              style={itemButton}
              primaryText="Configurações"
              containerElement={<NavLink to="/configuracoes" />}
              leftIcon={<Settings style={icon} />}
            />
          </Menu>
        </Paper>
      </div>
    )
  }
}

export default withRouter(LeftMenu)

const style = {
  // position: 'inline-block'
}

const itemButton = {
  width: '14.4em',
  // overflow: 'hidden'
}

const icon = {}
