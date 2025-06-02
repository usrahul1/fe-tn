"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "react-hot-toast";
import VehicleCard from "./vehicle-card";
import { useFirebase } from "@/context/Firebase";

export default function ProfilePage({
	profile,
	userVehicles,
	userVehiclesCount,
	name,
	profilePic,
	phone,
	gender,
}) {
	const firebase = useFirebase();
	const [nameUser, setName] = useState(name);

	const [selectedFile, setSelectedFile] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [wantToUpload, setWantToUpload] = useState(false);
	const [phoneNumber, setPhone] = useState(phone);
	const [genderUser, setGender] = useState(gender);

	const handleSaveName = async () => {
		try {
			await firebase.updateUserName(name);
			toast.success("Name updated successfully!");
		} catch (err) {
			console.log(err);
			toast.error("Failed to update name.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!profile) {
			toast.error("User not logged in");
			return;
		}
		if (!name || !gender || !phone) {
			toast.error("All details required!");
		}
		try {
			await handleSaveName();
			await firebase.createOrUpdateUserDetails(genderUser, phoneNumber);
			toast.success("Details saved!");
		} catch (error) {
			toast.error("Failed to save details");
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) setSelectedFile(file);
	};

	const handleProfilePicUpload = async (e) => {
		e.preventDefault();
		if (!selectedFile) {
			toast.error("Please select a file first.");
			return;
		}

		setIsUploading(true);
		const success = await firebase.profilePicUpload(selectedFile);
		setIsUploading(false);

		if (success) {
			toast.success("Profile picture updated successfully!");
			setSelectedFile(null);
			setTimeout(() => {
				window.location.reload();
			}, 1500);
		} else {
			toast.error("Oops!");
		}
	};

	return (
		<div className="container mx-auto p-4 space-y-6">
			<div className="flex flex-col md:flex-row gap-6 items-start">
				<div className="card w-full md:w-1/3 flex flex-col items-center p-6 rounded-xl shadow-lg bg-base-200 text-base-content border-5 border-white">
					<Avatar className="card-title w-32 h-32 border-4 border-primary">
						<AvatarImage src={profilePic} alt="User" />
						<AvatarFallback>User</AvatarFallback>
					</Avatar>
					<h2 className="mt-4 text-2xl font-bold">
						{profile?.name || "Loading..."}
					</h2>
					<p>{profile?.email || "Loading..."}</p>
					<div className="mt-6 w-full flex flex-col gap-2">
						<div className="flex justify-between mb-2">
							<span>Member since</span>
							<span>{profile?.createdAt || "Loading..."}</span>
						</div>
						<div className="flex justify-between mb-2">
							<span>Vehicles</span>
							<span>{userVehiclesCount}</span>
						</div>
						<div className="flex justify-between mb-2">
							<span>Last login</span>
							<span>{profile?.lastLoggedIn || "Loading..."}</span>
						</div>

						{wantToUpload && (
							<div className="flex flex-col gap-2 lg:flex-row justify-between mb-2">
								<input
									type="file"
									accept="image/png, image/jpeg"
									onChange={handleFileChange}
									className="md:w-auto text-sm 
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0
                 file:text-sm file:font-semibold
                 file:bg-primary 
                 hover:file:bg-primary-dark
                 cursor-pointer"
								/>
								<button
									onClick={handleProfilePicUpload}
									className="btn btn-primary rounded w-full md:w-auto"
									disabled={isUploading}
								>
									{isUploading ? "Uploading..." : "Upload"}
								</button>
							</div>
						)}

						{!wantToUpload && (
							<Button
								onClick={() => setWantToUpload(!wantToUpload)}
								className="w-full md:w-auto btn btn-primary"
							>
								Edit your profile picture
							</Button>
						)}
					</div>
				</div>

				<div className="w-full md:w-2/3">
					<Tabs defaultValue="profile" className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-6 bg-base-200 text-base-content rounded-xl shadow">
							<TabsTrigger
								value="profile"
								className="py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-content rounded-l-xl"
							>
								Profile
							</TabsTrigger>
							<TabsTrigger
								value="vehicles"
								className="py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-content rounded-r-xl"
							>
								My Vehicles
							</TabsTrigger>
						</TabsList>

						<TabsContent value="profile" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Personal Information</CardTitle>
									<CardDescription>
										Update your personal details here.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="name">Full Name</Label>
											<Input
												id="name"
												name="name"
												value={nameUser}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												name="email"
												type="email"
												value={profile?.email || "Loading..."}
												readOnly
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="phone">Phone Number</Label>
											<Input
												id="phone"
												name="phone"
												value={phoneNumber}
												onChange={(e) => setPhone(e.target.value)}
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="gender">Gender</Label>
											<select
												id="gender"
												name="gender"
												value={genderUser}
												onChange={(e) => setGender(e.target.value)}
												className="w-full rounded border px-3 py-2"
											>
												<option value="">Select Gender</option>
												<option value="Male">Male</option>
												<option value="Female">Female</option>
												<option value="Other">Other</option>
											</select>
										</div>
									</div>
									<Button
										onClick={handleSubmit}
										className="w-full md:w-auto btn btn-primary"
									>
										Save Changes
									</Button>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="vehicles" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>My Vehicles</CardTitle>
									<CardDescription>
										Manage your registered vehicles.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{userVehicles.map(({ vehicle }) => (
											<VehicleCard
												key={vehicle.id}
												vehicle={vehicle}
												showDetails={true}
												isOwner={true}
											/>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
