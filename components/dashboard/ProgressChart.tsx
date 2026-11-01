'use client';

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Chart from "chart.js/auto";
import { ChartData } from "@/lib/types";

interface ProgressChartProps {
  weeklyData: ChartData;
  subjectProgress: {
    name: string;
    progress: number;
    color: string;
  }[];
}

export default function ProgressChart({ weeklyData, subjectProgress }: ProgressChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: weeklyData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
              },
              border: {
                display: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                boxWidth: 10,
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [weeklyData]);

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Learning Activity & Hours</h3>
            <p className="text-sm text-gray-500">Track your weekly learning trajectory</p>
          </div>
          <div className="mt-3 sm:mt-0">
            <Select defaultValue="week">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="h-72 w-full">
          <canvas ref={chartRef}></canvas>
        </div>

        {subjectProgress && subjectProgress.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Active Subjects Mastery</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {subjectProgress.slice(0, 4).map((sub, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 truncate">{sub.name}</div>
                  <div className="text-lg font-bold" style={{ color: sub.color || '#4f46e5' }}>
                    {sub.progress}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
