import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios"; // Ensure axios is imported
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  // Google OAuth Login
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
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  // Generate Trip
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      console.log("No user found, opening dialog...");
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.people ||
      formData?.noOfDays > 5
    ) {
      toast("Please fill in all the details.");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{people}", formData?.people)
      .replace("{budget}", formData?.budget);

      try {
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log("AI Trip Response:", result?.response?.text());
        setLoading(false);
        SaveTripData(result?.response?.text());
      } catch (error) {
        console.error("Error in generating trip:", error);
        toast("There was an error generating the trip. Please try again.");
        setLoading(false); // Ensure loading stops even if there's an error
      }
      
  };

  const SaveTripData = async (Tripdata) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITravelPlans", docId), {
      userSelection: formData,
      tripData: JSON.parse(Tripdata),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl text-[#FF3333]">
        Let Us Know Your Travel Style and Preferences 🏡🏖️
      </h2>
      <p className="mt-3 text-gray-600 text-xl">
        Share details for a personalized itinerary tailored to your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_LOCAL_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Number of days you are planning for?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
                                    ${
                                      formData?.budget === item.title &&
                                      "shadow-lg border-black"
                                    }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-600">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who will accompany you on your next journey?
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("people", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer 
                                    ${
                                      formData?.people === item.people &&
                                      "shadow-lg border-black"
                                    }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-600">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 justify-end flex mb-20">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin" />
          ) : (
            "Plan a Trip"
          )}
        </Button>
      </div>

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

export default CreateTrip;
