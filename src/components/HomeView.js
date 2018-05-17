import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import Cookies from 'universal-cookie'
import IncubatorTenantsView from './TenantsView'
import IncubatorEvaluationsView from './EvaluationsView'
import IncubatorTenantDetails from './TenantDetails'
import IncubatorEvaluationDetails from './EvaluationDetails'
import IncubatorConfigurationsView from './ConfigurationsView'

import TenantConfigurationsView from './TenantConfigurationsView'

import TenantEvaluationsView from './TenantEvaluationsView'
import EvaluationResponseView from './EvaluationResponseView'

import LeftMenu from './LeftMenu'

import TenantLeftMenu from './TenantLeftMenu'

const cookies = new Cookies()

class HomeView extends React.Component {

  render() {
    var menu = cookies.get('credentials')['role'] === 'INCUBATOR' ?
      <LeftMenu parentContext={this} appContext={this.props.appContext} />
      : <TenantLeftMenu parentContext={this} appContext={this.props.appContext} />
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
            {menu}
          </nav>
          <main>
            {/* INCUBATOR */}
            <div>
              <Route exact path="/INCUBATOR/" component={IncubatorTenantsView} />
              <Route exact path="/INCUBATOR/empresas" component={IncubatorTenantsView} />
              <Route exact path="/INCUBATOR/avaliacoes" component={IncubatorEvaluationsView} />
              <Route exact path="/INCUBATOR/empresas/:id" component={IncubatorTenantDetails} />
              <Route exact path="/INCUBATOR/avaliacao/:id" component={IncubatorEvaluationDetails} />
              <Route exact path="/INCUBATOR/avaliacao/" component={IncubatorEvaluationDetails} />
              <Route exact path="/INCUBATOR/configuracoes/" component={IncubatorConfigurationsView} />
            </div>
            {/* TENANT */}
            <div>
              <Route exact path="/TENANT/" component={TenantEvaluationsView} />
              <Route exact path="/TENANT/avaliacoes" component={TenantEvaluationsView} />
              <Route exact path="/TENANT/avaliacao/:id" component={EvaluationResponseView} />
              <Route exact path="/TENANT/configuracoes" component={TenantConfigurationsView} />
            </div>
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(HomeView)
