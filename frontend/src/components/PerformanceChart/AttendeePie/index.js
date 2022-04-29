import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

class AttendeePie extends React.Component{
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
                      labels: {
                        font: {
                          family: "Montserrat"
                        }
                      },
                      tooltip: {
                        bodyFont: {
                          family: "Montserrat"
                        },
                        titleFont: {
                          family: "Montserrat"
                        }
                      }
                    }
                  },
            }
        };
        this.getData = this.getData.bind(this);
    }

    getData(){
        const attendances = this.props.attendances
        if(attendances.length === 0){
            return;
        }
        let attended = attendances.find((item) => item.name === "Attended")
        let unattended = attendances.find((item) => item.name === "Unattended")
        this.setState({
            data: {
                labels: [attended.name, unattended.name],
                datasets: [
                {
                    label: 'Attendance',
                    data: [attended.value, unattended.value],
                    backgroundColor: [
                        '#F27B66',
                        '#0659A8',
                    ],
                    borderColor: [
                        '#F27B66',
                        '#0659A8',
                    ],
                    borderWidth: 1,
                    
                },
                ],
            }
        })
    }

    componentDidMount(){
        this.getData()
    }
    
    render(){
        const attendances = this.props.attendances;
        return (
            <div>
                <div className="p-2">
                    {attendances.length > 0 && (
                        <Pie data={this.state.data} options={this.state.option}/>
                    )}
                </div>
                {attendances.length === 0 && (
                    <p className="detailSubText">No attendee is found.</p>
                )}
            </div>

        );
    }
}

export default AttendeePie;