import App from './app';
import AuthRoute from './src/routes/auth.route';

const app = new App([
  new AuthRoute()
]);

app.start();
