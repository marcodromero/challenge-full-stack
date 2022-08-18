import React from 'react';
import Table from '../components/Table.js';
import Display from '../components/Display.js';
import Navbar from '../components/Navbar.js';

function Home(){
    const [balance, setBalance] = React.useState([{}]);

    const getBalance = ()=>{
        const api = new XMLHttpRequest();
        api.open('GET', 'http://localhost:8080/balance', true);
        api.send();

        api.onreadystatechange = () => {
            if(api.status == 200 && api.readyState == 4){
                setBalance(JSON.parse(api.responseText));
             }

        }
    }

    React.useEffect(()=>{
        getBalance();
    }, []);
    
  
    return(
        <div className="Home">
            <Navbar />
            <Display
                title = 'Balance actual'
                data = {balance}
                idTarget = ''
                isOperations = {false}
            />

            <Table
                title = 'Balances registrados'
                data = {balance}
                isOperationsTable = {false}
                idTarget = ''

            />
        </div>
    );
}

export default Home;