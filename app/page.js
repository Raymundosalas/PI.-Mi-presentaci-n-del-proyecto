
"use client";

import { useState } from "react";

export default function Home() {
  const [section, setSection] = useState("Inicio");

  const [teams, setTeams] = useState([
    { id: 1, name: "Rangers FC", players: 18 },
    { id: 2, name: "Galaxy FC", players: 16 },
    { id: 3, name: "Real Liga", players: 20 },
    { id: 4, name: "Deportivo Alpha", players: 15 },
    { id: 5, name: "Furia Roja", players: 17 },
    { id: 6, name: "FC United", players: 14 },
  ]);

  const [players, setPlayers] = useState([
    { id: 1, name: "Juan Pérez", team: "Rangers FC", number: 10 },
    { id: 2, name: "Carlos López", team: "Galaxy FC", number: 7 },
    { id: 3, name: "Miguel Torres", team: "Real Liga", number: 9 },
    { id: 4, name: "Diego Ramírez", team: "Furia Roja", number: 11 },
  ]);

  const [matches, setMatches] = useState([
    { id: 1, home: "Rangers FC", away: "Galaxy FC", date: "22/11/2026", score: "2 - 1", status: "Finalizado" },
    { id: 2, home: "Real Liga", away: "Furia Roja", date: "23/11/2026", score: "-", status: "Programado" },
    { id: 3, home: "FC United", away: "Deportivo Alpha", date: "24/11/2026", score: "-", status: "Programado" },
  ]);

  const [payments, setPayments] = useState([
    { id: 1, team: "Rangers FC", amount: 1500, status: "Pagado" },
    { id: 2, team: "Galaxy FC", amount: 1500, status: "Pendiente" },
    { id: 3, team: "Real Liga", amount: 1500, status: "Pagado" },
  ]);

  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerTeam, setPlayerTeam] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [paymentTeam, setPaymentTeam] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  const menu = [
    "Inicio",
    "Equipos",
    "Jugadores",
    "Partidos",
    "Resultados",
    "Pagos",
    "Estadísticas",
  ];

  function addTeam() {
    if (!teamName.trim()) return;

    setTeams([
      ...teams,
      { id: Date.now(), name: teamName, players: 0 },
    ]);

    setTeamName("");
  }

  function deleteTeam(id) {
    setTeams(teams.filter((team) => team.id !== id));
  }

  function addPlayer() {
    if (!playerName.trim() || !playerTeam) return;

    setPlayers([
      ...players,
      {
        id: Date.now(),
        name: playerName,
        team: playerTeam,
        number: playerNumber || 0,
      },
    ]);

    setPlayerName("");
    setPlayerNumber("");
    setPlayerTeam("");
  }

  function deletePlayer(id) {
    setPlayers(players.filter((player) => player.id !== id));
  }

  function addMatch() {
    if (!homeTeam || !awayTeam || !matchDate || homeTeam === awayTeam) {
      alert("Completa los datos correctamente.");
      return;
    }

    setMatches([
      ...matches,
      {
        id: Date.now(),
        home: homeTeam,
        away: awayTeam,
        date: matchDate,
        score: "-",
        status: "Programado",
      },
    ]);

    setHomeTeam("");
    setAwayTeam("");
    setMatchDate("");
  }

  function deleteMatch(id) {
    setMatches(matches.filter((match) => match.id !== id));
  }

  function addPayment() {
    if (!paymentTeam || !paymentAmount) return;

    setPayments([
      ...payments,
      {
        id: Date.now(),
        team: paymentTeam,
        amount: Number(paymentAmount),
        status: "Pendiente",
      },
    ]);

    setPaymentTeam("");
    setPaymentAmount("");
  }

  function deletePayment(id) {
    setPayments(payments.filter((payment) => payment.id !== id));
  }

  function renderContent() {
    switch (section) {
      case "Equipos":
        return (
          <>
            <h1>Equipos</h1>
            <p className="subtitle">Administración de equipos participantes</p>

            <div className="form">
              <input
                placeholder="Nombre del equipo"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <button onClick={addTeam}>+ Agregar equipo</button>
            </div>

            <div className="cards">
              {teams.map((team) => (
                <div className="team-card" key={team.id}>
                  <div className="team-icon">⚽</div>
                  <h3>{team.name}</h3>
                  <p>{team.players} jugadores</p>
                  <button className="delete" onClick={() => deleteTeam(team.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </>
        );

      case "Jugadores":
        return (
          <>
            <h1>Jugadores</h1>
            <p className="subtitle">Registro de jugadores de la liga</p>

            <div className="form">
              <input
                placeholder="Nombre del jugador"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />

              <input
                placeholder="Número"
                type="number"
                value={playerNumber}
                onChange={(e) => setPlayerNumber(e.target.value)}
              />

              <select
                value={playerTeam}
                onChange={(e) => setPlayerTeam(e.target.value)}
              >
                <option value="">Seleccionar equipo</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>

              <button onClick={addPlayer}>Registrar jugador</button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Jugador</th>
                    <th>Equipo</th>
                    <th>Número</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr key={player.id}>
                      <td>{player.name}</td>
                      <td>{player.team}</td>
                      <td>{player.number}</td>
                      <td>
                        <button
                          className="delete"
                          onClick={() => deletePlayer(player.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case "Partidos":
        return (
          <>
            <h1>Partidos</h1>
            <p className="subtitle">Programación de encuentros deportivos</p>

            <div className="form">
              <select
                value={homeTeam}
                onChange={(e) => setHomeTeam(e.target.value)}
              >
                <option value="">Equipo local</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>

              <select
                value={awayTeam}
                onChange={(e) => setAwayTeam(e.target.value)}
              >
                <option value="">Equipo visitante</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
              />

              <button onClick={addMatch}>Programar partido</button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Local</th>
                    <th>Visitante</th>
                    <th>Fecha</th>
                    <th>Marcador</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match) => (
                    <tr key={match.id}>
                      <td>{match.home}</td>
                      <td>{match.away}</td>
                      <td>{match.date}</td>
                      <td>{match.score}</td>
                      <td>{match.status}</td>
                      <td>
                        <button
                          className="delete"
                          onClick={() => deleteMatch(match.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case "Resultados":
        return (
          <>
            <h1>Resultados</h1>
            <p className="subtitle">Consulta de encuentros de la liga</p>

            <div className="cards">
              {matches.map((match) => (
                <div className="team-card" key={match.id}>
                  <h3>{match.home}</h3>
                  <h2>{match.score}</h2>
                  <h3>{match.away}</h3>
                  <p>{match.date}</p>
                  <span className="status">{match.status}</span>
                </div>
              ))}
            </div>
          </>
        );

      case "Pagos":
        return (
          <>
            <h1>Pagos</h1>
            <p className="subtitle">Administración de pagos de inscripción</p>

            <div className="form">
              <select
                value={paymentTeam}
                onChange={(e) => setPaymentTeam(e.target.value)}
              >
                <option value="">Seleccionar equipo</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Monto"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />

              <button onClick={addPayment}>Registrar pago</button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Equipo</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.team}</td>
                      <td>${payment.amount.toLocaleString("es-MX")}</td>
                      <td>{payment.status}</td>
                      <td>
                        <button
                          className="delete"
                          onClick={() => deletePayment(payment.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case "Estadísticas":
        return (
          <>
            <h1>Tabla de posiciones</h1>
            <p className="subtitle">Clasificación general de la liga</p>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Posición</th>
                    <th>Equipo</th>
                    <th>Jugadores</th>
                    <th>Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.id}>
                      <td>{index + 1}</td>
                      <td>{team.name}</td>
                      <td>{team.players}</td>
                      <td>{(teams.length - index) * 3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      default:
        return (
          <>
            <h1>Panel principal</h1>
            <p className="subtitle">
              Resumen general de la liga deportiva
            </p>

            <div className="stats">
              <div className="stat blue">
                <h2>{teams.length}</h2>
                <p>Equipos</p>
              </div>

              <div className="stat green">
                <h2>{players.length}</h2>
                <p>Jugadores</p>
              </div>

              <div className="stat purple">
                <h2>{matches.length}</h2>
                <p>Partidos</p>
              </div>

              <div className="stat orange">
                <h2>1</h2>
                <p>Campeonato</p>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="panel">
                <h2>Equipos registrados</h2>

                {teams.slice(0, 5).map((team) => (
                  <div className="list-item" key={team.id}>
                    <span>⚽ {team.name}</span>
                    <span>{team.players} jugadores</span>
                  </div>
                ))}
              </div>

              <div className="panel">
                <h2>Próximos partidos</h2>

                {matches.slice(0, 5).map((match) => (
                  <div className="list-item" key={match.id}>
                    <span>{match.home} vs {match.away}</span>
                    <span>{match.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">⚽</div>
          <span>LigaPro</span>
        </div>

        <p className="menu-title">MENÚ PRINCIPAL</p>

        {menu.map((item) => (
          <button
            key={item}
            className={`menu-item ${section === item ? "active" : ""}`}
            onClick={() => setSection(item)}
          >
            <span>
              {item === "Inicio" && "⌂"}
              {item === "Equipos" && "⚽"}
              {item === "Jugadores" && "♟"}
              {item === "Partidos" && "▣"}
              {item === "Resultados" && "≡"}
              {item === "Pagos" && "$"}
              {item === "Estadísticas" && "▥"}
            </span>
            {item}
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="user">
            <div className="avatar">B</div>
            <div>
              <strong>Brayan Salas</strong>
              <small>Administrador</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <span>Administración de liga</span>
          <span className="online">● Sistema activo</span>
        </header>

        <section className="content">{renderContent()}</section>
      </main>
    </div>
  );
}
