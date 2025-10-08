import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../services/EventsAPI";
import "../CSS/EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        if (mounted) setEvent(data);
      } catch (err) {
        setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchEvent();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="event-detail__loading">Loading event...</div>;
  if (error) return <div className="event-detail__error">Failed to load event.</div>;
  if (!event) return <div className="event-detail__empty">Event not found.</div>;

  const image = event.imageUrl || event.image || event.img;

  return (
    <div className="event-detail-container">
      <div className="event-detail-card">
        <div className="event-detail-hero">
          {image ? (
            <img src={image} alt={event.title} className="event-detail-hero__img" />
          ) : (
            <div className="event-detail-hero__placeholder">No image available</div>
          )}
        </div>

        <div className="event-detail-content">
          <div className="event-detail-top">
            <div>
              <h1 className="event-detail-title">{event.title}</h1>
              <p className="event-detail-sub">{event.subtitle || ""}</p>
            </div>
            <div className="event-detail-actions">
              <Link to="/" className="back-link">← Back</Link>
            </div>
          </div>

          <div className="event-meta">
            {event.date && (
              <div className="meta-item">
                <div className="meta-label">Date</div>
                <div className="meta-value">{new Date(event.date).toLocaleString()}</div>
              </div>
            )}
            {event.location && (
              <div className="meta-item">
                <div className="meta-label">Location</div>
                <div className="meta-value">{event.location}</div>
              </div>
            )}
            {event.organizer && (
              <div className="meta-item">
                <div className="meta-label">Organizer</div>
                <div className="meta-value">{event.organizer}</div>
              </div>
            )}
          </div>

          {event.description && (
            <div className="event-description">
              <h3>About this event</h3>
              <p>{event.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
