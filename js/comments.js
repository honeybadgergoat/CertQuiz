/**
 * Comments System for Quiz Questions
 * Handles comment submission, voting, and display with Firebase integration
 */

import { db } from './firebase-config.js';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-lite.js";

// Anonymous name generator
const adjectives = [
    'Anonymous', 'Curious', 'Helpful', 'Thoughtful', 'Wise', 'Smart',
    'Clever', 'Brilliant', 'Eager', 'Friendly', 'Kind', 'Patient',
    'Determined', 'Creative', 'Focused', 'Diligent', 'Careful', 'Precise'
];

const nouns = [
    'Student', 'Learner', 'Scholar', 'Developer', 'Architect', 'Expert',
    'Enthusiast', 'Practitioner', 'Professional', 'Contributor', 'Thinker',
    'Analyst', 'Consultant', 'Specialist', 'Engineer', 'Administrator'
];

/**
 * Generate a random anonymous username
 */
function generateAnonymousName() {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 1000);
    return `${adjective}${noun}${number}`;
}

/**
 * Get unique user ID from localStorage or create new one
 */
function getUserId() {
    let userId = localStorage.getItem('quizUserId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('quizUserId', userId);
    }
    return userId;
}

/**
 * Get or create user's vote record for tracking
 */
function getUserVotes() {
    const votesStr = localStorage.getItem('quizUserVotes');
    return votesStr ? JSON.parse(votesStr) : {};
}

/**
 * Save user's vote record
 */
function saveUserVotes(votes) {
    localStorage.setItem('quizUserVotes', JSON.stringify(votes));
}

/**
 * Initialize comments system for current question
 */
export function initializeComments(questionId) {
    console.log('Initializing comments for question:', questionId);

    if (!db) {
        console.error('Firebase not initialized. Please configure Firebase in firebase-config.js');
        showFirebaseError();
        return;
    }

    // Reset form
    const userNameInput = document.getElementById('user-name-input');
    const commentInput = document.getElementById('comment-input');
    const charCount = document.getElementById('char-count');

    if (commentInput) {
        commentInput.value = '';
        if (charCount) {
            charCount.textContent = '0/500';
        }
    }

    // Load saved username if exists
    const savedName = localStorage.getItem('quizUserName');
    if (savedName && userNameInput) {
        userNameInput.value = savedName;
    }

    // Set up character counter (remove any existing listeners first)
    if (commentInput) {
        const newCommentInput = commentInput.cloneNode(true);
        commentInput.parentNode.replaceChild(newCommentInput, commentInput);

        newCommentInput.addEventListener('input', function() {
            const charCountEl = document.getElementById('char-count');
            if (charCountEl) {
                charCountEl.textContent = `${this.value.length}/500`;
            }
        });
    }

    // Set up submit button (remove any existing listeners first)
    const submitBtn = document.getElementById('submit-comment-btn');
    if (submitBtn) {
        const newSubmitBtn = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
        newSubmitBtn.onclick = () => submitComment(questionId);
    }

    // Load existing comments
    loadComments(questionId);
}

/**
 * Show Firebase configuration error
 */
function showFirebaseError() {
    const commentsList = document.getElementById('comments-list');
    if (commentsList) {
        commentsList.innerHTML = `
            <div class="no-comments">
                <p style="color: #dc3545; font-weight: 600;">⚠️ Firebase Not Configured</p>
                <p style="margin-top: 10px;">To enable comments, please configure Firebase in <code>js/firebase-config.js</code></p>
                <p style="margin-top: 10px; font-size: 0.9em;">
                    See the file for instructions on getting your Firebase credentials.
                </p>
            </div>
        `;
    }
}

/**
 * Submit a new comment
 */
async function submitComment(questionId) {
    if (!db) {
        alert('Firebase not configured. Please set up Firebase to use comments.');
        return;
    }

    const userNameInput = document.getElementById('user-name-input');
    const commentInput = document.getElementById('comment-input');
    const submitBtn = document.getElementById('submit-comment-btn');

    const commentText = commentInput.value.trim();

    if (!commentText) {
        alert('Please enter a comment');
        return;
    }

    // Get or generate username
    let userName = userNameInput.value.trim();
    const isAnonymous = !userName;

    if (isAnonymous) {
        userName = generateAnonymousName();
    } else {
        // Save username for future use
        localStorage.setItem('quizUserName', userName);
    }

    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Posting...';

    try {
        // Add comment to Firebase
        await addDoc(collection(db, 'comments'), {
            questionId: questionId,
            text: commentText,
            author: userName,
            isAnonymous: isAnonymous,
            userId: getUserId(),
            votes: 0,
            timestamp: serverTimestamp(),
            createdAt: new Date().toISOString()
        });

        // Clear form
        commentInput.value = '';
        document.getElementById('char-count').textContent = '0/500';

        // Show success message
        showNotification('Comment posted successfully!', 'success');

        // Reload comments
        loadComments(questionId);
    } catch (error) {
        console.error('Error posting comment:', error);
        showNotification('Error posting comment. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Post Comment';
    }
}

/**
 * Load comments for a question
 */
async function loadComments(questionId) {
    if (!db) {
        showFirebaseError();
        return;
    }

    const commentsList = document.getElementById('comments-list');
    const commentsCount = document.getElementById('comments-count');

    commentsList.innerHTML = '<div class="loading-comments">Loading comments...</div>';

    try {
        console.log('Loading comments for question:', questionId);

        // Query comments for this question
        // We'll sort them manually to avoid needing a composite index
        const commentsQuery = query(
            collection(db, 'comments'),
            where('questionId', '==', questionId)
        );
        const snapshot = await getDocs(commentsQuery);

        console.log('Query successful. Found', snapshot.size, 'comments');

        const comments = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            console.log('Comment data:', doc.id, data);
            comments.push({
                id: doc.id,
                ...data
            });
        });

        // Sort comments: first by votes (descending), then by creation time (descending)
        comments.sort((a, b) => {
            const voteDiff = (b.votes || 0) - (a.votes || 0);
            if (voteDiff !== 0) return voteDiff;

            // If votes are equal, sort by date
            const dateA = a.timestamp ? a.timestamp.toDate() : new Date(a.createdAt);
            const dateB = b.timestamp ? b.timestamp.toDate() : new Date(b.createdAt);
            return dateB - dateA;
        });

        console.log('Sorted comments:', comments.length);

        // Update comments count
        if (commentsCount) {
            commentsCount.textContent = comments.length;
        }

        // Display comments
        if (comments.length === 0) {
            commentsList.innerHTML = `
                <div class="no-comments">
                    No comments yet. Be the first to share your thoughts!
                </div>
            `;
        } else {
            commentsList.innerHTML = comments.map(comment => renderComment(comment)).join('');

            // Attach vote button listeners
            comments.forEach(comment => {
                attachVoteListeners(comment.id, questionId);
            });
        }
    } catch (error) {
        console.error('Error loading comments:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);

        // Show more detailed error message
        let errorMessage = 'Error loading comments. ';
        if (error.code === 'permission-denied') {
            errorMessage += 'Please check Firestore security rules.';
        } else if (error.code === 'failed-precondition') {
            errorMessage += 'Database index may be required.';
        } else if (error.code === 'unavailable') {
            errorMessage += 'Cannot connect to Firebase. Check your internet connection.';
        } else {
            errorMessage += error.message || 'Please check your Firebase configuration.';
        }

        commentsList.innerHTML = `
            <div class="no-comments" style="color: #dc3545;">
                <strong>⚠️ ${errorMessage}</strong>
                <br><br>
                <small>Check browser console for details.</small>
            </div>
        `;
    }
}

/**
 * Render a single comment
 */
function renderComment(comment) {
    const userVotes = getUserVotes();
    const userVote = userVotes[comment.id]; // 'up', 'down', or undefined

    const date = comment.timestamp
        ? new Date(comment.timestamp.toDate()).toLocaleDateString()
        : new Date(comment.createdAt).toLocaleDateString();

    const voteCount = comment.votes || 0;
    const voteCountClass = voteCount > 0 ? 'positive' : voteCount < 0 ? 'negative' : '';

    return `
        <div class="comment-item">
            <div class="vote-buttons">
                <button class="vote-btn upvote ${userVote === 'up' ? 'voted' : ''}" data-comment-id="${comment.id}" data-vote-type="up">
                    ▲
                </button>
                <span class="vote-count ${voteCountClass}">${voteCount}</span>
                <button class="vote-btn downvote ${userVote === 'down' ? 'voted' : ''}" data-comment-id="${comment.id}" data-vote-type="down">
                    ▼
                </button>
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <div class="comment-author">
                        ${comment.author}
                        ${comment.isAnonymous ? '<span class="anonymous-badge">Anonymous</span>' : ''}
                    </div>
                    <div class="comment-date">${date}</div>
                </div>
                <div class="comment-text">${escapeHtml(comment.text)}</div>
            </div>
        </div>
    `;
}

/**
 * Attach vote button listeners
 */
function attachVoteListeners(commentId, questionId) {
    const upvoteBtn = document.querySelector(`.vote-btn.upvote[data-comment-id="${commentId}"]`);
    const downvoteBtn = document.querySelector(`.vote-btn.downvote[data-comment-id="${commentId}"]`);

    if (upvoteBtn) {
        upvoteBtn.onclick = () => handleVote(commentId, 'up', questionId);
    }
    if (downvoteBtn) {
        downvoteBtn.onclick = () => handleVote(commentId, 'down', questionId);
    }
}

/**
 * Handle vote on a comment
 */
async function handleVote(commentId, voteType, questionId) {
    if (!db) return;

    const userVotes = getUserVotes();
    const currentVote = userVotes[commentId];

    try {
        const commentRef = doc(db, 'comments', commentId);
        const commentDoc = await getDoc(commentRef);

        if (!commentDoc.exists()) {
            console.error('Comment not found');
            return;
        }

        const currentVoteCount = commentDoc.data().votes || 0;
        let newVoteCount = currentVoteCount;

        // Calculate new vote count based on current and new vote
        if (currentVote === voteType) {
            // User is removing their vote
            newVoteCount = voteType === 'up' ? currentVoteCount - 1 : currentVoteCount + 1;
            delete userVotes[commentId];
        } else if (currentVote) {
            // User is changing their vote
            newVoteCount = voteType === 'up' ? currentVoteCount + 2 : currentVoteCount - 2;
            userVotes[commentId] = voteType;
        } else {
            // User is voting for the first time
            newVoteCount = voteType === 'up' ? currentVoteCount + 1 : currentVoteCount - 1;
            userVotes[commentId] = voteType;
        }

        // Update vote count in Firebase
        await updateDoc(commentRef, {
            votes: newVoteCount
        });

        // Save user's votes to localStorage
        saveUserVotes(userVotes);

        // Reload comments to show updated votes and order
        loadComments(questionId);
    } catch (error) {
        console.error('Error handling vote:', error);
        showNotification('Error updating vote. Please try again.', 'error');
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    `;
    notification.textContent = message;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

export { generateAnonymousName };
