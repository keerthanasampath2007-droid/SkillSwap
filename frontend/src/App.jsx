import { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL = "http://localhost:8080/api";

function App() {
  const [page, setPage] = useState("login");
  const [currentMember, setCurrentMember] = useState(null);

  useEffect(() => {
    const savedMember = localStorage.getItem("skillswap_member");

    if (savedMember) {
      try {
        const member = JSON.parse(savedMember);
        setCurrentMember(member);
        setPage("dashboard");
      } catch {
        localStorage.removeItem("skillswap_member");
      }
    }
  }, []);

  function handleLogin(member) {
    setCurrentMember(member);

    localStorage.setItem(
      "skillswap_member",
      JSON.stringify(member)
    );

    setPage("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("skillswap_member");
    setCurrentMember(null);
    setPage("login");
  }

  if (page === "login") {
    return (
      <Atmosphere>
        <LoginPage
          onLogin={handleLogin}
          onRegister={() => setPage("register")}
        />
      </Atmosphere>
    );
  }

  if (page === "register") {
    return (
      <Atmosphere>
        <RegisterPage
          onRegister={handleLogin}
          onLogin={() => setPage("login")}
        />
      </Atmosphere>
    );
  }

  return (
    <Atmosphere>
      <Dashboard
        currentMember={currentMember}
        setCurrentMember={setCurrentMember}
        onLogout={handleLogout}
      />
    </Atmosphere>
  );
}


/* =========================================================
   ATMOSPHERE
   ========================================================= */

function Atmosphere({ children }) {
  return (
    <div className="weather-world">

      <div className="night-sky"></div>

      <div className="aurora aurora-one"></div>
      <div className="aurora aurora-two"></div>
      <div className="aurora aurora-three"></div>

      <div className="cloud cloud-one"></div>
      <div className="cloud cloud-two"></div>
      <div className="cloud cloud-three"></div>

      <div className="rain rain-one"></div>
      <div className="rain rain-two"></div>
      <div className="rain rain-three"></div>
      <div className="rain rain-four"></div>

      <div className="weather-glow"></div>

      <div className="page-content">
        {children}
      </div>

    </div>
  );
}


/* =========================================================
   LOGIN PAGE
   ========================================================= */

function LoginPage({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/members`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to connect to the server."
        );
      }

      const members = await response.json();

      const member = members.find(
        (item) =>
          item.email.toLowerCase() ===
          email.trim().toLowerCase()
      );

      if (!member) {
        setError(
          "No account found with this email. Please register first."
        );
        return;
      }

      onLogin(member);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-brand">

          <div className="brand-mark">
            S
          </div>

          <div>
            <h1>SkillSwap</h1>
            <p>Share skills. Meet people. Grow together.</p>
          </div>

        </div>

        <div className="auth-content">

          <div className="eyebrow">
            COMMUNITY SKILL EXCHANGE
          </div>

          <h2>Welcome back</h2>

          <p className="auth-subtitle">
            Your community is waiting. Sign in and
            continue exchanging what you know.
          </p>

          {error && (
            <div className="auth-error">
              <span className="message-dot"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label>Email Address</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              <span>
                {loading
                  ? "Signing in..."
                  : "Sign In"}
              </span>

              {!loading && (
                <span className="button-arrow">
                  →
                </span>
              )}
            </button>

          </form>

          <div className="auth-switch">

            <span>New to SkillSwap?</span>

            <button
              type="button"
              className="link-button"
              onClick={onRegister}
            >
              Create an account
            </button>

          </div>

        </div>

        <div className="auth-footer">
          Exchange time, not money.
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   REGISTER PAGE
   ========================================================= */

function RegisterPage({ onRegister, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const membersResponse = await fetch(
        `${API_BASE_URL}/members`
      );

      if (!membersResponse.ok) {
        throw new Error(
          "Unable to connect to the server."
        );
      }

      const members = await membersResponse.json();

      const existingMember = members.find(
        (member) =>
          member.email.toLowerCase() ===
          email.trim().toLowerCase()
      );

      if (existingMember) {
        setError(
          "An account with this email already exists."
        );
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            creditBalance: 10,
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();

        throw new Error(
          text || "Registration failed."
        );
      }

      const newMember = await response.json();

      onRegister(newMember);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-brand">

          <div className="brand-mark">
            S
          </div>

          <div>
            <h1>SkillSwap</h1>
            <p>Share skills. Meet people. Grow together.</p>
          </div>

        </div>

        <div className="auth-content">

          <div className="eyebrow">
            JOIN THE COMMUNITY
          </div>

          <h2>Create your account</h2>

          <p className="auth-subtitle">
            Start with 10 time credits and begin
            exchanging skills with people around you.
          </p>

          {error && (
            <div className="auth-error">
              <span className="message-dot"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>

            <input
              type="text"
              placeholder="What should we call you?"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

            <label>Email Address</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              <span>
                {loading
                  ? "Creating account..."
                  : "Create Account"}
              </span>

              {!loading && (
                <span className="button-arrow">
                  →
                </span>
              )}
            </button>

          </form>

          <div className="auth-switch">

            <span>Already part of SkillSwap?</span>

            <button
              type="button"
              className="link-button"
              onClick={onLogin}
            >
              Sign in
            </button>

          </div>

        </div>

        <div className="auth-footer">
          Your time is valuable. Share it.
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard({
  currentMember,
  setCurrentMember,
  onLogout,
}) {
  const [skills, setSkills] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [skillName, setSkillName] = useState("");
  const [availableHours, setAvailableHours] =
    useState("");

  const [requestedHours, setRequestedHours] =
    useState({});

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const memberResponse = await fetch(
        `${API_BASE_URL}/members/${currentMember.id}`
      );

      if (!memberResponse.ok) {
        throw new Error(
          "Could not load your account."
        );
      }

      const memberData =
        await memberResponse.json();

      setCurrentMember(memberData);

      localStorage.setItem(
        "skillswap_member",
        JSON.stringify(memberData)
      );

      const skillsResponse = await fetch(
        `${API_BASE_URL}/skill-offers`
      );

      if (!skillsResponse.ok) {
        throw new Error(
          "Could not load skill offers."
        );
      }

      const skillsData =
        await skillsResponse.json();

      setSkills(skillsData);

      const sessionsResponse = await fetch(
        `${API_BASE_URL}/session-requests`
      );

      if (!sessionsResponse.ok) {
        throw new Error(
          "Could not load session requests."
        );
      }

      const sessionsData =
        await sessionsResponse.json();

      setSessions(sessionsData);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleOfferSkill(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!skillName.trim()) {
      setError("Please enter a skill name.");
      return;
    }

    if (
      !availableHours ||
      Number(availableHours) <= 0
    ) {
      setError(
        "Available hours must be greater than zero."
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/skill-offers?providerId=${currentMember.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skillName: skillName.trim(),
            availableHours: Number(
              availableHours
            ),
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();

        throw new Error(
          text ||
            "Failed to create skill offer."
        );
      }

      const newSkill =
        await response.json();

      setSkills((previous) => [
        ...previous,
        newSkill,
      ]);

      setSkillName("");
      setAvailableHours("");

      setMessage(
        "Your skill is now available to the community."
      );

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  async function handleRequestSession(
    skillOfferId
  ) {
    setMessage("");
    setError("");

    const hours = Number(
      requestedHours[skillOfferId]
    );

    if (!hours || hours <= 0) {
      setError(
        "Enter the number of hours you want to request."
      );
      return;
    }

    try {
      const params = new URLSearchParams({
        requesterId: currentMember.id,
        skillOfferId: skillOfferId,
        requestedHours: hours,
      });

      const response = await fetch(
        `${API_BASE_URL}/session-requests?${params}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const text = await response.text();

        throw new Error(
          text ||
            "Failed to request session."
        );
      }

      const newSession =
        await response.json();

      setSessions((previous) => [
        ...previous,
        newSession,
      ]);

      setRequestedHours((previous) => ({
        ...previous,
        [skillOfferId]: "",
      }));

      await loadData();

      setMessage(
        "Your session request has been sent."
      );

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  function handleRequestedHoursChange(
    skillId,
    value
  ) {
    setRequestedHours((previous) => ({
      ...previous,
      [skillId]: value,
    }));
  }

  const mySessions = currentMember
    ? sessions.filter(
        (session) =>
          session.requester &&
          session.requester.id ===
            currentMember.id
      )
    : [];

  if (loading) {
    return (
      <div className="dashboard-loading">

        <div className="loading-orb"></div>

        <h2>Preparing your space...</h2>

        <p>
          Connecting you with the SkillSwap
          community.
        </p>

      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* =================================================
          NAVIGATION
          ================================================= */}

      <nav className="navbar glass-panel">

        <div className="brand-area">

          <div className="brand-mark small">
            S
          </div>

          <div>
            <h2>SkillSwap</h2>
            <span>
              Community Skill Exchange
            </span>
          </div>

        </div>

        <div className="nav-user">

          <div className="user-avatar">
            {currentMember.name
              ? currentMember.name
                  .charAt(0)
                  .toUpperCase()
              : "U"}
          </div>

          <div className="user-details">
            <strong>
              {currentMember.name}
            </strong>

            <span>
              Community Member
            </span>
          </div>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            Sign out
          </button>

        </div>

      </nav>


      {/* =================================================
          MAIN CONTENT
          ================================================= */}

      <main className="container">

        <section className="welcome">

          <div>

            <div className="eyebrow">
              YOUR COMMUNITY SPACE
            </div>

            <h1>
              Welcome,{" "}
              <span>
                {currentMember.name}
              </span>
            </h1>

            <p>
              Share what you know, learn something
              new, and connect with people through
              time instead of money.
            </p>

          </div>

          <div className="welcome-decoration">
            <div className="floating-drop"></div>
            <div className="floating-drop second"></div>
          </div>

        </section>


        {/* =================================================
            MESSAGES
            ================================================= */}

        {message && (
          <div className="success-message glass-message">
            <span className="message-icon">
              ✓
            </span>

            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="error-message glass-message">
            <span className="message-icon">
              !
            </span>

            <span>{error}</span>
          </div>
        )}


        {/* =================================================
            BALANCE
            ================================================= */}

        <section className="balance-card glass-panel">

          <div className="balance-content">

            <div className="balance-icon">
              ⏱
            </div>

            <div>

              <span className="balance-label">
                YOUR TIME CREDITS
              </span>

              <div className="balance">
                {currentMember.creditBalance}
              </div>

              <p>
                hours available to learn
              </p>

            </div>

          </div>

          <div className="balance-wave"></div>

        </section>


        {/* =================================================
            OFFER SKILL
            ================================================= */}

        <section className="section">

          <div className="section-heading">

            <div>
              <span className="section-number">
                01
              </span>

              <div>
                <h2>Share a skill</h2>

                <p>
                  Give someone an hour of your
                  knowledge.
                </p>
              </div>
            </div>

          </div>

          <form
            className="form-card glass-panel"
            onSubmit={handleOfferSkill}
          >

            <div className="input-group">

              <label>What can you teach?</label>

              <input
                type="text"
                placeholder="e.g. Java, Guitar, Photography..."
                value={skillName}
                onChange={(event) =>
                  setSkillName(
                    event.target.value
                  )
                }
              />

            </div>

            <div className="input-group">

              <label>
                How many hours can you offer?
              </label>

              <input
                type="number"
                min="1"
                placeholder="e.g. 5"
                value={availableHours}
                onChange={(event) =>
                  setAvailableHours(
                    event.target.value
                  )
                }
              />

            </div>

            <button
              className="primary-button"
              type="submit"
            >
              <span>
                Share My Skill
              </span>

              <span className="button-arrow">
                →
              </span>
            </button>

          </form>

        </section>


        {/* =================================================
            AVAILABLE SKILLS
            ================================================= */}

        <section className="section">

          <div className="section-heading">

            <div>
              <span className="section-number">
                02
              </span>

              <div>
                <h2>Discover skills</h2>

                <p>
                  Someone in your community
                  might know exactly what you need.
                </p>
              </div>
            </div>

          </div>

          {skills.length === 0 ? (

            <div className="empty-state glass-panel">

              <div className="empty-icon">
                +
              </div>

              <h3>
                No skills available yet
              </h3>

              <p>
                Be the first person to share
                something you know.
              </p>

            </div>

          ) : (

            <div className="skills-grid">

              {skills.map((skill) => (

                <div
                  className="skill-card glass-panel"
                  key={skill.id}
                >

                  <div className="skill-card-top">

                    <div className="skill-icon">
                      {skill.skillName
                        ? skill.skillName
                            .charAt(0)
                            .toUpperCase()
                        : "S"}
                    </div>

                    <div className="skill-info">

                      <h3>
                        {skill.skillName}
                      </h3>

                      <p>
                        Taught by{" "}
                        <strong>
                          {skill.provider
                            ? skill.provider.name
                            : "Unknown"}
                        </strong>
                      </p>

                    </div>

                  </div>

                  <div className="skill-bottom">

                    <div className="availability">

                      <span>
                        Available
                      </span>

                      <strong>
                        {skill.availableHours}
                        {" "}
                        hrs
                      </strong>

                    </div>

                    {skill.provider &&
                    skill.provider.id ===
                      currentMember.id ? (

                      <span className="own-skill">
                        Your Skill
                      </span>

                    ) : (

                      <div className="request-area">

                        <input
                          type="number"
                          min="1"
                          max={
                            skill.availableHours
                          }
                          placeholder="Hours"
                          value={
                            requestedHours[
                              skill.id
                            ] || ""
                          }
                          onChange={(event) =>
                            handleRequestedHoursChange(
                              skill.id,
                              event.target.value
                            )
                          }
                        />

                        <button
                          className="secondary-button"
                          onClick={() =>
                            handleRequestSession(
                              skill.id
                            )
                          }
                        >
                          Request
                        </button>

                      </div>

                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* =================================================
            MY SESSIONS
            ================================================= */}

        <section className="section">

          <div className="section-heading">

            <div>
              <span className="section-number">
                03
              </span>

              <div>
                <h2>Your sessions</h2>

                <p>
                  Keep track of the skills
                  you're learning.
                </p>
              </div>
            </div>

          </div>

          {mySessions.length === 0 ? (

            <div className="empty-state glass-panel">

              <div className="empty-icon">
                ○
              </div>

              <h3>
                Your learning journey starts here
              </h3>

              <p>
                Request a skill above and your
                sessions will appear here.
              </p>

            </div>

          ) : (

            <div className="sessions-list">

              {mySessions.map((session) => (

                <div
                  className="session-card glass-panel"
                  key={session.id}
                >

                  <div className="session-main">

                    <div className="session-icon">
                      {session.skillOffer &&
                      session.skillOffer.skillName
                        ? session.skillOffer.skillName
                            .charAt(0)
                            .toUpperCase()
                        : "S"}
                    </div>

                    <div>

                      <h3>
                        {session.skillOffer
                          ? session.skillOffer
                              .skillName
                          : "Unknown Skill"}
                      </h3>

                      <p>
                        With{" "}
                        <strong>
                          {session.skillOffer &&
                          session.skillOffer.provider
                            ? session.skillOffer
                                .provider.name
                            : "Unknown"}
                        </strong>
                      </p>

                    </div>

                  </div>

                  <div className="session-details">

                    <div>
                      <span>Requested</span>
                      <strong>
                        {session.requestedHours} hrs
                      </strong>
                    </div>

                    <div>
                      <span>Delivered</span>
                      <strong>
                        {session.deliveredHours} hrs
                      </strong>
                    </div>

                    <div>
                      <span>Status</span>

                      <strong
                        className={`status status-${String(
                          session.status
                        ).toLowerCase()}`}
                      >
                        {session.status}
                      </strong>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* =================================================
            REFRESH
            ================================================= */}

        <div className="refresh-area">

          <button
            className="refresh-button"
            onClick={loadData}
          >
            ↻
            <span>Refresh community</span>
          </button>

        </div>

      </main>

    </div>
  );
}

export default App;