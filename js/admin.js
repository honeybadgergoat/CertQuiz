/**
 * Admin Portal - Comment Management System
 * Handles authentication and CRUD operations for comments
 */

import { db } from './firebase-config.js';
import { envConfig } from './env-loader.js';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-lite.js";

// Admin credentials loaded from environment configuration
const ADMIN_CREDENTIALS = {
    username: envConfig.get('ADMIN_USERNAME') || 'admin',
    password: envConfig.get('ADMIN_PASSWORD') || 'admin'
};

// Current filter state
let currentFilter = 'all';
let allComments = [];
let allQuestions = [];
let currentQuestionFilter = 'all';
let commentsByQuestion = {}; // Map of questionId -> comments array
let currentSortMethod = 'number'; // Default sort method

/**
 * Check if user is logged in on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        showDashboard();
    }

    // Add enter key support for login
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                login();
            }
        });
    }
});

/**
 * Handle admin login
 */
window.login = function() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        errorMessage.style.display = 'none';
        showDashboard();
    } else {
        errorMessage.style.display = 'block';
    }
};

/**
 * Handle admin logout
 */
window.logout = function() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';

    // Clear form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
};

/**
 * Generate question ID hash (same logic as quiz.js)
 */
function generateQuestionId(question) {
    const questionText = question.question.trim();
    let hash = 0;
    for (let i = 0; i < questionText.length; i++) {
        const char = questionText.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return `${question.topic}_q_${Math.abs(hash)}`;
}

/**
 * Show admin dashboard
 */
function showDashboard() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    loadAllComments();
    loadAllQuestions();
}

/**
 * Switch between tabs
 */
window.switchTab = function(tab) {
    const clickedBtn = window.event ? window.event.target : null;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    if (tab === 'comments') {
        document.getElementById('comments-tab').classList.add('active');
    } else if (tab === 'questions') {
        document.getElementById('questions-tab').classList.add('active');
    }
};

/**
 * Load all comments from Firebase
 */
async function loadAllComments() {
    if (!db) {
        console.error('Firebase not initialized');
        document.getElementById('admin-comments-list').innerHTML =
            '<div class="no-comments">Firebase not configured</div>';
        return;
    }

    const commentsList = document.getElementById('admin-comments-list');
    commentsList.innerHTML = '<div class="loading">Loading comments...</div>';

    try {
        const snapshot = await getDocs(collection(db, 'comments'));

        allComments = [];
        snapshot.forEach(doc => {
            allComments.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Sort by timestamp (newest first)
        allComments.sort((a, b) => {
            const dateA = a.timestamp ? a.timestamp.toDate() : new Date(a.createdAt);
            const dateB = b.timestamp ? b.timestamp.toDate() : new Date(b.createdAt);
            return dateB - dateA;
        });

        // Build comments by question map
        // Comments use a hash ID, so we store them by that hash
        commentsByQuestion = {};
        allComments.forEach(comment => {
            const qId = comment.questionId;
            if (!commentsByQuestion[qId]) {
                commentsByQuestion[qId] = [];
            }
            commentsByQuestion[qId].push(comment);
        });

        console.log('Comments by question ID:', commentsByQuestion);

        updateStats();
        displayComments(allComments);
    } catch (error) {
        console.error('Error loading comments:', error);
        commentsList.innerHTML =
            '<div class="no-comments" style="color: #dc3545;">Error loading comments. Check console for details.</div>';
    }
}

/**
 * Update statistics cards
 */
function updateStats() {
    const totalComments = allComments.length;
    const uniqueQuestions = new Set(allComments.map(c => c.questionId)).size;
    const anonymousComments = allComments.filter(c => c.isAnonymous).length;

    document.getElementById('total-comments').textContent = totalComments;
    document.getElementById('total-questions-discussed').textContent = uniqueQuestions;
    document.getElementById('anonymous-comments').textContent = anonymousComments;
}

/**
 * Update questions statistics
 */
function updateQuestionStats() {
    const totalQuestions = allQuestions.length;
    const architectQuestions = allQuestions.filter(q => q.topic === 'architect').length;
    const cloudQuestions = allQuestions.filter(q => q.topic === 'cloud').length;
    const integrationQuestions = allQuestions.filter(q => q.topic === 'integration').length;

    document.getElementById('total-questions-db').textContent = totalQuestions;
    document.getElementById('architect-questions').textContent = architectQuestions;
    document.getElementById('cloud-questions').textContent = cloudQuestions;
    document.getElementById('integration-questions').textContent = integrationQuestions;
}

/**
 * Display comments in the list
 */
function displayComments(comments) {
    const commentsList = document.getElementById('admin-comments-list');

    if (comments.length === 0) {
        commentsList.innerHTML = '<div class="no-comments">No comments found</div>';
        return;
    }

    commentsList.innerHTML = comments.map(comment => renderAdminComment(comment)).join('');

    // Attach delete button listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const commentId = this.getAttribute('data-comment-id');
            deleteComment(commentId);
        });
    });
}

/**
 * Render a single admin comment
 */
function renderAdminComment(comment) {
    const date = comment.timestamp
        ? new Date(comment.timestamp.toDate()).toLocaleString()
        : new Date(comment.createdAt).toLocaleString();

    const voteCount = comment.votes || 0;
    const voteCountClass = voteCount > 0 ? 'positive' : voteCount < 0 ? 'negative' : '';

    return `
        <div class="admin-comment-item" data-comment-id="${comment.id}">
            <div class="admin-comment-header">
                <div class="admin-comment-meta">
                    <span class="admin-comment-author">
                        ${escapeHtml(comment.author)}
                        ${comment.isAnonymous ? '<span class="anonymous-badge">Anonymous</span>' : ''}
                    </span>
                    <span class="admin-comment-date">📅 ${date}</span>
                    <a href="#" class="admin-comment-question-link" onclick="goToQuestion('${comment.questionId}'); return false;">
                        📝 Question ID: ${comment.questionId}
                    </a>
                </div>
            </div>
            <div class="admin-comment-text">${escapeHtml(comment.text)}</div>
            <div class="admin-comment-actions">
                <button class="delete-btn" data-comment-id="${comment.id}">
                    🗑️ Delete
                </button>
                <div class="vote-info">
                    ▲▼ Votes: <span class="vote-count ${voteCountClass}">${voteCount}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Delete a comment
 */
async function deleteComment(commentId) {
    if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
        return;
    }

    try {
        await deleteDoc(doc(db, 'comments', commentId));

        // Remove from local array
        allComments = allComments.filter(c => c.id !== commentId);

        // Update display
        updateStats();
        filterComments();

        showNotification('Comment deleted successfully', 'success');
    } catch (error) {
        console.error('Error deleting comment:', error);
        showNotification('Error deleting comment', 'error');
    }
}

/**
 * Filter comments by type
 */
window.filterByType = function(type) {
    currentFilter = type;

    // Update active button
    const buttons = document.querySelectorAll('#comments-tab .filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    filterComments();
};

/**
 * Filter and display comments based on current filter and search
 */
window.filterComments = function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    let filtered = allComments;

    // Apply type filter
    switch(currentFilter) {
        case 'anonymous':
            filtered = filtered.filter(c => c.isAnonymous);
            break;
        case 'named':
            filtered = filtered.filter(c => !c.isAnonymous);
            break;
        case 'positive':
            filtered = filtered.filter(c => (c.votes || 0) > 0);
            break;
        case 'negative':
            filtered = filtered.filter(c => (c.votes || 0) < 0);
            break;
    }

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(c =>
            c.text.toLowerCase().includes(searchTerm) ||
            c.author.toLowerCase().includes(searchTerm) ||
            c.questionId.toString().includes(searchTerm)
        );
    }

    displayComments(filtered);
};

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

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Load all questions from Firebase
 */
async function loadAllQuestions() {
    if (!db) {
        console.error('Firebase not initialized');
        document.getElementById('admin-questions-list').innerHTML =
            '<div class="no-comments">Firebase not configured</div>';
        return;
    }

    const questionsList = document.getElementById('admin-questions-list');
    questionsList.innerHTML = '<div class="loading">Loading questions...</div>';

    try {
        const snapshot = await getDocs(collection(db, 'questions'));

        allQuestions = [];
        snapshot.forEach(doc => {
            allQuestions.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Sort by topic and question number
        allQuestions.sort((a, b) => {
            if (a.topic !== b.topic) {
                return a.topic.localeCompare(b.topic);
            }
            return (a.questionNumber || 0) - (b.questionNumber || 0);
        });

        updateQuestionStats();
        displayQuestions(allQuestions);
    } catch (error) {
        console.error('Error loading questions:', error);
        questionsList.innerHTML =
            '<div class="no-comments" style="color: #dc3545;">Error loading questions. Check console for details.</div>';
    }
}

/**
 * Display questions in the list
 */
function displayQuestions(questions) {
    const questionsList = document.getElementById('admin-questions-list');

    if (questions.length === 0) {
        questionsList.innerHTML = '<div class="no-comments">No questions found. Use the deploy tool to add questions.</div>';
        return;
    }

    questionsList.innerHTML = questions.map(question => renderQuestion(question)).join('');

    // Attach edit button listeners
    document.querySelectorAll('.edit-question-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-question-id');
            openEditModal(questionId);
        });
    });

    // Attach delete button listeners
    document.querySelectorAll('.delete-question-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-question-id');
            deleteQuestion(questionId);
        });
    });
}

/**
 * Render a single question
 */
function renderQuestion(question) {
    const answers = question.answers || {};
    const answerKeys = Object.keys(answers).sort();

    const correctAnswer = Array.isArray(question.correctAnswer)
        ? question.correctAnswer.join(', ').toUpperCase()
        : question.correctAnswer.toUpperCase();

    // Get comments for this question using the hash ID
    const questionHashId = generateQuestionId(question);
    const questionComments = commentsByQuestion[questionHashId] || [];
    const commentCount = questionComments.length;

    // Get first line of question (up to 100 chars or first period)
    const questionText = question.question || '';
    const firstLine = questionText.length > 100
        ? questionText.substring(0, 100) + '...'
        : questionText.split(/[.!?]/)[0] + (questionText.includes('.') || questionText.includes('!') || questionText.includes('?') ? '.' : '');

    return `
        <div class="question-item collapsed" data-question-id="${question.id}">
            <div class="question-header" onclick="toggleQuestionExpand('${question.id}')">
                <div class="question-summary">
                    <div class="question-meta">
                        <span class="expand-icon" id="expand-icon-${question.id}">▶</span>
                        <span class="question-number">#${question.questionNumber || 'N/A'}</span>
                        <span class="question-topic">${escapeHtml(question.topic || 'N/A')}</span>
                        ${question.multiSelect ? '<span class="multiselect-badge">Multi-Select</span>' : ''}
                        ${commentCount > 0 ? `<span class="comments-badge-small">💬 ${commentCount}</span>` : ''}
                    </div>
                    <div class="question-preview">${escapeHtml(firstLine)}</div>
                </div>
                <div class="question-actions-collapsed">
                    <button class="edit-btn edit-question-btn" data-question-id="${question.id}" onclick="event.stopPropagation();">
                        ✏️ Edit
                    </button>
                    <button class="delete-btn delete-question-btn" data-question-id="${question.id}" onclick="event.stopPropagation();">
                        🗑️ Delete
                    </button>
                </div>
            </div>

            <div class="question-details" id="question-details-${question.id}">
                <div class="question-text-full">${escapeHtml(questionText)}</div>
                <div class="question-answers">
                    ${answerKeys.map(key => `
                        <div class="answer-item">
                            <span class="answer-letter">${key.toUpperCase()})</span>
                            ${escapeHtml(answers[key])}
                        </div>
                    `).join('')}
                </div>
                <div class="correct-answer">
                    ✅ <strong>Correct Answer:</strong> ${correctAnswer}
                </div>
                ${question.explanation ? `
                    <div class="question-explanation">
                        💡 <strong>Explanation:</strong> ${escapeHtml(question.explanation)}
                    </div>
                ` : ''}

                <!-- Comments Section -->
                <div class="question-comments-section">
                    <div class="comments-toggle" onclick="toggleQuestionComments('${question.id}')">
                        <span class="comments-toggle-icon" id="toggle-icon-${question.id}">▶</span>
                        <span>💬 Comments</span>
                        <span class="comments-badge">${commentCount}</span>
                    </div>
                    <div class="question-comments-list" id="comments-list-${question.id}">
                        ${commentCount > 0 ? questionComments.map(comment => renderQuestionComment(comment)).join('') : '<div class="no-comments-message">No comments yet</div>'}
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render a comment within a question
 */
function renderQuestionComment(comment) {
    const date = comment.timestamp
        ? new Date(comment.timestamp.toDate()).toLocaleString()
        : new Date(comment.createdAt).toLocaleString();

    const voteCount = comment.votes || 0;
    const voteCountClass = voteCount > 0 ? 'positive' : voteCount < 0 ? 'negative' : '';

    return `
        <div class="question-comment-item">
            <div class="question-comment-header">
                <span class="question-comment-author">
                    ${escapeHtml(comment.author)}
                    ${comment.isAnonymous ? '<span class="anonymous-badge">Anonymous</span>' : ''}
                </span>
                <span class="question-comment-date">${date}</span>
            </div>
            <div class="question-comment-text">${escapeHtml(comment.text)}</div>
            <div class="question-comment-actions">
                <span class="comment-vote-info">
                    ▲▼ <span class="vote-count ${voteCountClass}">${voteCount}</span>
                </span>
                <button class="small-delete-btn" onclick="deleteCommentFromQuestion('${comment.id}')">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `;
}

/**
 * Delete a question
 */
async function deleteQuestion(questionId) {
    if (!confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
        return;
    }

    try {
        await deleteDoc(doc(db, 'questions', questionId));

        // Remove from local array
        allQuestions = allQuestions.filter(q => q.id !== questionId);

        // Update display
        updateQuestionStats();
        filterQuestions();

        showNotification('Question deleted successfully', 'success');
    } catch (error) {
        console.error('Error deleting question:', error);
        showNotification('Error deleting question', 'error');
    }
}

/**
 * Filter questions by topic
 */
window.filterQuestionsByTopic = function(topic) {
    currentQuestionFilter = topic;

    // Update active button
    const buttons = document.querySelectorAll('#questions-tab .filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    filterQuestions();
};

/**
 * Filter and display questions based on current filter and search
 */
window.filterQuestions = function() {
    const searchTerm = document.getElementById('question-search-input').value.toLowerCase();

    let filtered = allQuestions;

    // Apply topic filter
    if (currentQuestionFilter !== 'all') {
        filtered = filtered.filter(q => q.topic === currentQuestionFilter);
    }

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(q =>
            q.question.toLowerCase().includes(searchTerm) ||
            (q.explanation && q.explanation.toLowerCase().includes(searchTerm)) ||
            Object.values(q.answers || {}).some(a => a.toLowerCase().includes(searchTerm))
        );
    }

    // Apply sorting
    filtered = applySortToQuestions(filtered);

    displayQuestions(filtered);
};

/**
 * Open edit modal for a question
 */
function openEditModal(questionId) {
    const question = allQuestions.find(q => q.id === questionId);
    if (!question) {
        showNotification('Question not found', 'error');
        return;
    }

    // Store the question being edited
    window.currentEditingQuestion = question;

    // Populate form fields
    document.getElementById('edit-question-id').value = question.id;
    document.getElementById('edit-topic').value = question.topic || 'architect';
    document.getElementById('edit-question-text').value = question.question || '';
    document.getElementById('edit-explanation').value = question.explanation || '';
    document.getElementById('edit-multiselect').checked = question.multiSelect || false;

    // Populate answers
    const answers = question.answers || {};
    document.getElementById('edit-answer-a').value = answers.a || '';
    document.getElementById('edit-answer-b').value = answers.b || '';
    document.getElementById('edit-answer-c').value = answers.c || '';
    document.getElementById('edit-answer-d').value = answers.d || '';
    document.getElementById('edit-answer-e').value = answers.e || '';

    // Populate correct answers
    const correctAnswers = Array.isArray(question.correctAnswer)
        ? question.correctAnswer
        : [question.correctAnswer];

    document.querySelectorAll('input[name="correct-answer"]').forEach(checkbox => {
        checkbox.checked = correctAnswers.includes(checkbox.value);
    });

    // Show modal
    document.getElementById('edit-modal').classList.add('active');
}

/**
 * Close edit modal
 */
window.closeEditModal = function() {
    document.getElementById('edit-modal').classList.remove('active');
    document.getElementById('edit-question-form').reset();
    window.currentEditingQuestion = null;
};

/**
 * Save edited question
 */
window.saveQuestion = async function() {
    if (!db || !window.currentEditingQuestion) {
        return;
    }

    const questionId = document.getElementById('edit-question-id').value;
    const questionText = document.getElementById('edit-question-text').value.trim();
    const explanation = document.getElementById('edit-explanation').value.trim();

    if (!questionText || !explanation) {
        alert('Please fill in all required fields (Question and Explanation)');
        return;
    }

    // Collect answers
    const answers = {};
    const answerLetters = ['a', 'b', 'c', 'd', 'e'];
    answerLetters.forEach(letter => {
        const value = document.getElementById(`edit-answer-${letter}`).value.trim();
        if (value) {
            answers[letter] = value;
        }
    });

    if (Object.keys(answers).length < 2) {
        alert('Please provide at least 2 answer options');
        return;
    }

    // Collect correct answers
    const correctAnswerCheckboxes = document.querySelectorAll('input[name="correct-answer"]:checked');
    if (correctAnswerCheckboxes.length === 0) {
        alert('Please select at least one correct answer');
        return;
    }

    const correctAnswers = Array.from(correctAnswerCheckboxes).map(cb => cb.value);
    const correctAnswer = correctAnswers.length === 1 ? correctAnswers[0] : correctAnswers;

    // Build updated question object
    const updatedQuestion = {
        question: questionText,
        answers: answers,
        correctAnswer: correctAnswer,
        explanation: explanation,
        multiSelect: document.getElementById('edit-multiselect').checked,
        topic: document.getElementById('edit-topic').value,
        updatedAt: new Date().toISOString(),
        // Keep existing fields
        questionNumber: window.currentEditingQuestion.questionNumber,
        createdAt: window.currentEditingQuestion.createdAt
    };

    try {
        // Update in Firebase
        await updateDoc(doc(db, 'questions', questionId), updatedQuestion);

        // Update local array
        const index = allQuestions.findIndex(q => q.id === questionId);
        if (index !== -1) {
            allQuestions[index] = { ...allQuestions[index], ...updatedQuestion };
        }

        // Refresh display
        filterQuestions();

        // Close modal
        closeEditModal();

        showNotification('Question updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating question:', error);
        showNotification('Error updating question: ' + error.message, 'error');
    }
};

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('edit-modal');
    if (event.target === modal) {
        closeEditModal();
    }
};

/**
 * Toggle comments visibility for a question
 */
/**
 * Toggle question expand/collapse
 */
window.toggleQuestionExpand = function(questionId) {
    const questionItem = document.querySelector(`.question-item[data-question-id="${questionId}"]`);
    const expandIcon = document.getElementById(`expand-icon-${questionId}`);
    const detailsSection = document.getElementById(`question-details-${questionId}`);

    if (questionItem && expandIcon && detailsSection) {
        questionItem.classList.toggle('collapsed');
        expandIcon.textContent = questionItem.classList.contains('collapsed') ? '▶' : '▼';
    }
};

window.toggleQuestionComments = function(questionId) {
    const commentsList = document.getElementById(`comments-list-${questionId}`);
    const toggleIcon = document.getElementById(`toggle-icon-${questionId}`);

    if (commentsList && toggleIcon) {
        commentsList.classList.toggle('show');
        toggleIcon.classList.toggle('expanded');
        toggleIcon.textContent = commentsList.classList.contains('show') ? '▼' : '▶';
    }
};

/**
 * Navigate to a specific question in the Questions tab
 */
window.goToQuestion = function(questionHashId) {
    // Switch to Questions tab
    switchTab('questions');

    // Wait a bit for the tab to render, then find and expand the question
    setTimeout(() => {
        // The questionHashId is a hash, so we need to find the actual question by matching
        // Find the question that has this hash ID
        let foundQuestion = null;
        let foundQuestionElement = null;

        // Loop through all questions to find one with matching hash
        for (const question of allQuestions) {
            const questionHash = generateQuestionId(question);
            if (questionHash === questionHashId) {
                foundQuestion = question;
                foundQuestionElement = document.querySelector(`.question-item[data-question-id="${question.id}"]`);
                break;
            }
        }

        if (foundQuestionElement && foundQuestion) {
            // Scroll to the question
            foundQuestionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Expand the question if it's collapsed
            if (foundQuestionElement.classList.contains('collapsed')) {
                const expandIcon = document.getElementById(`expand-icon-${foundQuestion.id}`);
                if (expandIcon) {
                    foundQuestionElement.classList.remove('collapsed');
                    expandIcon.textContent = '▼';
                }
            }

            // Add a highlight effect
            foundQuestionElement.style.transition = 'background-color 0.3s ease';
            foundQuestionElement.style.backgroundColor = 'var(--color-info-bg)';

            setTimeout(() => {
                foundQuestionElement.style.backgroundColor = '';
            }, 2000);
        } else {
            alert('Question not found. It may have been deleted or the ID is incorrect.');
        }
    }, 300);
};

/**
 * Delete a comment from within a question view
 */
window.deleteCommentFromQuestion = async function(commentId) {
    if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
        return;
    }

    try {
        await deleteDoc(doc(db, 'comments', commentId));

        // Remove from local arrays
        allComments = allComments.filter(c => c.id !== commentId);

        // Rebuild comments by question map
        commentsByQuestion = {};
        allComments.forEach(comment => {
            const qId = comment.questionId;
            if (!commentsByQuestion[qId]) {
                commentsByQuestion[qId] = [];
            }
            commentsByQuestion[qId].push(comment);
        });

        // Update comments tab stats
        updateStats();

        // Refresh questions display
        filterQuestions();

        showNotification('Comment deleted successfully', 'success');
    } catch (error) {
        console.error('Error deleting comment:', error);
        showNotification('Error deleting comment', 'error');
    }
};

/**
 * Sort questions based on selected method
 */
window.sortQuestions = function() {
    const sortSelect = document.getElementById('question-sort');
    currentSortMethod = sortSelect ? sortSelect.value : 'number';
    filterQuestions(); // Re-filter and sort
};

/**
 * Apply sorting to questions array
 */
function applySortToQuestions(questions) {
    const sorted = [...questions]; // Create a copy

    switch(currentSortMethod) {
        case 'most-voted':
            // Sort by highest vote count on comments (descending)
            sorted.sort((a, b) => {
                const hashIdA = generateQuestionId(a);
                const hashIdB = generateQuestionId(b);
                const commentsA = commentsByQuestion[hashIdA] || [];
                const commentsB = commentsByQuestion[hashIdB] || [];

                if (commentsA.length === 0 && commentsB.length === 0) return 0;
                if (commentsA.length === 0) return 1; // No comments go to end
                if (commentsB.length === 0) return -1;

                // Get highest vote count for each question
                const maxVotesA = commentsA.reduce((max, comment) => {
                    const upvotes = comment.upvotes || 0;
                    const downvotes = comment.downvotes || 0;
                    const netVotes = upvotes - downvotes;
                    return Math.max(max, netVotes);
                }, 0);

                const maxVotesB = commentsB.reduce((max, comment) => {
                    const upvotes = comment.upvotes || 0;
                    const downvotes = comment.downvotes || 0;
                    const netVotes = upvotes - downvotes;
                    return Math.max(max, netVotes);
                }, 0);

                return maxVotesB - maxVotesA; // Highest votes first
            });
            break;

        case 'latest-comments':
            // Sort by most recent comment date
            sorted.sort((a, b) => {
                const hashIdA = generateQuestionId(a);
                const hashIdB = generateQuestionId(b);
                const commentsA = commentsByQuestion[hashIdA] || [];
                const commentsB = commentsByQuestion[hashIdB] || [];

                if (commentsA.length === 0 && commentsB.length === 0) return 0;
                if (commentsA.length === 0) return 1; // No comments go to end
                if (commentsB.length === 0) return -1;

                // Get most recent comment for each question
                const latestA = commentsA.reduce((latest, comment) => {
                    const dateA = comment.timestamp ? comment.timestamp.toDate() : new Date(comment.createdAt);
                    return dateA > latest ? dateA : latest;
                }, new Date(0));

                const latestB = commentsB.reduce((latest, comment) => {
                    const dateB = comment.timestamp ? comment.timestamp.toDate() : new Date(comment.createdAt);
                    return dateB > latest ? dateB : latest;
                }, new Date(0));

                return latestB - latestA; // Most recent first
            });
            break;

        case 'most-comments':
            // Sort by comment count (descending)
            sorted.sort((a, b) => {
                const hashIdA = generateQuestionId(a);
                const hashIdB = generateQuestionId(b);
                const countA = (commentsByQuestion[hashIdA] || []).length;
                const countB = (commentsByQuestion[hashIdB] || []).length;
                return countB - countA;
            });
            break;

        case 'no-comments':
            // Questions with no comments first
            sorted.sort((a, b) => {
                const hashIdA = generateQuestionId(a);
                const hashIdB = generateQuestionId(b);
                const countA = (commentsByQuestion[hashIdA] || []).length;
                const countB = (commentsByQuestion[hashIdB] || []).length;

                if (countA === 0 && countB === 0) {
                    return (a.questionNumber || 0) - (b.questionNumber || 0);
                }
                if (countA === 0) return -1;
                if (countB === 0) return 1;
                return (a.questionNumber || 0) - (b.questionNumber || 0);
            });
            break;

        case 'recent-updated':
            // Sort by most recently updated
            sorted.sort((a, b) => {
                const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(a.createdAt || 0);
                const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(b.createdAt || 0);
                return dateB - dateA;
            });
            break;

        case 'recent-created':
            // Sort by most recently created
            sorted.sort((a, b) => {
                const dateA = new Date(a.createdAt || 0);
                const dateB = new Date(b.createdAt || 0);
                return dateB - dateA;
            });
            break;

        case 'number':
        default:
            // Sort by question number (default)
            sorted.sort((a, b) => {
                if (a.topic !== b.topic) {
                    return a.topic.localeCompare(b.topic);
                }
                return (a.questionNumber || 0) - (b.questionNumber || 0);
            });
            break;
    }

    return sorted;
}
