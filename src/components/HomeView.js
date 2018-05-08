import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { withRouter } from 'react-router-dom'

import { Route } from 'react-router-dom'

import TenantsView from './TenantsView'
import EvaluationsView from './EvaluationsView'
import TenantDetails from './TenantDetails'
import EvaluationDetails from './EvaluationDetails'
import ConfigurationsView from './ConfigurationsView'

import LeftMenu from './LeftMenu'

class HomeView extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div id="page">
          <header>
            <AppBar
              title={<span>Inovaparq</span>}
              showMenuIconButton={false}
              iconElementRight={
                <FlatButton label="Sair" onClick={this.props.logout} />
              }
            />
          </header>
          <nav>
            <LeftMenu parentContext={this} appContext={this.props.appContext} />
          </nav>
          <main>
            <div> 
              <Route exact path="/" component={TenantsView} />
              <Route exact path="/empresas" component={TenantsView} />
              <Route exact path="/avaliacoes" component={EvaluationsView} />
              <Route exact path="/empresas/:id" component={TenantDetails} />
              <Route exact path="/avaliacao/:id" component={EvaluationDetails} />
              <Route exact path="/avaliacao/" component={EvaluationDetails} />
              <Route exact path="/configuracoes/" component={ConfigurationsView} />
            </div>
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(HomeView)
