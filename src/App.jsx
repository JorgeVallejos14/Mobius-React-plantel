import { useEffect, useState } from "react";
import { players } from "./data/players";
import PlayerCard from "./components/PlayerCard";
import TeamSummary from "./components/TeamSummary";

const defaultPlayerStatuses = {
	1: "Disponible",
	2: "Disponible",
	3: "Disponible",
	4: "Disponible",
	5: "Disponible"
};

function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("todos");
	const [playerStatuses, setPlayerStatuses] = useState(() => {
		const savedStatuses = localStorage.getItem("playerStatuses");

		if (!savedStatuses) {
			return defaultPlayerStatuses;
		}

		try {
			return {
				...defaultPlayerStatuses,
				...JSON.parse(savedStatuses)
			};
		} catch {
			return defaultPlayerStatuses;
		}
	});

	useEffect(() => {
		localStorage.setItem("playerStatuses", JSON.stringify(playerStatuses));
	}, [playerStatuses]);

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

	const visiblePlayers = players.filter((player) => {
		const playerStatus = playerStatuses[player.id] ?? "Disponible";
		const normalizedSearch = searchTerm.trim().toLowerCase();
		const matchesSearch =
			normalizedSearch === "" ||
			player.name.toLowerCase().includes(normalizedSearch) ||
			String(player.number).includes(normalizedSearch);
		const matchesStatus =
			statusFilter === "todos" ||
			playerStatus.toLowerCase() === statusFilter;

		return matchesSearch && matchesStatus;
	});

	const availablePlayers = players.filter(
		(player) => (playerStatuses[player.id] ?? "Disponible") === "Disponible"
	).length;
	const injuredPlayers = players.filter(
		(player) => (playerStatuses[player.id] ?? "Disponible") === "Lesionado"
	).length;
	const suspendedPlayers = players.filter(
		(player) => (playerStatuses[player.id] ?? "Disponible") === "Suspendido"
	).length;
	const availablePercentage = Math.round(
		(players.length > 0 ? (availablePlayers / players.length) * 100 : 0)
	);

	return (
		<main style={{ padding: 24 }}>
			<h1>Mobius FC</h1>
			<TeamSummary
				totalPlayers={players.length}
				availablePlayers={availablePlayers}
				injuredPlayers={injuredPlayers}
				suspendedPlayers={suspendedPlayers}
				availablePercentage={availablePercentage}
			/>
			<section style={{ display: "grid", gap: 12, marginBottom: 20 }}>
				<input
					type="text"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
					placeholder="Buscar por nombre o número"
					style={{
						padding: 12,
						borderRadius: 12,
						border: "1px solid #cbd5e1",
						fontSize: 16
					}}
				/>
				<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
					{[
						{ label: "Todos", value: "todos" },
						{ label: "Disponibles", value: "disponible" },
						{ label: "Lesionados", value: "lesionado" },
						{ label: "Suspendidos", value: "suspendido" }
					].map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => setStatusFilter(option.value)}
							style={{
								padding: "10px 14px",
								borderRadius: 999,
								border:
									statusFilter === option.value
										? "2px solid #111827"
										: "1px solid #cbd5e1",
								backgroundColor:
									statusFilter === option.value ? "#e5e7eb" : "#fff",
								color: "#000",
								cursor: "pointer"
							}}
						>
							{option.label}
						</button>
					))}
				</div>
				<p style={{ margin: 0 }}>Jugadores visibles: {visiblePlayers.length}</p>
			</section>
			<section
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
					gap: 16
				}}
			>
				{visiblePlayers.map((player) => (
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
