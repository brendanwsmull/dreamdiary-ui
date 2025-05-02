import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	// default user set to 1 just for example since user profiles have not been created yet
	//Changed the user id to match an already existing user on my end. Change it back to 1 if you want.
	const [user, setUser] = useState("67db0c697d078d65a68ee6ac");

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
