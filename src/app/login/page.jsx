import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFirebase } from "@/context/Firebase";
import toast from "react-hot-toast";

export default function LoginPage() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await firebase.signInUser(formData.email, formData.password);
      console.log("success", res);
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      toast.success("Logging in!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [firebase.isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 overflow-hidden">
      {/* Cartoon Car Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Red sports car */}
        <div className="car-animation car-1">
          <svg width="120" height="60" viewBox="0 0 120 60" className="car-svg">
            <path
              d="M10,40 L20,40 L30,20 L90,20 L100,40 L110,40 L110,50 L10,50 Z"
              fill="#e74c3c"
            />
            <circle cx="30" cy="50" r="10" fill="#333" />
            <circle cx="30" cy="50" r="5" fill="#666" />
            <circle cx="90" cy="50" r="10" fill="#333" />
            <circle cx="90" cy="50" r="5" fill="#666" />
            <path d="M40,20 L45,5 L75,5 L80,20" fill="#e74c3c" />
            <rect x="45" y="10" width="30" height="10" fill="#ecf0f1" />
            <rect x="85" y="25" width="10" height="5" fill="#ecf0f1" />
            <rect x="25" y="25" width="10" height="5" fill="#ecf0f1" />
            <circle cx="95" cy="25" r="3" fill="#f1c40f" />
            <circle cx="25" cy="25" r="3" fill="#f1c40f" />
          </svg>
        </div>

        {/* Blue SUV */}
        <div className="car-animation car-2">
          <svg width="140" height="70" viewBox="0 0 140 70" className="car-svg">
            <path
              d="M10,45 L20,45 L30,15 L110,15 L120,45 L130,45 L130,55 L10,55 Z"
              fill="#3498db"
            />
            <circle cx="35" cy="55" r="12" fill="#333" />
            <circle cx="35" cy="55" r="6" fill="#666" />
            <circle cx="105" cy="55" r="12" fill="#333" />
            <circle cx="105" cy="55" r="6" fill="#666" />
            <path d="M30,15 L40,5 L100,5 L110,15" fill="#3498db" />
            <rect x="40" y="7" width="60" height="15" fill="#ecf0f1" />
            <rect x="105" y="25" width="12" height="6" fill="#ecf0f1" />
            <rect x="23" y="25" width="12" height="6" fill="#ecf0f1" />
            <circle cx="115" cy="25" r="4" fill="#f1c40f" />
            <circle cx="25" cy="25" r="4" fill="#f1c40f" />
          </svg>
        </div>

        {/* Green compact car */}
        <div className="car-animation car-3">
          <svg width="100" height="50" viewBox="0 0 100 50" className="car-svg">
            <path
              d="M10,35 L15,35 L25,15 L75,15 L85,35 L90,35 L90,45 L10,45 Z"
              fill="#2ecc71"
            />
            <circle cx="25" cy="45" r="8" fill="#333" />
            <circle cx="25" cy="45" r="4" fill="#666" />
            <circle cx="75" cy="45" r="8" fill="#333" />
            <circle cx="75" cy="45" r="4" fill="#666" />
            <path d="M25,15 L35,5 L65,5 L75,15" fill="#2ecc71" />
            <rect x="35" y="7" width="30" height="10" fill="#ecf0f1" />
            <rect x="70" y="22" width="8" height="4" fill="#ecf0f1" />
            <rect x="22" y="22" width="8" height="4" fill="#ecf0f1" />
            <circle cx="78" cy="22" r="2" fill="#f1c40f" />
            <circle cx="22" cy="22" r="2" fill="#f1c40f" />
          </svg>
        </div>

        {/* Yellow convertible */}
        <div className="car-animation car-4">
          <svg width="120" height="50" viewBox="0 0 120 50" className="car-svg">
            <path
              d="M10,35 L20,35 L30,25 L90,25 L100,35 L110,35 L110,45 L10,45 Z"
              fill="#f1c40f"
            />
            <circle cx="30" cy="45" r="10" fill="#333" />
            <circle cx="30" cy="45" r="5" fill="#666" />
            <circle cx="90" cy="45" r="10" fill="#333" />
            <circle cx="90" cy="45" r="5" fill="#666" />
            <path d="M30,25 L40,15 L80,15 L90,25" fill="#f1c40f" />
            <line
              x1="40"
              y1="15"
              x2="80"
              y2="15"
              stroke="#e74c3c"
              strokeWidth="2"
            />
            <rect x="85" y="30" width="10" height="5" fill="#ecf0f1" />
            <rect x="25" y="30" width="10" height="5" fill="#ecf0f1" />
            <circle cx="95" cy="30" r="3" fill="#f1c40f" />
            <circle cx="25" cy="30" r="3" fill="#f1c40f" />
            <circle cx="50" cy="20" r="3" fill="#333" />
            <circle cx="70" cy="20" r="3" fill="#333" />
          </svg>
        </div>

        {/* Purple electric car */}
        <div className="car-animation car-5">
          <svg width="130" height="60" viewBox="0 0 130 60" className="car-svg">
            <path
              d="M10,40 L25,40 L35,15 L95,15 L105,40 L120,40 L120,50 L10,50 Z"
              fill="#9b59b6"
            />
            <circle cx="35" cy="50" r="10" fill="#333" />
            <circle cx="35" cy="50" r="5" fill="#666" />
            <circle cx="95" cy="50" r="10" fill="#333" />
            <circle cx="95" cy="50" r="5" fill="#666" />
            <path d="M35,15 L45,5 L85,5 L95,15" fill="#9b59b6" />
            <rect x="45" y="7" width="40" height="12" fill="#ecf0f1" />
            <rect x="90" y="25" width="10" height="5" fill="#ecf0f1" />
            <rect x="30" y="25" width="10" height="5" fill="#ecf0f1" />
            <circle cx="100" cy="25" r="3" fill="#3498db" />
            <circle cx="30" cy="25" r="3" fill="#3498db" />
            <rect x="60" y="40" width="10" height="5" fill="#3498db" />
          </svg>
        </div>
      </div>

      <Card className="w-full max-w-md border-none bg-white/10 backdrop-blur-md shadow-2xl relative z-10">
        <CardHeader className="space-y-1">
          <div className="w-16 h-16 mx-auto mb-2">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path
                fill="#f1c40f"
                d="M12,4C7.58,4 4,7.58 4,12C4,16.42 7.58,20 12,20C16.42,20 20,16.42 20,12C20,7.58 16.42,4 12,4M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2"
              />
              <path
                fill="#f1c40f"
                d="M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Vehicle Maintenance Dashboard
          </CardTitle>
          <CardDescription className="text-center text-slate-300">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="bg-white/20 border-white/30 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-900/50 backdrop-blur-sm px-2 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            <Button
              variant="outline"
              className="m-auto pl-8 pr-8 border-white/30 text-white hover:bg-white/10"
              onClick={firebase.googleSignIn}
            >
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-slate-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-400 hover:text-yellow-300"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>

      <style jsx global>{`
        .car-animation {
          position: absolute;
          animation-duration: 15s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        .car-svg {
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
        }

        .car-1 {
          bottom: 15%;
          animation-name: carRight;
          animation-duration: 20s;
        }

        .car-2 {
          bottom: 35%;
          animation-name: carLeft;
          animation-duration: 25s;
          animation-delay: 2s;
        }

        .car-3 {
          bottom: 55%;
          animation-name: carRight;
          animation-duration: 18s;
          animation-delay: 5s;
        }

        .car-4 {
          bottom: 75%;
          animation-name: carLeft;
          animation-duration: 22s;
          animation-delay: 3s;
        }

        .car-5 {
          bottom: 85%;
          animation-name: carRight;
          animation-duration: 28s;
          animation-delay: 7s;
        }

        @keyframes carRight {
          0% {
            left: -150px;
            transform: translateY(0);
          }
          25% {
            transform: translateY(15px);
          }
          50% {
            transform: translateY(0);
          }
          75% {
            transform: translateY(-15px);
          }
          100% {
            left: calc(100% + 150px);
            transform: translateY(0);
          }
        }

        @keyframes carLeft {
          0% {
            right: -150px;
            transform: translateY(0) scaleX(-1);
          }
          25% {
            transform: translateY(15px) scaleX(-1);
          }
          50% {
            transform: translateY(0) scaleX(-1);
          }
          75% {
            transform: translateY(-15px) scaleX(-1);
          }
          100% {
            right: calc(100% + 150px);
            transform: translateY(0) scaleX(-1);
          }
        }
      `}</style>
    </div>
  );
}
