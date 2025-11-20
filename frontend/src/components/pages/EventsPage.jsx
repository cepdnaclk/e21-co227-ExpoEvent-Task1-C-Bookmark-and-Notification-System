import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import EventCard from '../cards/EventCard';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /*const [page, setPage] = useState(1);
  useEffect(() => {
    fetchEvents();
  }, [page]);
  */

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/events'/*?page=${page}&limit=10*/);
      setEvents(response.data);/* setEvents((prev) => [...prev, ...response.data.events]);*/
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmarkToggle = (event) => {
    setEvents((current) =>
      current.map((item) =>
        item.id === event.id ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );

    const request = event.isBookmarked
      ? api.delete(`/events/${event.id}/bookmark`)
      : api.post(`/events/${event.id}/bookmark`);

    request.catch((error) => {
      console.error('Failed to toggle bookmark', error);
      setEvents((current) =>
        current.map((item) =>
          item.id === event.id ? { ...item, isBookmarked: event.isBookmarked } : item
        )
      );
    });
  };
  /*<button type="button" className="ghost-button" onClick={() => {
          setPage(1);
          setEvents([]);
          fetchEvents();
        }}>
          Refresh
        </button>
  */

  return (
    <section className="page-section">
      <header className="section-header">
        <div>
          <span className="eyebrow">Event lineup</span>
          <h2>Discover what is happening next</h2>
        </div>
        <button type="button" className="ghost-button" onClick={fetchEvents}>
          Refresh
        </button>
      </header>
      {isLoading ? /*&& page ===1 ?*/ (
        <div className="loading-state">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="empty-state">
          <h3>No events scheduled</h3>
          <p>We are curating the next batch of highlights. Check back soon.</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onToggleBookmark={() => handleBookmarkToggle(event)}
            />
          ))}
        </div>
          /*<div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              className="ghost-button"
              onClick={() => setPage((p) => p + 1)} // increments the page
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        </>
          */
      )}
    </section>
  );
}
