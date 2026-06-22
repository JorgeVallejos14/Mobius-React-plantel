const statusColors = {
	disponible: "#16a34a",
	lesionado: "#dc2626",
	suspendido: "#eab308"
};

function PlayerCard({ name, position, number, status }) {
	const backgroundColor = statusColors[status] ?? "#64748b";

	return (
		<article
			style={{
				border: `2px solid ${backgroundColor}`,
				borderRadius: 16,
				padding: 20,
				backgroundColor: `${backgroundColor}14`,
				textAlign: "left"
			}}
		>
			<h2 style={{ marginBottom: 12 }}>{name}</h2>
			<p>Posición: {position}</p>
			<p>Número: {number}</p>
		</article>
	);
}

export default PlayerCard;
