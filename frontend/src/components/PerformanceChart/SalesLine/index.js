import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip);

class SalesLine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
                labels: [],
                datasets: [],
            },
            option:{
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        bodyFont: {
                            family: "Montserrat"
                        },
                        titleFont: {
                            family: "Montserrat"
                        }
                    }
                },
                scales :{
                    x: {
                        ticks: {
                            font: {
                                family: 'Montserrat'
                            }
                        }
                    },
                    y: {
                        min: 0,
                        ticks: {
                            stepSize: 1,
                            font: {
                                family:'Montserrat'
                            }
                        }
                      }
                }
            }
        };
        this.getData = this.getData.bind(this);
    }

    getData(){
        const ticketSales = this.props.ticketSales;
        if(ticketSales.length === 0){
            return;
        }
        let labels = ticketSales.map((item)=> moment(item.orderDateTime).format('DD MMM'));
        let sales = ticketSales.map((item)=> item.ticketSold);
        this.setState({
            data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Ticket Sales',
                    data: sales,
                    borderColor: '#F58444',
                    backgroundColor: '#F58444',
                  }
                ],
            },
        });
    }

    componentDidMount(){
        this.getData()
    }
    
    render(){
        const ticketSales = this.props.ticketSales;
        return (
            <div>
                <div className="p-2">
                    {ticketSales.length > 0 && (
                        <Line data={this.state.data} options={this.state.option}/>
                    )}
                </div>
                    {ticketSales.length === 0 && (
                        <p className="detailSubText">No ticket sale is found.</p>
                    )}
            </div>
        );
    }
}

export default SalesLine;