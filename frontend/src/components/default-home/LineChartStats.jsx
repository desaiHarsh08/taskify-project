import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { Card } from "flowbite-react";

const LineChartStats = () => {

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490,3490,3490,3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 4300, 4300, 4300];
    const xLabels = [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ];

    return (
        <LineChart
            width={450}
            height={250}
            series={[
                { data: pData, label: '2023' },
                { data: uData, label: '2024' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
    )
}

export default LineChartStats