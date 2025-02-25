

import { NextRequest, NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";

const REMOVED = process.env.REMOVED;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

interface VideoData {
  title: string;
  views: number;
  thumbnail: string;
  vidLength: string;
}

interface PlaylistData {
  videoList: VideoData[];
  graphData: { name: string; views: number }[];
  totalLengthPlaylist: string;
}

// Helper function to convert ISO 8601 duration (PT4M30S) to "MM:SS"
const parseDuration = (isoDuration: string): string => {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = match?.[1] ? parseInt(match[1]) : 0;
  const minutes = match?.[2] ? parseInt(match[2]) : 0;
  const seconds = match?.[3] ? parseInt(match[3]) : 0;
  return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` : `${minutes}:${String(seconds).padStart(2, "0")}`;
};

// Convert time string to seconds
const timeStringToSeconds = (time: string): number => {
  const parts = time.split(":").map(Number);
  return parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : parts[0] * 60 + parts[1];
};

// Convert total seconds back to "HH:MM:SS"
const secondsToTimeString = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` : `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export async function POST(request: NextRequest) {
  try {
    const { playlistUrl } = await request.json();
    if (!playlistUrl) {
      return NextResponse.json({ error: "Playlist URL is required" }, { status: 400 });
    }

    const playlistId = new URL(playlistUrl).searchParams.get("list");
    if (!playlistId) {
      return NextResponse.json({ error: "Invalid playlist URL" }, { status: 400 });
    }

    // const uuid = uuidv4();
    let nextPageToken = "";
    let videoList: VideoData[] = [];

    // Fetch playlist items in pages (YouTube API limits to 50 results per call)
    do {
      const playlistResponse = await fetch(
        `${BASE_URL}/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${REMOVED}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`
      );
      const playlistData = await playlistResponse.json();

      if (!playlistData.items) {
        return NextResponse.json({ error: "No videos found in the playlist" }, { status: 404 });
      }

      const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(",");

      // Fetch video details (views, duration)
      const videoResponse = await fetch(
        `${BASE_URL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${REMOVED}`
      );
      const videoData = await videoResponse.json();

      const videos = playlistData.items.map((item: any, index: number) => {
        const videoInfo = videoData.items[index];

        return {
          title: item.snippet.title,
          views: videoInfo.statistics.viewCount ? parseInt(videoInfo.statistics.viewCount) : 0,
          thumbnail: item.snippet.thumbnails?.high?.url || "",
          vidLength: parseDuration(videoInfo.contentDetails.duration),
        };
      });

      videoList = [...videoList, ...videos];
      nextPageToken = playlistData.nextPageToken || "";
    } while (nextPageToken);

    // Calculate total playlist length
    const totalLengthInSeconds = videoList.reduce((acc, video) => acc + timeStringToSeconds(video.vidLength), 0);
    const totalLengthPlaylist = secondsToTimeString(totalLengthInSeconds);

    const graphData = videoList.map((video, index) => ({
      name: `Video ${index + 1}`,
      views: video.views,
    }));

    const playlistData: PlaylistData = {
      videoList,
      graphData,
      totalLengthPlaylist,
    };

    return NextResponse.json(playlistData);
  } catch (error) {
    console.error("YouTube API request failed:", error);
    return NextResponse.json({ error: "An error occurred while fetching the playlist data" }, { status: 500 });
  }
}
