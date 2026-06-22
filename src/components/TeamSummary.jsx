function TeamSummary({
	totalPlayers,
	availablePlayers,
	injuredPlayers,
	suspendedPlayers,
	availablePercentage
}) {
	return (
		<section
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
				gap: 12,
				marginBottom: 20
			}}
		>
			<div style={summaryCardStyle}>
				<p style={labelStyle}>Total jugadores</p>
				<strong style={valueStyle}>{totalPlayers}</strong>
			</div>
			<div style={summaryCardStyle}>
				<p style={labelStyle}>Disponibles</p>
				<strong style={valueStyle}>{availablePlayers}</strong>
			</div>
			<div style={summaryCardStyle}>
				<p style={labelStyle}>Lesionados</p>
				<strong style={valueStyle}>{injuredPlayers}</strong>
			</div>
			<div style={summaryCardStyle}>
				<p style={labelStyle}>Suspendidos</p>
				<strong style={valueStyle}>{suspendedPlayers}</strong>
			</div>
			<div style={summaryCardStyle}>
				<p style={labelStyle}>Porcentaje disponibles</p>
				<strong style={valueStyle}>{availablePercentage}%</strong>
			</div>
		</section>
	);
}

const summaryCardStyle = {
	padding: 16,
	borderRadius: 16,
	border: "1px solid #cbd5e1",
	backgroundColor: "#f8fafc",
	textAlign: "left"
};

const labelStyle = {
	margin: 0,
	fontSize: 14,
	color: "#475569"
};

const valueStyle = {
	display: "block",
	marginTop: 8,
	fontSize: 28,
	color: "#0f172a"
};

export default TeamSummary;