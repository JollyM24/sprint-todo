import React from 'react';
import { useState, useEffect } from 'react';
import './Metrics.css'

import BurndownChart from './Components/BurndownChart';
import VelocityChart from './Components/VelocityChart';
//bla bla
function Metrics() {

  const [dates, setDates] = useState([])
  const [donesCount, setDonesCount] = useState([])
  const [donesTotal, setDonesTotal] = useState([])
  const [donesStartTotal, setDonesStartTotal] = useState([])
  const [plan, setPlan] = useState([])
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    getDatas()
  }, [])

  const getDatas = async () => {
    try {
      // get dates of sprint
      const datesRes = await fetch('http://localhost:8000/score/dates')
      if (datesRes.status === 200) {
        const initDates = await datesRes.json()
        setDates(initDates)
      }
      
      const donesCountRes = await fetch('http://localhost:8000/score/dones/count')
      if (donesCountRes.status === 200) {
          const initDonesCount = await donesCountRes.json()
          setDonesCount(initDonesCount)
        }

      // get and edit array of done tasks of each sprint date
      const donesTotalRes = await fetch('http://localhost:8000/score/dones/total')
      if (donesTotalRes.status === 200) {
          const initDonesTotal = await donesTotalRes.json()
          setDonesTotal(initDonesTotal)
        }

      const donesStartTotalRes = await fetch('http://localhost:8000/score/dones/start_total')
      if (donesStartTotalRes.status === 200) {
          const initDonesStartTotal = await donesStartTotalRes.json()
          setDonesStartTotal(initDonesStartTotal)
        }

      const planRes = await fetch('http://localhost:8000/score/plan')
      if (planRes.status === 200) {
        const planInit = await planRes.json()
        setPlan(planInit)
      }

      await setIsLoad(true)
      // tasksCountRes = await api.sprints.getTasksCount()
      } catch (err) {
      console.error(err)
    }
  }

    return (
        <div className="Metrics">
          <div className="header">
            <h1>Метрики</h1>
          </div>

          {isLoad
            ? <div className="main">
              <BurndownChart dates={dates} donesTotal={donesTotal} plan={plan}/>
              <VelocityChart dates={dates} donesTotal={donesStartTotal} donesCount={donesCount}/>
            </div>
            : <p> loading </p>
          }
        </div>
    )
};

export default Metrics;