import React,{useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Dashboard.css'
// import {Link} from "react-router-dom";
import BarChart from "../Barchart/BarChart"
import PieChart from "../Piechart/PieChart"
import axios from 'axios';
import { UserContext } from "../../App";
import { useContext } from "react";
import PieChartSatvik from "../PieChartSatvik"

export const Dashboard = (props) => {

        const[accData, setAccData] = useState({});
        const {state,dispatch} = useContext(UserContext);
        useEffect(() =>{
          dispatch({type:"USER",payload : true});
          // console.log(state);
        }, [])
        const [monExpenses, setMonExpenses] = useState({});
        useEffect(() => {
            // console.log(accData);
            console.log("dashboard randored");
            axios.get(`/api/users/get/${localStorage.getItem('userID')}`)
            .then((res) => {
                setAccData(res.data);
                setMonExpenses(res.data.monthlyExpenses)
                // console.log(res.data); 
                // console.log(accData);

            })
            .catch( (error) => {
                console.log(error);
            })
            // console.log(accData);
        }, [])


        // this will update barchart based on day and expenses used within last 7 day
        // one problem remains that this will give error if 7 day week is in 2 diff months
        
        var today = new Date();
        var month = today.getMonth() + 1;
        var fullDate = '/' + month + '/' + today.getFullYear();  

        var currDay = today.getDate();
        var tmp = "";
        var bar = [tmp.concat(currDay - 6, fullDate), 
                    tmp.concat(currDay - 5, fullDate), 
                    tmp.concat(currDay - 4, fullDate), 
                    tmp.concat(currDay - 3, fullDate), 
                    tmp.concat(currDay - 2, fullDate),
                    tmp.concat(currDay - 1, fullDate),
                    tmp.concat(currDay, fullDate)
        ];
        console.log(bar);
        const expenseData = [
            {
              height: monExpenses[bar[0]] === undefined ? 0 : monExpenses[bar[0]],
              day: "Sun",
              colors: ["#ffd847", "#e0a106"]
            },
            {
              height: monExpenses[bar[1]] === undefined ? 0 : monExpenses[bar[1]],
              day: "Mon",
              colors: ["#af8ebf", "#7b20a8"]
            },
            {
              height: monExpenses[bar[2]] === undefined ? 0 : monExpenses[bar[2]],
              day: "Tue",
              colors: ["#add9c0", "#1da890"]
            },
            {
              height: monExpenses[bar[3]] === undefined ? 0 : monExpenses[bar[3]],
              day: "Wed",
              colors: ["#cbd9ad", "#7ca81d"]
            },
            {
              height: monExpenses[bar[4]] === undefined ? 0 : monExpenses[bar[4]],
              day: "Thur",
              colors: ["#d9c1ad", "#714511"]
            },
            {
              height: monExpenses[bar[5]] === undefined ? 0 : monExpenses[bar[5]],
              day: "Fri",
              colors: ["#ba737a", "#851d28"]
            },
            {
              height: monExpenses[bar[6]] === undefined ? 0 : monExpenses[bar[6]],
              day: "Sat",
              colors: ["#98a3d4", "#1d36a8"]
            }
          ];

    return (
        <div className="mainContainer">
            <div className="firstBox">
                <div class="box">
                    <h3 style={{color:"#1d36a8"}}>${accData.totalIncome}</h3>
                    <p>Income</p>
                </div>
                <div class="box">
                    <h3 style={{color:"#7b20a8"}}>${accData.totalIncome - accData.totalExpenses}</h3>
                    <p>Balance</p>
                </div>
                
                <div class="box">
                    <h3 style={{color:"#e0a106"}}>${accData.totalExpenses}</h3>
                    <p>Expenses</p>
                </div>
                <PieChartSatvik ID={localStorage.getItem('userID')}
            accData = {accData} />
            </div>
            <div className="firstBox">
            <BarChart expenseData = {expenseData}/>
            </div>
            <div className="firstBox">
            <PieChart ID={localStorage.getItem('userID')}
            accData = {accData} />
            </div>

        </div>
    )
}
export default Dashboard;