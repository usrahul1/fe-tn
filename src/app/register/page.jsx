import { useState } from "react";
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

export default function RegisterPage() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const user = await firebase.signUpUser(email, password, name);
      console.log("User signed up successfully:", user);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Sign-up error:", error);
      toast.error(error.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 overflow-hidden">
      {/* Cartoon Car Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Truck */}
        <div className="car-animation truck-1">
          <svg width="180" height="80" viewBox="0 0 180 80" className="car-svg">
            <rect x="10" y="40" width="70" height="30" fill="#e74c3c" rx="5" />
            <rect x="80" y="30" width="40" height="40" fill="#e74c3c" rx="5" />
            <rect x="120" y="40" width="50" height="30" fill="#e74c3c" rx="5" />
            <rect x="85" y="35" width="30" height="20" fill="#ecf0f1" rx="3" />
            <circle cx="40" cy="70" r="10" fill="#333" />
            <circle cx="40" cy="70" r="5" fill="#666" />
            <circle cx="100" cy="70" r="10" fill="#333" />
            <circle cx="100" cy="70" r="5" fill="#666" />
            <circle cx="140" cy="70" r="10" fill="#333" />
            <circle cx="140" cy="70" r="5" fill="#666" />
            <rect x="125" y="45" width="10" height="5" fill="#f1c40f" />
            <rect x="145" y="45" width="10" height="5" fill="#f1c40f" />
          </svg>
        </div>

        {/* Race car */}
        <div className="car-animation race-car">
          <svg width="150" height="60" viewBox="0 0 150 60" className="car-svg">
            <path
              d="M10,40 L30,40 C30,40 40,20 70,20 C100,20 110,40 110,40 L140,40 L140,50 L10,50 Z"
              fill="#3498db"
            />
            <circle cx="40" cy="50" r="10" fill="#333" />
            <circle cx="40" cy="50" r="5" fill="#666" />
            <circle cx="110" cy="50" r="10" fill="#333" />
            <circle cx="110" cy="50" r="5" fill="#666" />
            <path
              d="M70,20 C50,20 40,10 40,10 L100,10 C100,10 90,20 70,20 Z"
              fill="#3498db"
            />
            <rect x="50" y="15" width="40" height="10" fill="#ecf0f1" rx="5" />
            <rect x="115" y="30" width="10" height="5" fill="#f1c40f" />
            <rect x="25" y="30" width="10" height="5" fill="#f1c40f" />
            <path d="M10,40 L30,40 L30,30 L10,30 Z" fill="#e74c3c" />
            <path d="M140,40 L110,40 L110,30 L140,30 Z" fill="#e74c3c" />
          </svg>
        </div>

        {/* Vintage car */}
        <div className="car-animation vintage-car">
          <svg width="160" height="70" viewBox="0 0 160 70" className="car-svg">
            <path
              d="M20,45 L30,45 L40,25 L120,25 L130,45 L140,45 L140,55 L20,55 Z"
              fill="#8e44ad"
            />
            <circle cx="50" cy="55" r="10" fill="#333" />
            <circle cx="50" cy="55" r="5" fill="#666" />
            <circle cx="110" cy="55" r="10" fill="#333" />
            <circle cx="110" cy="55" r="5" fill="#666" />
            <path d="M40,25 L50,10 L110,10 L120,25" fill="#8e44ad" />
            <rect x="55" y="12" width="50" height="15" fill="#ecf0f1" rx="3" />
            <rect x="115" y="30" width="10" height="5" fill="#ecf0f1" />
            <rect x="35" y="30" width="10" height="5" fill="#ecf0f1" />
            <circle cx="125" cy="30" r="3" fill="#f1c40f" />
            <circle cx="35" cy="30" r="3" fill="#f1c40f" />
            <rect x="75" y="45" width="10" height="5" fill="#ecf0f1" />
            <path
              d="M50,10 C50,5 60,5 60,10"
              fill="none"
              stroke="#8e44ad"
              strokeWidth="2"
            />
            <path
              d="M100,10 C100,5 110,5 110,10"
              fill="none"
              stroke="#8e44ad"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Electric car */}
        <div className="car-animation electric-car">
          <svg width="140" height="60" viewBox="0 0 140 60" className="car-svg">
            <path
              d="M10,40 L20,40 L30,20 L110,20 L120,40 L130,40 L130,50 L10,50 Z"
              fill="#2ecc71"
            />
            <circle cx="35" cy="50" r="10" fill="#333" />
            <circle cx="35" cy="50" r="5" fill="#666" />
            <circle cx="105" cy="50" r="10" fill="#333" />
            <circle cx="105" cy="50" r="5" fill="#666" />
            <path d="M30,20 L40,5 L100,5 L110,20" fill="#2ecc71" />
            <rect x="45" y="8" width="50" height="15" fill="#ecf0f1" rx="5" />
            <rect x="105" y="25" width="10" height="5" fill="#ecf0f1" />
            <rect x="25" y="25" width="10" height="5" fill="#ecf0f1" />
            <circle cx="115" cy="25" r="3" fill="#3498db" />
            <circle cx="25" cy="25" r="3" fill="#3498db" />
            <rect x="65" y="40" width="10" height="5" fill="#3498db" />
            <path d="M60,5 L60,0 L80,0 L80,5" fill="#2ecc71" />
          </svg>
        </div>

        {/* Cartoon bus */}
        <div className="car-animation bus">
          <svg width="200" height="90" viewBox="0 0 200 90" className="car-svg">
            <rect x="10" y="30" width="180" height="40" fill="#f39c12" rx="5" />
            <rect x="10" y="20" width="180" height="10" fill="#f39c12" rx="5" />
            <circle cx="40" cy="70" r="10" fill="#333" />
            <circle cx="40" cy="70" r="5" fill="#666" />
            <circle cx="160" cy="70" r="10" fill="#333" />
            <circle cx="160" cy="70" r="5" fill="#666" />
            <rect x="20" y="35" width="15" height="15" fill="#ecf0f1" rx="2" />
            <rect x="45" y="35" width="15" height="15" fill="#ecf0f1" rx="2" />
            <rect x="70" y="35" width="15" height="15" fill="#ecf0f1" rx="2" />
            <rect x="95" y="35" width="15" height="15" fill="#ecf0f1" rx="2" />
            <rect x="120" y="35" width="15" height="15" fill="#ecf0f1" rx="2" />
            <rect x="145" y="35" width="15" height="15" fill="#ecf0f1" rx="2" />
            <rect x="170" y="35" width="15" height="15" fill="#ecf0f1" rx="2" />
            <rect x="175" y="55" width="10" height="5" fill="#f1c40f" />
            <rect x="15" y="55" width="10" height="5" fill="#f1c40f" />
          </svg>
        </div>
      </div>

      <Card className="w-full max-w-md border-none bg-white/10 backdrop-blur-md shadow-2xl relative z-10">
        <CardHeader className="space-y-1">
          <div className="w-16 h-16 mx-auto mb-2">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path
                fill="#f1c40f"
                d="M17,4H7A5,5 0 0,0 2,9V15A5,5 0 0,0 7,20H17A5,5 0 0,0 22,15V9A5,5 0 0,0 17,4M17,18H7A3,3 0 0,1 4,15V9A3,3 0 0,1 7,6H17A3,3 0 0,1 20,9V15A3,3 0 0,1 17,18Z"
              />
              <path
                fill="#f1c40f"
                d="M9,8A2,2 0 0,0 7,10A2,2 0 0,0 9,12A2,2 0 0,0 11,10A2,2 0 0,0 9,8Z"
              />
              <path
                fill="#f1c40f"
                d="M15,8A2,2 0 0,0 13,10A2,2 0 0,0 15,12A2,2 0 0,0 17,10A2,2 0 0,0 15,8Z"
              />
              <path
                fill="#f1c40f"
                d="M12,14C9.67,14 8,15.67 8,18H16C16,15.67 14.33,14 12,14Z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center text-slate-300">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="bg-white/20 border-white/30 text-white placeholder:text-slate-400"
              />
            </div>
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
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="bg-white/20 border-white/30 text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
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

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-slate-300">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:text-yellow-300">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>

      <style jsx global>{`
        .car-animation {
          position: absolute;
          animation-duration: 20s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        .car-svg {
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
        }

        .truck-1 {
          bottom: 10%;
          animation-name: carRight;
          animation-duration: 30s;
        }

        .race-car {
          bottom: 30%;
          animation-name: carLeft;
          animation-duration: 15s;
          animation-delay: 2s;
        }

        .vintage-car {
          bottom: 50%;
          animation-name: carRight;
          animation-duration: 25s;
          animation-delay: 5s;
        }

        .electric-car {
          bottom: 70%;
          animation-name: carLeft;
          animation-duration: 22s;
          animation-delay: 8s;
        }

        .bus {
          bottom: 90%;
          animation-name: carRight;
          animation-duration: 35s;
          animation-delay: 3s;
        }

        @keyframes carRight {
          0% {
            left: -200px;
            transform: translateY(0);
          }
          25% {
            transform: translateY(20px);
          }
          50% {
            transform: translateY(0);
          }
          75% {
            transform: translateY(-20px);
          }
          100% {
            left: calc(100% + 200px);
            transform: translateY(0);
          }
        }

        @keyframes carLeft {
          0% {
            right: -200px;
            transform: translateY(0) scaleX(-1);
          }
          25% {
            transform: translateY(20px) scaleX(-1);
          }
          50% {
            transform: translateY(0) scaleX(-1);
          }
          75% {
            transform: translateY(-20px) scaleX(-1);
          }
          100% {
            right: calc(100% + 200px);
            transform: translateY(0) scaleX(-1);
          }
        }
      `}</style>
    </div>
  );
}
