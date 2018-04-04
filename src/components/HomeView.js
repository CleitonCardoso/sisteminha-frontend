import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { withRouter } from 'react-router-dom'

import { Route } from 'react-router-dom'

import EmpresasView from './EmpresasView'
import AvaliacoesView from './AvaliacoesView'
import EmpresaDetails from './EmpresaDetails'
import AvaliacaoDetails from './AvaliacaoDetails'
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
              <Route exact path="/" component={EmpresasView} />
              <Route exact path="/empresas" component={EmpresasView} />
              <Route exact path="/avaliacoes" component={AvaliacoesView} />
              <Route exact path="/empresas/:id" component={EmpresaDetails} />
              <Route exact path="/avaliacao/:id" component={AvaliacaoDetails} />
              <Route exact path="/avaliacao/" component={AvaliacaoDetails} />
              <Route exact path="/configuracoes/" component={ConfigurationsView} />
            </div>
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(HomeView)
