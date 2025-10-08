// EventCards.jsx – reusable cards + 4-up responsive grid
import React from "react";
import "../CSS/EventCards.css";
import { Link } from "react-router-dom";

function EventCard({ id, title, date, description, location, imageUrl }) {
  return (
    <Link to={`/events/${id}`} className="event-card__link" aria-label={`View ${title}`}>
      <div className="event-card">
      {imageUrl && (
        <div className="event-card__media">
          
          <img src={imageUrl} alt={`${title} image`} loading="lazy" />
        </div>
      )}
      <div className="event-card__body">
        <h3 className="event-card__title">{title}</h3>

        <div className="event-card__meta">
          {date && (
            <span className="event-card__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                <path d="M6 2v2H5a2 2 0 0 0-2 2v1h18V6a2 2 0 0 0-2-2h-1V2h-2v2H8V2H6zm15 7H3v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9z" fill="currentColor"/>
              </svg>
              {new Date(date).toLocaleDateString()}
            </span>
          )}
          {location && (
            <span className="event-card__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5z" fill="currentColor"/>
              </svg>
              {location}
            </span>
          )}
        </div>

        {description && (
          <p className="event-card__desc">{description}</p>
        )}
      </div>
    </div>
    </Link>
  );
}

const EventCards = ({ events = [] }) => {
  if (!events.length) {
    return (
      <div className="event-cards event-cards--empty">
        <p>No events found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="event-cards">
      {events.map((e) => (
        <EventCard key={e.id} {...e} />
      ))}
    </div>
  );
};

export default EventCards;

