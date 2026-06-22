import { players } from "./data/players";
import PlayerCard from "./components/PlayerCard";

function App() {
	console.log(players);

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
					<PlayerCard key={player.id} {...player} />
				))}
			</section>
		</main>
	);
}

export default App;
