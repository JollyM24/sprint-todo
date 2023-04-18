import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
import './Metrics.css'

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

function Metrics() {

  const [dates, setDates] = useState([])
  const [dones, setDones] = useState([])
  const [plan, setPlan] = useState([])
  const [charData, setCharData]= useState({
    labels: [],
    datasets: []
  })
  const [count, setCount] = useState(null)

  const getDatas = async () => {
      try {
        // get dates of sprint
        const response = await fetch('http://localhost:8000/score/dates')
        if (response.status === 200) {
          const initDates = await response.json()
          setDates(initDates)
        }
        
        // get count of all tasks in sprint
        const response3 = await fetch('http://localhost:8000/sprints/task_count')
        if (response3.status === 200) {
          const taskCounts = await response3.json()
          setCount(taskCounts)
        }
        var new_count = count
        
        // get and edit array of done tasks of each sprint date
        const response2 = await fetch('http://localhost:8000/score/dones')
        if (response2.status === 200) {
            var initDones = await response2.json()
            var newDones = initDones.map((a) => {
              a = new_count - a
              new_count = a
              return a
            })
            setDones(newDones)
          }

          // create an ideal plan using days count and count of all tasks
          new_count = count
          var days = dones.length
          const coef = new_count/days
          var pre_plan = []

          for(var i = 0; i < dones.length; i++) {
            pre_plan[i] = Math.floor(new_count - coef * i)
          }
          setPlan(pre_plan)
      } catch (err) {
        console.error(err)
      }
    }

    async function dummyChart() {
      await getDatas()
  
      // create and render chart
      if (dates && dones) {
        await setCharData({
          labels: dates,
          datasets:[
            {
              label:"Фактическая тенденция",
              data: dones,
              borderColor:'red',
              pointBorderColor:'red',
              pointBackgroundColor:'#fff',
              showLine:true
            }, {
              label:"Идеальная тенденция",
              data: plan,
              borderColor:'grey',
              pointBorderColor:'grey',
              pointBackgroundColor:'#fff',
              showLine:true
            }
          ]
        })
      }
    }

    dummyChart()

    return (
        <div className="Metrics">
          <div className="header">
            <h1>Метрики</h1>
          </div>

          <div className="main">
            <div className="metric-container">
              <div className="title">
                <h2>Диаграмма сгорания задач</h2>
                <h4>По активному спринту</h4>
              </div>

              <div className="burndown" style={{width:'900px', height:'480px'}}>
                <Line data={charData} />
              </div>
            </div>
          </div>
        </div>
    )
};

export default Metrics;