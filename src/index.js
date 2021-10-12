import '@webcomponents/webcomponentsjs/webcomponents-loader';
import './index.scss';

function loadCoreComponents () {
  // load additional components to be part of the core here
  // use require instead of import to load the components
  // require('./components/core/header-component');
  // require('./components/core/footer-component');
}

function webComponentsInitialized () {
  if (window.WebComponents.initialized) return;
  window.WebComponents.initialized = true;
  initialize().then(loadCoreComponents);
}

if (window.WebComponents.initialized) {
  initialize().then(loadCoreComponents);
}

window.WebComponents.waitFor(webComponentsInitialized);