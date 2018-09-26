import React, {
    Component
} from 'react';
import './App.css';
import Routes from './Router'

class App extends Component {
    render() {
        if (typeof(Storage) !== "undefined") {
            if (localStorage.BBSAddress !== null && localStorage.BBSAddress !== undefined) {
                window.BBSAddress = localStorage.BBSAddress
            } else {
                window.BBSAddress = '0x4d67eF9E064f831b7B51359ffDBc77dA3eA6c8dD'
                localStorage.BBSAddress = '0x4d67eF9E064f831b7B51359ffDBc77dA3eA6c8dD'
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
