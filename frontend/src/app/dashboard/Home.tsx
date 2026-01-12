"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddEvent } from "./AddEvent";

interface VideoData {
  title: string;
  views: number;
  thumbnail: string;
  vidLength: string;
}

export default function Home() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [totalLengthPlaylist, setTotalLengthPlaylist] = useState("");
  const [arrayData, setArrayData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [experienceLevel, setExperienceLevel] = useState<
    "Beginner" | "Intermediate"
  >("Beginner");
  const [dailyLearningHours, setDailyLearningHours] = useState<number>(2);
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    console.log("Generated content:", arrayData);
  }, [arrayData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/scrape-playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistUrl }),
      });

      if (!response.ok) throw new Error("Playlist fetch failed");

      const data = await response.json();
      setVideoData(data.videoList);
      setTotalLengthPlaylist(data.totalLengthPlaylist);

      setTimeout(() => {
        run(data.videoList);
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const run = async (videoData: VideoData[]) => {
    setLoading(true);

    try {
      const prompt = `I have a YouTube playlist with multiple video titles and their durations.
My experience level is ${experienceLevel}, and I plan to learn for ${dailyLearningHours} hours each day.

Analyze the difficulty of each video based on its title (easy or hard).

Playlist data:
${JSON.stringify(
  videoData.map((v) => ({
    title: v.title,
    vidLength: v.vidLength,
  })),
  null,
  2
)}

Output ONLY:
Day 1: [Video Title] — [Duration]
Day 2: [Video Title] — [Duration]`;

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok || typeof data.text !== "string") {
        console.error("Gemini error:", data);
        setLoading(false);
        return;
      }
      console.log("data", data);
      // const extractedData = data.text
      //   .split("\n")
      //   .map((line: string) => line.trim())
      //   .filter((line: string) => line.startsWith("Day"));

      // Split the text into "Day n:" blocks
      const dayBlocks = data.text.split(/\n(?=Day \d+:)/);
      // \n(?=Day \d+:) => split at newline that is followed by "Day n:"

      const extractedData = dayBlocks.map((block:any) => block.trim()); // remove extra spaces

      console.log("extracted data", extractedData);
      console.log("extracted data", extractedData);
      setArrayData(extractedData);
    } catch (error) {
      console.error("Gemini error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>YouTube Playlist Task Planner</CardTitle>
          <CardDescription>
            Enter a YouTube playlist URL to analyze its videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            <Input
              type="url"
              placeholder="Enter YouTube playlist URL"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              required
              // className="w-full mb-4" // Full width input with bottom margin
            />

            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <select
                  value={experienceLevel}
                  onChange={(e) =>
                    setExperienceLevel(
                      e.target.value as "Beginner" | "Intermediate"
                    )
                  }
                  className="border p-2 rounded"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                </select>
                <select
                  value={dailyLearningHours}
                  onChange={(e) =>
                    setDailyLearningHours(Number(e.target.value))
                  }
                  className="border p-2 rounded"
                >
                  <option value={1}>20% Efficiency</option>
                  <option value={2}>40% Efficiency</option>
                  <option value={3}>60% Efficiency</option>
                  <option value={4}>80% Efficiency</option>
                  <option value={5}>100% Efficiency</option>
                </select>
                {/* Time Selector */}
                <div className="border px-1 py-2 rounded">
                  <label className="mr-1 font-normal">Start Time:</label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="border p-0 rounded"
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Analyzing..." : "Analyze Playlist"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {videoData.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Playlist Length: {totalLengthPlaylist}</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-4">
                {videoData.map((video, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <span className="font-bold text-lg min-w-[24px]">
                      {index + 1}.
                    </span>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-24 h-auto"
                    />
                    <div>
                      <h3 className="font-semibold">{video.title}</h3>
                      <p className="text-sm text-gray-600">
                        {formatViews(video.views)} views
                      </p>
                      <p>{video.vidLength}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <AddEvent
                eventListData={arrayData}
                playlistUrl={playlistUrl}
                selectedTime={selectedTime}
              />
              <div>
                {loading ? ( // Show loading state while data is being fetched/processed
                  <p>Loading...</p>
                ) : arrayData.length > 0 ? (
                  <div style={{ width: "100%", height: 400 }}>
                    {arrayData.map((line, index) => (
                      <p key={index} style={{ margin: "0.5em 0" }}>
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p>No data found</p> // Handle case when no data is found
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
