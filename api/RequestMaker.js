import { axiosInstance } from "../lib/axios";

export const fetchAllVehicles = async () => {
	const query = `
    query {
      allVehicles {
        id
        brand
        model
        year
        mileage
        price
        imageUrl
      }
    }
  `;

	try {
		const response = await axiosInstance.post("", { query });
		console.log(response.data.data.allVehicles);
		return response.data.data.allVehicles;
	} catch (error) {
		console.error("Failed to fetch vehicles:", error);
		return [];
	}
};

export const fetchVehicleById = async (id) => {
	const query = `
    query ($id: ID!) {
      vehicleById(id: $id) {
        id 
        brand 
        model 
        year 
        mileage 
        isElectric 
        service 
        parts 
        insurance 
        safety 
        fuelTankCapacity 
        batteryCapacity 
        price 
        imageUrl  
      }
    }
  `;

	const variables = { id };

	try {
		const response = await axiosInstance.post("", {
			query,
			variables,
		});

		console.log(response.data.data.vehicleById);

		return response.data.data.vehicleById;
	} catch (error) {
		console.error("Failed to fetch vehicle by ID:", error);
		return null;
	}
};

export const fetchUserVehicleCount = async (userId) => {
	const query = `
		query ($userId: ID!) {
			userVehicleCount(userId: $userId)
		}
	`;

	const variables = { userId };

	try {
		const response = await axiosInstance.post("", {
			query,
			variables,
		});

		const count = response.data?.data?.userVehicleCount;

		console.log("count is: ", count);
		return count ?? 0;
	} catch (error) {
		console.error("Failed to fetch user vehicle count:", error);
		return 0;
	}
};

export const addUserVehicle = async (userId, vehicleId) => {
	const mutation = `
    mutation addUserVehicle($userId: ID!, $vehicleId: ID!) {
      addUserVehicle(userId: $userId, vehicleId: $vehicleId)
    }
  `;

	const variables = { userId, vehicleId };

	console.log("Mutation Query:", mutation);
	console.log("Variables:", variables);

	try {
		const response = await axiosInstance.post("", {
			query: mutation,
			variables,
		});

		console.log("Vehicle added to user:", response.data.data.addUserVehicle);
		return response.data.data.addUserVehicle;
	} catch (error) {
		console.error("Failed to add vehicle to user:", error);
		return false;
	}
};

export const fetchUserVehicles = async (userId) => {
	const query = `
	query UserVehicles($userId: ID!) {
  		userVehicles(userId: $userId) {
    		vehicle {
      			id
    		}
  		}
	}
  `;

	const variables = { userId };

	try {
		const response = await axiosInstance.post("", {
			query,
			variables,
		});

		console.log("User vehicles:", response.data.data.userVehicles);
		return response.data.data.userVehicles;
	} catch (error) {
		console.error("Failed to fetch user vehicles:", error);
		return [];
	}
};

export const removeUserVehicle = async (userId, vehicleId) => {
	const mutation = `
    mutation removeUserVehicle($userId: ID!, $vehicleId: ID!) {
      removeUserVehicle(userId: $userId, vehicleId: $vehicleId)
    }
  `;

	const variables = { userId, vehicleId };

	console.log("Remove Mutation:", mutation);
	console.log("Variables:", variables);

	try {
		const response = await axiosInstance.post("", {
			query: mutation,
			variables,
		});

		console.log(
			"Vehicle removed from user:",
			response.data.data.removeUserVehicle
		);
		return response.data.data.removeUserVehicle;
	} catch (error) {
		console.error("Failed to remove vehicle from user:", error);
		return false;
	}
};

export const fetchUserVehicleDetails = async (userId) => {
	const query = `
		query UserVehicles($userId: ID!) {
			userVehicles(userId: $userId) {
				vehicle {
					id
					imageUrl
					model
					year
					mileage
					brand
				}
			}
		}
	`;

	const variables = { userId };

	try {
		const response = await axiosInstance.post("", {
			query,
			variables,
		});

		const vehicles = response.data?.data?.userVehicles || [];
		console.log("Detailed user vehicles:", vehicles);
		return vehicles;
	} catch (error) {
		console.error("Failed to fetch detailed user vehicles:", error);
		return [];
	}
};

export const fetchUserVehiclePrices = async (userId) => {
	const query = `
    query UserVehicles($userId: ID!) {
      userVehicles(userId: $userId) {
        vehicle {
          price
        }
      }
    }
  `;

	const variables = { userId };

	try {
		const response = await axiosInstance.post("", {
			query,
			variables,
		});

		const vehicles = response.data?.data?.userVehicles || [];
		console.log("User vehicle prices:", vehicles);
		return vehicles;
	} catch (error) {
		console.error("Failed to fetch user vehicle prices:", error);
		return [];
	}
};

export const fetchUserElectricCount = async (userId) => {
	const query = `
		query UserVehicles($userId: ID!) {
			userVehicles(userId: $userId) {
				vehicle {
					isElectric
				}
			}
		}
	`;

	const variables = { userId };

	try {
		const response = await axiosInstance.post("", {
			query,
			variables,
		});

		const userVehicles = response.data?.data?.userVehicles || [];
		const electricCount = userVehicles.filter(
			(v) => v.vehicle.isElectric
		).length;

		console.log("Electric Vehicle Count:", electricCount);
		return electricCount;
	} catch (error) {
		console.error("Failed to fetch electric vehicle count:", error);
		return 0;
	}
};

export const fetchUserVehicleDetailsWithSpecs = async (userId) => {
	const query = `
    query UserVehicles($userId: ID!) {
      userVehicles(userId: $userId) {
        vehicle {
		  model
		  brand		
          insurance
          parts
          price
          safety
        }
      }
    }
  `;

	const variables = { userId };

	try {
		const response = await axiosInstance.post("", {
			query,
			variables,
		});

		const vehicles = response.data?.data?.userVehicles || [];
		console.log("User vehicles with specs:", vehicles);
		return vehicles;
	} catch (error) {
		console.error("Failed to fetch user vehicles with specs:", error);
		return [];
	}
};
