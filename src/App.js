import React, {
    Component
} from 'react';
import './App.css';
import Routes from './Router'
import {defaultContract} from './contract/constantNoAdmin'

class App extends Component {
    render() {
        if (typeof(Storage) !== "undefined") {
            if (localStorage.BBSAddress !== null && localStorage.BBSAddress !== undefined) {
                window.BBSAddress = localStorage.BBSAddress
            } else {
                window.BBSAddress = defaultContract
                localStorage.BBSAddress = defaultContract
            }
            console.log(window.BBSAddress)
        } else {
            alert("Sorry! No Web Storage support..")
        }
        return (<Routes/>
        );
    }
}

export default App;
