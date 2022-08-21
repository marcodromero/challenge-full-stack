import React from 'react';
import Card from '../components/Card.js';
import SmallCard from '../components/SmallCard.js';
import Navbar from '../components/Navbar.js';

function Home(){
    const [balance, setBalance] = React.useState([{}]);
    const serverIp = "192.168.1.46:8080";
    
    //Request for all existing operations on the database.
    const getBalance = ()=>{
        const api = new XMLHttpRequest();
        api.open('GET', `http://${serverIp}/balance`, true);
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
        <>
        <Navbar />
        <div className="container-fluid">
            
            <SmallCard
                title = 'Balance actual'
                data = {balance}
                idTarget = ''
                isOperations = {false}
            />

            <Card
                title = 'Balances registrados'
                data = {balance}
                isOperationsTable = {false}
                idTarget = ''

            />
        </div>
        </>
    );
}

export default Home;