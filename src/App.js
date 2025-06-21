import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // 👈 Importa el contexto
import { Header } from './components/ui/Header';
import { GeneroView } from './components/genero/GeneroView';
import { MediaView } from './components/media/MediaView';
import { MediaUpdate } from './components/media/MediaUpdate';
import { MediaDetail } from './components/media/MediaDetail';
import { ProductoraView } from './components/productora/ProductoraView';
import { TipoView } from './components/tipo/TipoView';
import { DirectorView } from './components/director/DirectorView';
import { LoginView } from './views/LoginView';
import RecuperarContraseña from './views/RecuperarContraseña';
import { AdminPanel } from './views/AdminPanel';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { Unauthorized } from './views/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login" component={LoginView} />
          <Route exact path="/recuperar" component={RecuperarContraseña} />

          <PrivateRoute exact path="/" component={MediaView} />
          <PrivateRoute exact path="/director" component={DirectorView} adminOnly />
          <PrivateRoute exact path="/genero" component={GeneroView} adminOnly />
          <PrivateRoute exact path="/productora" component={ProductoraView} adminOnly />
          <PrivateRoute exact path="/tipo" component={TipoView} adminOnly />
          <PrivateRoute exact path="/admin" component={AdminPanel} adminOnly />
          <PrivateRoute exact path="/medias/edit/:mediaId" component={MediaUpdate} />
          <PrivateRoute exact path="/medias/detail/:id" component={MediaDetail} />

          <Route exact path="/unauthorized" component={Unauthorized} />

          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
