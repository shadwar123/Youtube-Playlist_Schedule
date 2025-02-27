import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar() {
  return (
    <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/128401275?s=200&v=4"/>
      <AvatarFallback>CS</AvatarFallback>
    </Avatar>
  );
}