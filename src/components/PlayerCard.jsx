const statusColors = {
	disponible: "#16a34a",
	lesionado: "#dc2626",
	suspendido: "#eab308"
};

function PlayerCard({ name, position, number, status, onClick }) {
	const normalizedStatus = status.toLowerCase();
	const backgroundColor = statusColors[normalizedStatus] ?? "#64748b";

	return (
		<article
			onClick={onClick}
			role="button"
			tabIndex={0}
			style={{
				border: `2px solid ${backgroundColor}`,
				borderRadius: 16,
				padding: 20,
				backgroundColor: `${backgroundColor}14`,
				textAlign: "left",
				cursor: "pointer"
			}}
		>
			<h2 style={{ marginBottom: 12 }}>{name}</h2>
			<p>Posición: {position}</p>
			<p>Número: {number}</p>
			<p>Estado: {status}</p>
		</article>
	);
}

export default PlayerCard;
