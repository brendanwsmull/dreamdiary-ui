import { useState, useContext } from "react";
import { UserContext } from "../components/userContext.jsx";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "./createDreams.css";

export function CreateDreams() {
	// const baseURL = 'http://localhost:4000'
	const { user } = useContext(UserContext);
	const [entry, setEntry] = useState("");
	const [sleepAmount, setSleepAmount] = useState(0);
	const navigate = useNavigate();
	const [sleepDate, setSleepDate] = useState(() => {
		return dayjs().subtract(1, "day").format("YYYY-MM-DD");
	});

	const addDream = async () => {
		const nightId = Date.now(); // just for now, will collide if 2 people make entry at exact same millisecond
		const data = {
			userID: user,
			nightId: nightId,
			dreamEntry: entry,
			sleepAmount: sleepAmount,
			date: sleepDate,
		};
		const response = await fetch(`/api/${user}/${nightId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			console.log("dream entry added");
			navigate("/dreams");
		} else {
			alert("something went wrong when making your dream");
		}
	};

	return (
		<div className="left-padding">
			<h1>Create a new Dream Entry</h1>
			<textarea
				className="textarea-style"
				placeholder="Type your dream entry here..."
				value={entry}
				onChange={(e) => setEntry(e.target.value)}
			/>
			<div className="dream-container">
				<p style={{ fontSize: "1.2rem" }}>
					How long did you sleep for?
				</p>
				<input
					id="sleepInput"
					type="number"
					className="sleep-input"
					min="0"
					value={sleepAmount}
					onChange={(e) => setSleepAmount(Number(e.target.value))}
				/>
			</div>
			<div className="dream-container">
				<p style={{ fontSize: "1.2rem" }}>When was this dream?</p>
				<input
					type="date"
					className="date-input"
					value={sleepDate}
					onChange={(e) => setSleepDate(e.target.value)}
				/>
			</div>
			<button className="create-dream-bttn" onClick={addDream}>
				Create Dream
			</button>
		</div>
	);
}

export default CreateDreams;
