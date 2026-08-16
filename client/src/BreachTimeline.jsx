function BreachTimeline({ events }) {
  return (
    <section className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h2 className="text-sm font-semibold text-white mb-4">Breach Timeline</h2>

      {events.length === 0 ? (
        <p className="text-xs text-gray-500 py-6 text-center">No breach events detected.</p>
      ) : (
        <div className="space-y-3">
          {events.map(ev => (
            <div key={ev.id} className="p-3 bg-gray-950 border border-gray-800 rounded">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-semibold text-red-400">{ev.breach_name}</p>
                <span className="text-xs text-gray-500">{new Date(ev.breach_date).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {(ev.data_classes || []).map(dc => (
                  <span key={dc} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                    {dc}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default BreachTimeline;