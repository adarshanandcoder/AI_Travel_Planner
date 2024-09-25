import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Login Successful:", codeResp);
      getUserProile(codeResp);
    },
    onError: (error) => console.log("Login Error:", error),
  });

  // Fetch User Profile
  const getUserProile = (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error("Invalid Token Info");
      return;
    }

    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log("User Profile Response:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false); // Close dialog after login
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="p-1 shadow-md flex justify-between items-center mx-2">
      <img className="w-16 h-25" src="/aa_logo.png" />
      <div className="">{user ?
       <div className="flex items-center gap-3" >
        <a href="/create-trip">
        <Button variant="outline" className='rounded-full'>Create Trip</Button>
        </a>
        <a href="/my-trips">
        <Button variant="outline" className='rounded-full'>My Trips</Button>
        </a>
        <Popover>
          <PopoverTrigger>
            <img src={user?.picture}  className="w-[35px] h-[35px] rounded-full" />
          </PopoverTrigger>
          <PopoverContent>
            <h2
            className="cursor-pointer"
            onClick={() =>{
              googleLogout();
              localStorage.clear();
              window.location.reload();
            }}
            >Logout</h2>
          </PopoverContent>
        </Popover>
       </div> : <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>}</div>
       <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className="w-16 h-25" src="/aa_logo.png" alt="Logo" />
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign in to the app with Google OAuth securely.</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="w-6 h-6" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
