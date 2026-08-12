// Maps breach data types to a simple emoji icon — easy to extend later.
const ICONS = {
  'Passwords': '🔑',
  'Phone numbers': '📞',
  'Email addresses': '📧',
  'Dates of birth': '🎂',
  'Credit cards': '💳'
};

function iconFor(dataClass) {
  return ICONS[dataClass] || '⚠️';
}

function BreachTimeline({ events }) {
  if (!events || events.length === 0) {
    return <p>No breaches found (yet) — good news!</p>;
  }

  return (
    <div>
      <h2>Breach Timeline</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {events.map(ev => (
          <li
            key={ev.id}
            style={{
              border: '1px solid #e0a0a0',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              marginBottom: 8,
              background: '#fff5f5'
            }}
          >
            <strong>{ev.breach_name}</strong>
            <div style={{ fontSize: '0.85rem', color: '#555' }}>
              {new Date(ev.breach_date).toLocaleDateString()}
            </div>
            <div style={{ marginTop: 6 }}>
              {(ev.data_classes || []).map(dc => (
                <span key={dc} style={{ marginRight: 10 }}>
                  {iconFor(dc)} {dc}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BreachTimeline;