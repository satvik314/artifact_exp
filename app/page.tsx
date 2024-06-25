"use client";
import ProjectileMotion from "@/components/projects/project-tile-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="p-4">
      <Tabs defaultValue="project-tile-motion" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="project-tile-motion">
            Project Tile Motion
          </TabsTrigger>
          <TabsTrigger value="UpComing">Up Coming</TabsTrigger>
        </TabsList>
        <TabsContent value="project-tile-motion">
          <ProjectileMotion />
        </TabsContent>
        <TabsContent value="UpComing">Up Coming Projects...</TabsContent>
      </Tabs>
    </div>
  );
}
