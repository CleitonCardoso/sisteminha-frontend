import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { withRouter } from 'react-router-dom'

import { BrowserRouter, Route } from 'react-router-dom'

import EmpresasView from './EmpresasView'
import AvaliacoesView from './AvaliacoesView'
import EmpresaDetails from './EmpresaDetails'
import AvaliacaoDetails from './AvaliacaoDetails'

import LeftMenu from './LeftMenu'

class HomeView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="page">
        <MuiThemeProvider>
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
            </div>
          </main>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withRouter(HomeView)
