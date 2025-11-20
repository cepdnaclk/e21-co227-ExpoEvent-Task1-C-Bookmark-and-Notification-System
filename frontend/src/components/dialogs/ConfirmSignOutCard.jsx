import React from 'react';

export default function ConfirmSignOutCard({ onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h3>Ready to sign out?</h3>
                <p>You'll need to log in again to manage your bookmarks and notifications.</p>
                <div className="modal-actions">
                    <button className="ghost-button" onClick={onCancel}>Cancel</button>
                    <button className="primary-button" onClick={onConfirm}>Sign Out</button>
                </div>
            </div>
        </div>
    );
}