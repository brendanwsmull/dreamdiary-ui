import "./viewDreams.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../components/userContext.jsx";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import Sentiment from 'sentiment';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	BarChart,
	Bar,
	Cell,
} from "recharts";

export function ViewDreams() {
	// const baseURL = 'http://localhost:4000';
	const { user } = useContext(UserContext);
	const [dreams, setDreams] = useState([]);
	const [showStats, setShowStats] = useState(false);
	const [totalDreams, setTotalDreams] = useState("");
	const [avgSleep, setAvgSleep] = useState("");
	const sentiment = new Sentiment();
	// get count of positive and nagative dream counts
	const positiveCount = dreams.filter(dream => dream.sentimentMood === "positive").length;
	const negativeCount = dreams.filter(dream => dream.sentimentMood === "negative").length;

	const getDreams = async () => {
		const response = await fetch(`/api/${user}`);
		if (!response.ok) {
			alert("something went wrong when getting your dream entries!");
			return;
		}
		const data = await response.json();

		// sorting the list in descending order
		const list = data.listOfDreams.sort(
			(a, b) => new Date(b.date) - new Date(a.date),
		).map((dream) => {
			// Sentiment analysis done by https://www.npmjs.com/package/sentiment
			const result = sentiment.analyze(dream.dreamEntry || "");
			// default is neutral
			let sentimentMood = "neutral";
			if (result.score > 1) sentimentMood = "positive";
			else if (result.score < -1) sentimentMood = "negative";
			return {
				...dream,
				sentimentMood,
			};
		});

		// collecting stats about dream health
		const total = list.length;
		const sleep = list.reduce((sum, d) => sum + d.sleepAmount, 0);
		const avg = total > 0 ? (sleep / total) : 0;
		setTotalDreams(total);
		setAvgSleep(avg);

		setDreams(list);
		console.log(data.listOfDreams);
	};

	const deleteDream = async (nightID) => {
		console.log(nightID);
		const response = await fetch(`/api/${user}/${nightID}`, {
			method: "DELETE",
		});
		if (response.ok) {
			setDreams((prevDreams) =>
				prevDreams.filter((dream) => dream._id !== nightID),
			);
			console.log("deleted dream entry:" + nightID);
		} else {
			alert("something went wrong when deleting your dream entry!");
		}
	};

	useEffect(() => {
		//setDreams(sampleDreams); // this is for setting dreams to example list, comment out when testing api
		getDreams(); // uncomment this when trying to get dream entries from the api
	}, []);

	// get list of properly formatted list of date and dreams in left to right format
	const chartData = [...dreams].reverse().map((dream) => ({
		date: new Date(dream.date).toLocaleDateString(),
		sleep: dream.sleepAmount,
	}));

	// get positive and negative dream counts
	const sentimentBarData = [
		{
			mood: "Positive",
			percentage: dreams.length > 0 ? (positiveCount / dreams.length) * 100 : 0,
		},
		{
			mood: "Negative",
			percentage: dreams.length > 0 ? (negativeCount / dreams.length) * 100 : 0,
		}
	];

	return (
		<div class="left-padding">
			<h1>Your Dream Notebook</h1>
			{dreams.length === 0 ? (
				<div>
					<p>No Dreams Found</p>
					<p>
						Click "Create Dream" in the top right to log your first
						dream!
					</p>
				</div>
			) : (
				<>
					<button
						className="del-dream-bttn"
						onClick={() => setShowStats(!showStats)}
					>
						{showStats ? "Hide Stats" : "View Stats"}
					</button>
					<br />
					{showStats && (
						<div className="view-dream-container">
							<p>
								<strong>Total Dreams:</strong> {totalDreams}
							</p>
							<p>
								<strong>Average Sleep per Dream:</strong>{" "}
								{avgSleep.toFixed(2)} hours
							</p>
							<p><strong>Sleep Amount Over Time:</strong></p>
							<div style={{ width: "100%", height: 300 }}>
								{/* This chart was made with recharts: https://recharts.org/en-US */}
								<ResponsiveContainer>
									<AreaChart
										data={chartData}
										width="80%"
										length="80%"
									>
										<CartesianGrid strokeDasharray="5 5" />
										<XAxis dataKey="date" />
										<YAxis
											domain={[0, 12]}
											label={{
												value: "Hours",
												angle: -90,
												position: "insideLeft",
											}}
										/>
										<Tooltip />
										<Area
											type="monotone"
											dataKey="sleep"
											stroke="#b020f7"
											fill="#b020f7"
											strokeWidth={2}
											fillOpacity={0.3}
										/>
									</AreaChart>
								</ResponsiveContainer>
							</div>
							<p><strong>Sleep Sentiment Analysis:</strong></p>
							<div style={{ width: "100%", height: 250 }}>
								<ResponsiveContainer>
									<BarChart
										layout="vertical"
										data={sentimentBarData}
										width="80%"
										length="80%"
										margin={{ left: 20 }}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis type="number" domain={[0, 100]} />
										<YAxis type="category" dataKey="mood" />
										<Tooltip
											formatter={(value) => [`${value.toFixed(1)}%`, "Percent of Dreams"]}
										/>
										<Bar dataKey="percentage">
											<Cell fill="#32a840" /> {/* Color for positive bar */}
											<Cell fill="#a83232" /> {/* Color for negative bar */}
										</Bar>
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
					)}

					{dreams.map((dream) => (
						<div
							key={dream.nightId}
							className="view-dream-container"
						>
							<p>
								<strong>Mood:</strong>{" "}
								{dream.sentimentMood === "positive" && "😁"}
								{dream.sentimentMood === "neutral" && "😐"}
								{dream.sentimentMood === "negative" && "😢"}
							</p>
							<p>
								<div className="dream-markdown">
									<strong>Dream:</strong>{" "}
									<ReactMarkdown breaks>
										{dream.dreamEntry}
									</ReactMarkdown>
								</div>
							</p>
							<p>
								<strong>Slept:</strong> {dream.sleepAmount}{" "}
								hours
							</p>
							<p>
								<strong>Date:</strong>{" "}
								{dayjs(dream.date).format("M/D/YYYY")}
							</p>
							<button
								className="del-dream-bttn"
								onClick={() => deleteDream(dream._id)}
							>
								Delete
							</button>
						</div>
					))}
				</>
			)}
		</div>
	);
}

export default ViewDreams;
