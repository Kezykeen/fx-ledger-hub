import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
export const ChartWrapper = ({
  type,
  backgrounds,
  stepSize,
  chartData,
  aspectRatio,
  borderRadius,
}) => {
  const chartRef = useRef(null);

  const labels = chartData?.map((data) => Object.values(data)?.[0]);
  const values = chartData?.map((data) => Object.values(data)?.[1]);

  const info = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgrounds,
        borderWidth: 1,
        borderRadius: borderRadius || 0,
      },
    ],
  };

  const centerText = {
    id: "centerText",
    beforeDatasetsDraw(chart, arg, pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.whiteSpace = "wrap";
      ctx.font = "bolder 21px Montserrat?";
      ctx.fillStyle = "#121517";
      ctx.scale = 2;
      ctx.fillText(
        `${data.datasets[0].data.reduce((a, b) => a + b, 0)}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y - 10
      );
    },
  };

  const centerText2 = {
    id: "centerText",
    beforeDatasetsDraw(chart, arg, pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.whiteSpace = "wrap";
      ctx.font = "normal 12px sans-serif";

      ctx.fillStyle = "#4E5053";
      ctx.fillText(
        `Total Tickets`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y + 10
      );
    },
  };

  const options = {
    aspectRatio: aspectRatio,
    responsive: true,
    scales: {
      y: {
        grid: {
          drawOnChartArea: true,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      x: {
        display: true,
        grid: {
          drawOnChartArea: true,
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}%`;
          },
        },
      },
      datalabels: {
        align: "center",
        color: "white",
        fontWeight: 300,
        fontSize: "30px",
        formatter: (value, context) => {
          const datapoints = context.chart.data.datasets[0].data;
          const totalValue = datapoints.reduce((a, b) => a + b, 0);
          const percentage = Math.round((value / totalValue) * 100).toFixed(1);
          return `${percentage}%`;
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: stepSize,
        },
        display: true,
      },
      x: {
        display: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      let newChart;
      switch (type) {
        case "doughnut":
          newChart = new Chart(context, {
            type: "doughnut",
            data: {
              ...info,
              datasets: [{ ...info.datasets[0], borderColor: backgrounds }],
            },
            options: doughnutOptions,
            plugins: [centerText, centerText2, ChartDataLabels],
          });
          break;
        case "line":
          newChart = new Chart(context, {
            type: "line",
            data: info,
            options: lineOptions,
          });
          break;
        case "pie":
          newChart = new Chart(context, {
            type: "pie",
            data: info,
            options: pieOptions,
          });
          break;
        default:
          newChart = new Chart(context, {
            type: "bar",
            data: info,
            options: options,
          });
          break;
      }

      chartRef.current.chart = newChart;
    }
  }, [chartData, type]);

  return <canvas ref={chartRef} />;
};
