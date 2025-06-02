import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";
import { useFirebase } from "@/context/Firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import avatar from "/images/profile-avatar.jpg";

export function UserNav() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [profilePic, setProfilePic] = useState(avatar); // Adjust if avatar is a string path
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const details = firebase.profDetails();
    if (details) {
      setProfile(details);
      if (details.photoURL && details.photoURL !== "") {
        setProfilePic(details.photoURL);
      }
    }
  }, [firebase]);

  const logOutHandler = async () => {
    await firebase.logOut();
    toast.success("Logged Out!");
    navigate("/login"); // Navigate to login or homepage after logout
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="z-10 relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profilePic} alt="User" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        forceMount
        className="w-64 p-0 border-none bg-base-100 shadow-xl rounded-box"
      >
        {/* DaisyUI Card Starts */}
        <div className="card bg-base-100">
          <div className="card-body p-4">
            <DropdownMenuLabel className="font-normal p-0">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {profile?.name || "Loading..."}
                </p>
                <p className="text-xs leading-none opacity-70">
                  {profile?.email || "Loading..."}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="hover:bg-base-200 rounded-md"
                onClick={() => navigate("/dashboard/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-base-200 rounded-md"
                onClick={() => navigate("/dashboard/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="hover:bg-base-200 rounded-md"
              onClick={() => logOutHandler()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </div>
        </div>
        {/* DaisyUI Card Ends */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
