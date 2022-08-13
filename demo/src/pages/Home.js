import React from 'react';
import Table from '../components/Table.js';
import Display from '../components/Display.js';

function Home(){
    const [lastBalance, setLastBalance] = React.useState([{}]);
    const [balance, setBalance] = React.useState([{}]);

    const getLastBalance = ()=>{
        const api = new XMLHttpRequest();
        api.open('GET', 'http://localhost:8080/last-balance', true);
        api.send();

        api.onreadystatechange = () => {
            if(api.status == 200 && api.readyState == 4){
                setLastBalance(JSON.parse(api.responseText));
             }

        }
    }

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
        getLastBalance();
        getBalance();
    }, []);
    
  
    return(
        <div className="Home">
            <Display
                title = 'Balance actual'
                value = {lastBalance}
            />

            <Table
                title = 'Ultimos balances registrados'
                data = {balance}
                isOperationsTable = {false}
            />
        </div>
    );
}

export default Home;