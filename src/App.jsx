import React from 'react';
import './App.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

import PrototypeGrid from './components/PrototypeGrid';
import ReactQueryTrials from './components/ReactQueryTrials';
import iframetest from './components/iframetest';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
    return (
        <div>
            <Router>
                <div>
                    <nav>
                        <li>
                            <Link to="/">Prototype Grid</Link> |
                        </li>
                        <li>
                            <Link to="/reactquery">React query</Link> |
                        </li>
                        <li>
                            <Link to="/iframetest">IFrame tests</Link>
                        </li>
                    </nav>
                </div>

                <Switch>
                    <Route exact path="/" component={PrototypeGrid}>
                    </Route>
                    <Route exact path="/reactquery" component={ReactQueryTrials}>
                    </Route>
                    <Route exact path="/iframetest" component={iframetest}>
                        
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
