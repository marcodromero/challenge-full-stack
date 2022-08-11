import React from 'react';

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
            <h1>Balance actual</h1>
                <p>{lastBalance[0].amount}</p>
            <h1>Ultimos balances registrados</h1>
            {
                balance.map(item => (
                    <p key = {item.id_balance}> {item.amount} {item.date}</p>
                ))
            }
        </div>
    );
}

export default Home;