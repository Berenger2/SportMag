import React from 'react'
import StatisticsChart from './StatisticsChart'
import MyKpi from './MyKpi'

export default function MyDashboard() {
  return (
    <>
    <div className="col-lg-8 col-12">
            <MyKpi/>
          <StatisticsChart/>

    </div>
        
    </>
  )
}
