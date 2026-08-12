function EmailList({ emails }) {
  if (!emails || emails.length === 0) {
    return <p>No monitored emails yet.</p>;
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>Monitored Emails</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {emails.map(e => (
          <li
            key={e.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              marginBottom: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{e.email}</span>
            <span
              style={{
                fontSize: '0.8rem',
                padding: '2px 8px',
                borderRadius: 12,
                background: e.verified ? '#d4f7d4' : '#f7e7c1',
                color: e.verified ? '#1a7a1a' : '#8a6d1a'
              }}
            >
              {e.verified ? 'Verified' : 'Pending'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmailList;