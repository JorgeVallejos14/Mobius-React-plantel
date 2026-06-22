import { useState } from "react";
import { players } from "./data/players";
import PlayerCard from "./components/PlayerCard";

function App() {
	const [playerStatuses, setPlayerStatuses] = useState({
		1: "Disponible",
		2: "Disponible",
		3: "Disponible",
		4: "Disponible",
		5: "Disponible"
	});

	const handleStatusChange = (id) => {
		setPlayerStatuses((currentStatuses) => {
			const currentStatus = currentStatuses[id] ?? "Disponible";
			const nextStatusMap = {
				Disponible: "Lesionado",
				Lesionado: "Suspendido",
				Suspendido: "Disponible"
			};

			return {
				...currentStatuses,
				[id]: nextStatusMap[currentStatus] ?? "Disponible"
			};
		});
	};

	return (
		<main style={{ padding: 24 }}>
			<h1>Mobius FC</h1>
			<section
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
					gap: 16
				}}
			>
				{players.map((player) => (
					<PlayerCard
						key={player.id}
						{...player}
						status={playerStatuses[player.id] ?? "Disponible"}
						onClick={() => handleStatusChange(player.id)}
					/>
				))}
			</section>
		</main>
	);
}

export default App;
