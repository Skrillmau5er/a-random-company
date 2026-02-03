"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initializePendo } from "@/lib/pendo";

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    initializePendo();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to A Random Company
          </h1>
          <p className="text-xl text-muted-foreground">
            Your premier destination for random things
          </p>
          <div className="flex gap-2 justify-center">
            <Badge>Demo</Badge>
            <Badge variant="secondary">Testing</Badge>
            <Badge variant="outline">Interactive</Badge>
          </div>
        </div>

        {/* Interactive Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Click Counter</CardTitle>
              <CardDescription>Test the interactive button below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{clickCount}</p>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setClickCount(clickCount + 1)}
                  className="flex-1"
                >
                  Increment
                </Button>
                <Button 
                  onClick={() => setClickCount(0)}
                  variant="outline"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Name Greeter</CardTitle>
              <CardDescription>Enter your name to get a personalized greeting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {name && (
                <div className="p-4 rounded-lg bg-accent text-center">
                  <p className="text-lg font-medium">
                    Hello, <span className="text-primary">{name}</span>! 👋
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Learn more about what we do</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="space-y-4 mt-4">
                <h3 className="text-lg font-semibold">About Us</h3>
                <p className="text-muted-foreground">
                  A Random Company is a demo application built to showcase modern web technologies
                  and interactive components. We specialize in creating engaging user experiences
                  with beautiful, functional interfaces.
                </p>
              </TabsContent>
              <TabsContent value="services" className="space-y-4 mt-4">
                <h3 className="text-lg font-semibold">Our Services</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Interactive Component Development</li>
                  <li>Modern UI/UX Design</li>
                  <li>Responsive Web Applications</li>
                  <li>Testing & Demo Environments</li>
                </ul>
              </TabsContent>
              <TabsContent value="contact" className="space-y-4 mt-4">
                <h3 className="text-lg font-semibold">Get in Touch</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: hello@arandomcompany.com</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Address: 123 Demo Street, Test City, TC 12345</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
