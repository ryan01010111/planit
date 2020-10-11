import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../auth';
import Sidebar from '../layout/Sidebar';
import Loading from './Loading';
import Account from './Account';
import Materials from './Materials';
import MaterialsViewer from './MaterialsViewer';
import IntroDialog from './IntroDialog';
import Checkout from './Checkout';
import About from './About';
import { OrderProvider } from '../contexts/OrderContext';

export default class Dashboard extends Component {
    state = {
        display: {
            sidebar: false,
            overlay: false
        },
        loaded: false,
        materials: [],
        purchasedIDs: [],
        purchasedMaterials: []
    }

    fetchData = async url => {
        const res = await fetch(url, {
            method: 'GET',
            headers: Auth.headerTemplate()
        })
        const data = await res.json();
        return data;
    }

    async componentDidMount() {
        const data = await this.fetchData('/api/materials');
        const data2 = await this.fetchData('/api/auth/purchased_materials');
        const purchasedMaterials = data.filter(item => data2.purchased.includes(item.id));
        this.setState({
            loaded: true,
            materials: data,
            purchasedIDs: data2.purchased,
            purchasedMaterials,
        })
    }

    toggleDisplay = name => {
        let copy = this.state.display;
        copy[name] = !copy[name];
        this.setState({ display: copy })
    }

    hideAll = () => {
        let copy = this.state.display;
        const keys = Object.keys(copy);
        keys.forEach(key => copy[key] = false);
        this.setState({ display: copy })
        document.querySelector('#materials-info').classList.add('hide');
    }

    updatePurchased = async () => {
        const data = await this.fetchData('/api/auth/purchased_materials');
        const purchasedMaterials = this.state.materials.filter(item => data.purchased.includes(item.id));
        this.setState({
            purchasedIDs: data.purchased,
            purchasedMaterials,
        })
    }

    render() {
        return !this.state.loaded
            ? (
                <Router>
                    <Loading />
                </Router>
            )
            : (
                <Router>
                    <OrderProvider>
                        <div id="dashboard">
                            <Sidebar
                                display={this.state.display.sidebar}
                                toggleDisplay={this.toggleDisplay}
                            />
                            <Switch>
                                <Route path="/materials">
                                    <Materials
                                        materials={this.state.materials}
                                        view="All Plans"
                                        purchasedIDs={this.state.purchasedIDs}
                                        toggleDisplay={this.toggleDisplay}
                                    />
                                </Route>
                                <Route path="/view/:id">
                                    <MaterialsViewer materials={this.state.materials} />
                                </Route>
                                <Route path="/account" component={Account} />
                                <Route path="/intro" component={IntroDialog} />
                                <Route path="/checkout/:id">
                                    <Checkout
                                        updatePurchased={this.updatePurchased}
                                    />
                                </Route>
                                <Route path="/about" component={About} />
                                <Route path="/">
                                    <Materials
                                        materials={this.state.purchasedMaterials}
                                        view="My Materials"
                                        purchasedIDs={this.state.purchasedIDs}
                                        toggleDisplay={this.toggleDisplay}
                                    />
                                </Route>
                            </Switch>
                        </div>
                        {(this.state.display.sidebar || this.state.display.overlay) &&
                            <div id="background-overlay"
                                onClick={this.hideAll}
                            >
                            </div>
                        }
                    </OrderProvider>
                </Router>
            )
    }
}
