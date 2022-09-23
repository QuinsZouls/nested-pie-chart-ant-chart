import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Mix } from '@ant-design/plots';

const DemoMix = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/antfincdn/fKTgtjKdaN/association-pie.json'
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  if (!Object.keys(data).length) {
    return null;
  }
  const config = {
    // 关闭 chart 上的 tooltip，子 view 开启 tooltip
    tooltip: false,
    legend: true,
    plots: [
      {
        type: 'pie',
        region: {
          start: { x: 0.2, y: 0.2 },
          end: { x: 0.8, y: 0.8 },
        },
        options: {
          data: data.pie1,
          angleField: 'bill',
          colorField: 'area',
          radius: 1,
          innerRadius: 0.8,
          tooltip: {
            showMarkers: false,
          },
          label: {
            type: 'outer',
          },
          interactions: [
            {
              type: 'element-active',
            },
            {
              type: 'association-tooltip',
            },
            {
              type: 'association-highlight',
            },
          ],
        },
      },
      {
        type: 'pie',
        options: {
          data: data.pie2,
          angleField: 'value',
          colorField: 'area',
          radius: 1,
          innerRadius: 0.8,
          statistic: null,
          tooltip: {
            showMarkers: false,
          },
          label: {
            type: 'outer',
          },
          interactions: [
            {
              type: 'association-tooltip',
            },
            {
              type: 'association-selected',
            },
          ],
        },
      },
    ],
  };

  return <Mix {...config} />;
};

ReactDOM.render(<DemoMix />, document.getElementById('container'));
