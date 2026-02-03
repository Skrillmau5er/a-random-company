"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [revenue, setRevenue] = useState([75]);
  const [users, setUsers] = useState([60]);
  const [performance, setPerformance] = useState([85]);
  const [refreshCount, setRefreshCount] = useState(0);

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
    // Simulate data refresh
    setRevenue([Math.floor(Math.random() * 100)]);
    setUsers([Math.floor(Math.random() * 100)]);
    setPerformance([Math.floor(Math.random() * 100)]);
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your key metrics and performance
            </p>
          </div>
          <Button onClick={handleRefresh}>
            Refresh Data
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <Badge variant="secondary">$</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(revenue[0] * 1234).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{revenue[0]}% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Badge variant="secondary">👥</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{(users[0] * 45).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{users[0]}% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Performance
              </CardTitle>
              <Badge variant="secondary">⚡</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performance[0]}%</div>
              <p className="text-xs text-muted-foreground">
                System health optimal
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Data Refreshes
              </CardTitle>
              <Badge variant="secondary">🔄</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{refreshCount}</div>
              <p className="text-xs text-muted-foreground">
                Total refresh count
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Metric Controls</CardTitle>
            <CardDescription>Adjust the values to see real-time updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Revenue Growth</label>
                <span className="text-sm text-muted-foreground">{revenue[0]}%</span>
              </div>
              <Slider
                value={revenue}
                onValueChange={setRevenue}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">User Growth</label>
                <span className="text-sm text-muted-foreground">{users[0]}%</span>
              </div>
              <Slider
                value={users}
                onValueChange={setUsers}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Performance Score</label>
                <span className="text-sm text-muted-foreground">{performance[0]}%</span>
              </div>
              <Slider
                value={performance}
                onValueChange={setPerformance}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {[
                    { time: "2 min ago", message: "New user registered", type: "success" },
                    { time: "15 min ago", message: "Payment processed successfully", type: "success" },
                    { time: "1 hour ago", message: "System backup completed", type: "info" },
                    { time: "3 hours ago", message: "New feature deployed", type: "info" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant={activity.type === "success" ? "default" : "secondary"}>
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="sales" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {[
                    { time: "15 min ago", message: "Payment processed successfully", amount: "$299" },
                    { time: "2 hours ago", message: "New subscription activated", amount: "$49" },
                    { time: "5 hours ago", message: "Invoice #1234 paid", amount: "$1,299" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant="default">{activity.amount}</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="system" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {[
                    { time: "1 hour ago", message: "System backup completed", status: "Complete" },
                    { time: "3 hours ago", message: "New feature deployed", status: "Live" },
                    { time: "6 hours ago", message: "Database optimization finished", status: "Complete" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant="secondary">{activity.status}</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
