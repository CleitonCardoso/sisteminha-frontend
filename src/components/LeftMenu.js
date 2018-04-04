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
      <div>
        <Paper>
          <Menu>
            <MenuItem
              style={itemButton}
              primaryText="Incubadas"
              containerElement={<NavLink to="/empresas" />}
              leftIcon={<BusinessCenter />}
            />
            <MenuItem
              style={itemButton}
              primaryText="Avaliações"
              containerElement={<NavLink to="/avaliacoes" />}
              leftIcon={<ContentPaste />}
            />
            <MenuItem
              style={itemButton}
              primaryText="Configurações"
              containerElement={<NavLink to="/configuracoes" />}
              leftIcon={<Settings />}
            />
          </Menu>
        </Paper>
      </div>
    )
  }
}

export default withRouter(LeftMenu)

const itemButton = {
  width: '14.4em'
}
