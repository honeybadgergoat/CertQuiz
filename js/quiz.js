/**
 * Salesforce Data Architect Quiz Application
 */

// Import comments system and Firebase
import { initializeComments } from './comments.js';
import { db } from './firebase-config.js';
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Main quiz state and variables
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let incorrectQuestions = [];
let skippedQuestions = []; // Track skipped questions
let revealedAnswers = [];
let quizQuestions = []; // Will hold the selected questions
let timer;
let timeLeft = 0; // Will be set based on number of questions
let questionCount = 15; // Default question count
let selectedQuizData = null; // Will hold the loaded quiz data
let selectedTopic = null; // 'architect', 'cloud', 'integration', or 'lifecycle'
let useFirebase = true; // Flag to use Firebase or local data

// DOM elements
const topicSelectionContainer = document.getElementById('topic-selection-container');
const topicArchitectBtn = document.getElementById('topic-architect');
const topicCloudBtn = document.getElementById('topic-cloud');
const topicIntegrationBtn = document.getElementById('topic-integration');
const topicLifecycleBtn = document.getElementById('topic-lifecycle');
const setupContainer = document.getElementById('setup-container');
const questionCountInput = document.getElementById('question-count');
const questionCountValue = document.getElementById('question-count-value');
const timeEstimate = document.getElementById('time-estimate');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const multiSelectHintEl = document.getElementById('multi-select-hint');
const submitBtn = document.getElementById('submit-btn');
const skipBtn = document.getElementById('skip-btn');
const navPrevBtn = document.getElementById('nav-prev');
const navNextBtn = document.getElementById('nav-next');
const resultsContainer = document.getElementById('results-container');
let reviewContainer = document.getElementById('review-container');
const progressEl = document.getElementById('quiz-progress');
const answerExplanationEl = document.getElementById('answer-explanation');
const timerDisplay = document.getElementById('timer');
const quizTitleEls = document.querySelectorAll('.app-title');

/**
 * Initialize the app when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    setupTopicSelection();
});

/**
 * Set up the topic selection screen
 */
function setupTopicSelection() {
    // Show topic selection, hide others
    if (topicSelectionContainer) topicSelectionContainer.style.display = 'block';
    if (setupContainer) setupContainer.style.display = 'none';
    if (quizContainer) quizContainer.style.display = 'none';
    if (resultsContainer) resultsContainer.style.display = 'none';
    if (reviewContainer) reviewContainer.style.display = 'none';

    // Add event listeners for topic buttons
    if (topicArchitectBtn) {
        topicArchitectBtn.addEventListener('click', function() {
            selectedTopic = 'architect';
            loadQuizData('architect');
        });
    }
    if (topicCloudBtn) {
        topicCloudBtn.addEventListener('click', function() {
            selectedTopic = 'cloud';
            loadQuizData('cloud');
        });
    }
    if (topicIntegrationBtn) {
        topicIntegrationBtn.addEventListener('click', function() {
            selectedTopic = 'integration';
            loadQuizData('integration');
        });
    }
    if (topicLifecycleBtn) {
        topicLifecycleBtn.addEventListener('click', function() {
            selectedTopic = 'lifecycle';
            loadQuizData('lifecycle');
        });
    }
}


/**
 * Dynamically import the selected quiz data file or load from Firebase
 */
async function loadQuizData(topic) {
    // Show loading state if needed
    if (topicSelectionContainer) topicSelectionContainer.style.display = 'none';
    if (setupContainer) setupContainer.style.display = 'block';
    setupContainer.classList.add('fade-in');

    // Update quiz title for setup screen
    updateQuizTitle(topic);

    // Use topic as-is for Firebase
    let firebaseTopic = topic;

    // Try to load from Firebase first
    if (db && useFirebase) {
        try {
            showLoadingMessage('Loading questions from database...');

            const questionsQuery = query(
                collection(db, 'questions'),
                where('topic', '==', firebaseTopic)
            );
            const snapshot = await getDocs(questionsQuery);

            if (snapshot.size > 0) {
                const questions = [];
                snapshot.forEach(doc => {
                    questions.push(doc.data());
                });

                // Sort by question number
                questions.sort((a, b) => (a.questionNumber || 0) - (b.questionNumber || 0));

                selectedQuizData = questions;
                console.log(`Loaded ${questions.length} questions from Firebase for topic: ${firebaseTopic}`);
                hideLoadingMessage();
                setupQuizConfig();
                return;
            } else {
                console.warn(`No questions found in Firebase for topic: ${firebaseTopic}. Falling back to local data.`);
                useFirebase = false;
            }
        } catch (error) {
            console.error('Error loading questions from Firebase:', error);
            console.log('Falling back to local quiz data files...');
            useFirebase = false;
        }
    }

    // Fallback: Load from local files
    hideLoadingMessage();
    showLoadingMessage('Loading questions from local files...');

    let importPromise;
    if (topic === 'architect') {
        importPromise = import('../data/quiz-data.js');
    } else if (topic === 'cloud') {
        importPromise = import('../data/quiz-data-cloud.js');
    } else if (topic === 'integration') {
        importPromise = import('../data/quiz-integration.js');
    } else if (topic === 'lifecycle') {
        importPromise = import('../data/quiz-development-lifecycle-and-deployment.js');
    }

    importPromise.then(module => {
        selectedQuizData = module.quizData;
        console.log(`Loaded ${selectedQuizData.length} questions from local files`);
        hideLoadingMessage();
        setupQuizConfig();
    }).catch(error => {
        console.error('Error loading local quiz data:', error);
        hideLoadingMessage();
        alert('Error loading quiz questions. Please refresh the page and try again.');
    });
}

/**
 * Show loading message
 */
function showLoadingMessage(message) {
    if (setupContainer) {
        const existingMsg = setupContainer.querySelector('.loading-message');
        if (existingMsg) {
            existingMsg.textContent = message;
        } else {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading-message';
            loadingDiv.style.cssText = 'text-align: center; padding: 20px; color: #667eea; font-weight: 600;';
            loadingDiv.textContent = message;
            setupContainer.insertBefore(loadingDiv, setupContainer.firstChild);
        }
    }
}

/**
 * Hide loading message
 */
function hideLoadingMessage() {
    if (setupContainer) {
        const loadingMsg = setupContainer.querySelector('.loading-message');
        if (loadingMsg) {
            loadingMsg.remove();
        }
    }
}

/**
 * Update the quiz title based on selected topic
 */
function updateQuizTitle(topic) {
    let title = 'Salesforce Quiz';
    const currentTopic = topic || selectedTopic;
    
    if (currentTopic === 'architect') {
        title = 'Salesforce <span>Data Architect</span> Quiz';
    } else if (currentTopic === 'cloud') {
        title = 'Salesforce <span>Data Cloud</span> Quiz';
    } else if (currentTopic === 'integration') {
        title = 'Salesforce <span>Integration</span> Quiz';
    } else if (currentTopic === 'lifecycle') {
        title = 'Salesforce <span>Development Lifecycle & Deployment</span> Quiz';
    }
    quizTitleEls.forEach(el => {
        el.innerHTML = title;
    });
}

/**
 * Set up the quiz configuration screen
 */
function setupQuizConfig() {
    // Set up slider for question count
    if (questionCountInput && questionCountValue) {
        // Set initial value
        questionCountValue.textContent = questionCountInput.value;
        
        // Update time estimate (1 minute per question)
        updateTimeEstimate(questionCountInput.value);
        
        // Update when slider changes
        questionCountInput.addEventListener('input', function() {
            questionCountValue.textContent = this.value;
            updateTimeEstimate(this.value);
        });
    }
    
    // Set up start quiz button
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            // Get selected question count
            questionCount = parseInt(questionCountInput.value, 10);
            
            // Hide setup screen
            setupContainer.style.display = 'none';
            
            // Initialize and show quiz
            initializeQuiz();
        });
    }
}

/**
 * Update the time estimate based on question count
 */
function updateTimeEstimate(count) {
    if (timeEstimate) {
        // Calculate time (approximately 1 minute per question)
        const estimatedMinutes = Math.max(Math.round(count * 1), 1);
        timeEstimate.textContent = estimatedMinutes;
    }
}

/**
 * Set up the quiz interface and load the first question
 */
function initializeQuiz() {
    // Select random questions from the selected quiz data based on user's selection
    quizQuestions = getRandomQuestions(selectedQuizData, questionCount);
    
    // Reset state variables
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = Array(quizQuestions.length).fill([]);
    incorrectQuestions = [];
    skippedQuestions = [];
    revealedAnswers = Array(quizQuestions.length).fill(false);
    
    // Set timer based on question count (approximately 2 minutes per question)
    timeLeft = questionCount * 120;
    
    // Show the quiz container, hide results and review
    quizContainer.style.display = 'block';
    quizContainer.classList.add('fade-in');
    resultsContainer.style.display = 'none';
    if (reviewContainer) reviewContainer.style.display = 'none';
    
    // Set up event listeners for navigation buttons
    if (navPrevBtn) {
        navPrevBtn.addEventListener('click', navigateToPrevQuestion);
        navPrevBtn.disabled = true; // Disable on first question
    }
    
    if (navNextBtn) {
        navNextBtn.addEventListener('click', navigateToNextQuestion);
        updateNavButtons();
    }
    
    // Set up submit button as a reveal toggle
    submitBtn.textContent = "Reveal Answer";
    submitBtn.addEventListener('click', toggleAnswerReveal);
    submitBtn.disabled = false; // Always enable the reveal button
    
    // Set up skip button
    if (skipBtn) {
        skipBtn.addEventListener('click', skipQuestion);
    }
    
    // Update quiz title for quiz screen
    updateQuizTitle();
    
    // Start the timer
    startTimer();
    
    // Load the first question
    loadQuestion();
}

/**
 * Load the current question into the UI
 */
function loadQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const currentQuestionData = quizQuestions[currentQuestionIndex];
        
        // Update question text
        questionEl.innerText = `Q${currentQuestionIndex + 1}: ${currentQuestionData.question}`;
        
        // Show/hide multi-select hint and add required selections count
        if (multiSelectHintEl) {
            if (currentQuestionData.multiSelect) {
                const correctAnswers = Array.isArray(currentQuestionData.correctAnswer) ? 
                    currentQuestionData.correctAnswer : [currentQuestionData.correctAnswer];
                multiSelectHintEl.innerHTML = `This question allows multiple selections. Select all that apply. <span id="required-selections">(${correctAnswers.length} correct options)</span>`;
                multiSelectHintEl.style.display = 'block';
            } else {
                multiSelectHintEl.style.display = 'none';
            }
        }
        
        // Update progress indicator
        if (progressEl) {
            progressEl.innerText = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
        }
        
        // Clear previous answers
        answersEl.innerHTML = '';
        
        // Sort answer keys to keep them in order (A, B, C, D, E)
        const answerKeys = Object.keys(currentQuestionData.answers).sort();
        const inputType = currentQuestionData.multiSelect ? 'checkbox' : 'radio';
        
        // Create answer elements
        answerKeys.forEach(key => {
            const li = document.createElement('li');
            const uniqueId = `answer-${currentQuestionIndex}-${key}`;
            
            const input = document.createElement('input');
            input.type = inputType;
            input.id = uniqueId;
            input.name = `question-${currentQuestionIndex}`;
            input.value = key;
            
            // If this is a previously answered question, check the appropriate options
            if (userAnswers[currentQuestionIndex].includes(key)) {
                input.checked = true;
                li.classList.add('selected');
            }
            
            // Add change event to enable submit button and toggle selected class
            input.addEventListener('change', () => {
                // Handle selected state for the list item
                if (input.checked) {
                    li.classList.add('selected');
                } else {
                    li.classList.remove('selected');
                }
                
                // Save user's selection immediately
                saveUserAnswer();
                // Check if required number of answers is selected
                updateButtonStatesForRequiredAnswers();
            });
            
            const label = document.createElement('label');
            label.htmlFor = uniqueId;
            label.textContent = `${key.toUpperCase()}. ${currentQuestionData.answers[key]}`;
            
            li.appendChild(input);
            li.appendChild(label);
            
            // Make the whole li clickable
            li.addEventListener('click', (e) => {
                // Avoid double-triggering if label or input is clicked directly
                if (e.target !== input && e.target !== label) {
                    // Toggle the input based on its type
                    if (inputType === 'radio') {
                        // For radio buttons, uncheck all others first
                        document.querySelectorAll(`input[name="question-${currentQuestionIndex}"]`)
                            .forEach(radio => {
                                radio.checked = false;
                                radio.closest('li').classList.remove('selected');
                            });
                        input.checked = true;
                    } else {
                        // For checkboxes, just toggle the current one
                        input.checked = !input.checked;
                    }
                    
                    // Update the selected class
                    li.classList.toggle('selected', input.checked);
                    
                    // Save user's selection immediately
                    saveUserAnswer();
                    // Check if required number of answers is selected
                    updateButtonStatesForRequiredAnswers();
                }
            });
            
            // If the answer is revealed, add appropriate classes
            if (revealedAnswers[currentQuestionIndex]) {
                markAnswerCorrectness(li, key, currentQuestionData);
            }
            
            answersEl.appendChild(li);
        });
        
        // Update nav button state
        updateNavButtons();
        
        // Update the answer explanation display
        updateAnswerExplanation();
        
        // Update the submit button text based on if answers are revealed
        updateSubmitButtonText();
        
        // Add fade-in animation
        questionContainer.classList.remove('fade-in');
        void questionContainer.offsetWidth; // Trigger reflow
        questionContainer.classList.add('fade-in');

        // Check if required number of answers is selected (initial state)
        updateButtonStatesForRequiredAnswers();

        // Initialize comments for this question
        const questionId = generateQuestionId(currentQuestionData);
        initializeComments(questionId);
    } else {
        // Should not happen if called correctly
        showResults();
    }
}

/**
 * Save the user's current answer selections
 */
function saveUserAnswer() {
    const selectedInputs = document.querySelectorAll(`input[name="question-${currentQuestionIndex}"]:checked`);
    const selectedAnswers = Array.from(selectedInputs).map(input => input.value);
    userAnswers[currentQuestionIndex] = selectedAnswers;
}

/**
 * Mark the correctness of an answer in the UI
 */
function markAnswerCorrectness(li, key, questionData) {
    const correctAnswers = Array.isArray(questionData.correctAnswer) 
        ? questionData.correctAnswer 
        : [questionData.correctAnswer];
    const userSelectedAnswers = userAnswers[currentQuestionIndex];
    
    li.classList.remove('correct', 'incorrect', 'user-selected');
    
    // Check if this option was selected by user
    const wasSelected = userSelectedAnswers.includes(key);
    
    // Check if this option is correct
    const isCorrect = correctAnswers.includes(key);
    
    if (wasSelected) {
        li.classList.add('user-selected');
        
        if (isCorrect) {
            // User selected a correct answer
            li.classList.add('correct');
        } else {
            // User selected an incorrect answer
            li.classList.add('incorrect');
        }
    } else if (isCorrect) {
        // This is a correct answer that user didn't select
        li.classList.add('correct');
    }
}

/**
 * Update the submit button text based on if answers are revealed
 */
function updateSubmitButtonText() {
    if (revealedAnswers[currentQuestionIndex]) {
        submitBtn.textContent = "Hide Answer";
        submitBtn.classList.add('reveal-active');
    } else {
        submitBtn.textContent = "Reveal Answer";
        submitBtn.classList.remove('reveal-active');
    }
}

/**
 * Update answer explanation display
 */
function updateAnswerExplanation() {
    if (revealedAnswers[currentQuestionIndex]) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        if (currentQuestion.explanation) {
            answerExplanationEl.innerHTML = `<strong>Explanation:</strong> ${currentQuestion.explanation}`;
            answerExplanationEl.classList.add('visible');
        } else {
            answerExplanationEl.classList.remove('visible');
        }
    } else {
        answerExplanationEl.classList.remove('visible');
    }
}

/**
 * Update navigation buttons state based on current question index
 */
function updateNavButtons() {
    if (navPrevBtn) {
        navPrevBtn.disabled = currentQuestionIndex === 0;
    }
    
    if (navNextBtn) {
        // On the final question, change the text of the next button to indicate it will finish the quiz
        if (currentQuestionIndex === quizQuestions.length - 1) {
            navNextBtn.textContent = "Submit Quiz";
            navNextBtn.classList.add('submit-quiz');
        } else {
            navNextBtn.textContent = "Next";
            navNextBtn.classList.remove('submit-quiz');
        }
        navNextBtn.disabled = false; // Always enabled to allow submitting
    }
}

/**
 * Navigate to the previous question
 */
function navigateToPrevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

/**
 * Navigate to the next question or show results on the final question
 */
function navigateToNextQuestion() {
    // Save user's answer for the current question before moving on
    saveUserAnswer();
    
    // Check if this question should be marked as incorrect
    checkAnswerCorrectness();
    
    // If this is the final question, show results
    if (currentQuestionIndex === quizQuestions.length - 1) {
        showResults();
    } 
    // Otherwise move to the next question
    else if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

/**
 * Skip the current question (for incomplete questions)
 */
function skipQuestion() {
    // Mark this question as skipped
    if (!skippedQuestions.includes(currentQuestionIndex)) {
        skippedQuestions.push(currentQuestionIndex);
    }
    
    // Remove from incorrect questions if it was there
    if (incorrectQuestions.includes(currentQuestionIndex)) {
        incorrectQuestions = incorrectQuestions.filter(idx => idx !== currentQuestionIndex);
    }
    
    // If this is the final question, show results
    if (currentQuestionIndex === quizQuestions.length - 1) {
        showResults();
    } 
    // Otherwise move to the next question
    else if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

/**
 * Toggle revealing the answer
 */
function toggleAnswerReveal() {
    // Save user's current selections
    saveUserAnswer();
    
    // Toggle reveal state
    revealedAnswers[currentQuestionIndex] = !revealedAnswers[currentQuestionIndex];
    
    // Update UI to show correct/incorrect answers
    const answerItems = document.querySelectorAll(`#answers li`);
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    if (revealedAnswers[currentQuestionIndex]) {
        // Mark answers as correct/incorrect
        answerItems.forEach(li => {
            const input = li.querySelector('input');
            const key = input.value;
            markAnswerCorrectness(li, key, currentQuestion);
        });
    } else {
        // Remove correct/incorrect classes
        answerItems.forEach(li => {
            const input = li.querySelector('input');
            const key = input.value;
            
            li.classList.remove('correct', 'incorrect');
            
            // Keep the selected class if this answer was selected
            if (userAnswers[currentQuestionIndex].includes(key)) {
                li.classList.add('selected');
            } else {
                li.classList.remove('selected');
            }
        });
    }
    
    // Update explanation
    updateAnswerExplanation();
    
    // Update submit button text
    updateSubmitButtonText();
    
    // Check answer correctness when revealing
    if (revealedAnswers[currentQuestionIndex]) {
        checkAnswerCorrectness();
    }
}

/**
 * Check if the user's answer is correct and update score/incorrect questions
 */
function checkAnswerCorrectness() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const selectedAnswers = userAnswers[currentQuestionIndex];
    const correctAnswers = Array.isArray(currentQuestion.correctAnswer) 
        ? currentQuestion.correctAnswer 
        : [currentQuestion.correctAnswer];
    
    let isCorrect = false;
    
    // For multi-select: all correct options must be selected, and no incorrect options
    if (currentQuestion.multiSelect) {
        const hasAllCorrect = correctAnswers.every(answer => selectedAnswers.includes(answer));
        const hasNoIncorrect = selectedAnswers.every(answer => correctAnswers.includes(answer));
        isCorrect = hasAllCorrect && hasNoIncorrect;
    } 
    // For single-select: the one selected answer must match the correct one
    else {
        isCorrect = selectedAnswers.length === 1 && correctAnswers.includes(selectedAnswers[0]);
    }
    
    // If the answer is incorrect and not already in incorrectQuestions, add it
    if (!isCorrect && !incorrectQuestions.includes(currentQuestionIndex)) {
        incorrectQuestions.push(currentQuestionIndex);
    } 
    // If the answer is correct and was previously marked incorrect, remove it from incorrectQuestions
    else if (isCorrect && incorrectQuestions.includes(currentQuestionIndex)) {
        incorrectQuestions = incorrectQuestions.filter(idx => idx !== currentQuestionIndex);
    }
}

/**
 * Show the results screen
 */
function showResults() {
    // Stop the timer
    clearInterval(timer);
    
    // Calculate total answered questions (excluding skipped)
    const totalAnswered = quizQuestions.length - skippedQuestions.length;
    
    // Recalculate score based on incorrectQuestions (excluding skipped)
    const incorrectAnswered = incorrectQuestions.filter(idx => !skippedQuestions.includes(idx));
    score = totalAnswered - incorrectAnswered.length;
    
    // Hide quiz container and show results
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    resultsContainer.classList.add('fade-in');
    if (reviewContainer) reviewContainer.style.display = 'none';
    
    // Calculate percentage (only from answered questions)
    const percentage = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
    
    // Build results HTML
    let resultHTML = `
        <h2>Quiz Complete!</h2>
        <div class="score-circle">
            <span class="score-value">${percentage}%</span>
        </div>
        <p class="score-display">You answered ${score} out of ${totalAnswered} questions correctly.</p>
    `;
    
    // Show skipped questions count if any
    if (skippedQuestions.length > 0) {
        resultHTML += `<p class="skipped-info" style="color: #6c757d; font-style: italic;">${skippedQuestions.length} question(s) skipped</p>`;
    }
    
    // Add feedback based on score
    if (percentage >= 80) {
        resultHTML += `<p style="color: green; font-weight: bold;">Excellent work! You have a strong understanding of Salesforce Data Architecture principles.</p>`;
    } else if (percentage >= 60) {
        resultHTML += `<p style="color: orange;">Good effort! Continue studying to strengthen your knowledge of Salesforce Data Architecture.</p>`;
    } else {
        resultHTML += `<p style="color: #dc3545;">Keep studying! Review the core concepts of Salesforce Data Architecture to improve your understanding.</p>`;
    }
    
    // Add buttons
    resultHTML += `
        <div class="results-buttons">
            <button class="retry-btn" id="retry-btn">Retry Quiz</button>
            <button class="review-btn" id="review-btn">Review All Questions</button>
        </div>
    `;
    
    resultsContainer.innerHTML = resultHTML;
    
    // Add event listeners to buttons
    document.getElementById('retry-btn').addEventListener('click', () => {
        // Return to setup screen instead of reloading the page
        resultsContainer.style.display = 'none';
        setupContainer.style.display = 'block';
        setupContainer.classList.add('fade-in');
    });
    
    document.getElementById('review-btn').addEventListener('click', showReview);
}

/**
 * Show the review screen for all questions
 */
function showReview() {
    // Hide other containers and show review
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
    
    // Create review container if it doesn't exist
    if (!reviewContainer) {
        reviewContainer = document.createElement('div');
        reviewContainer.id = 'review-container';
        document.body.appendChild(reviewContainer);
    }
    
    reviewContainer.style.display = 'block';
    reviewContainer.classList.add('fade-in');
    
    // Build HTML for review
    let reviewHTML = `
        <h2>Review of All Questions</h2>
    `;
    
    // First show skipped questions
    if (skippedQuestions.length > 0) {
        reviewHTML += `<h3>Skipped Questions (${skippedQuestions.length}):</h3>`;
        
        skippedQuestions.forEach(questionIndex => {
            reviewHTML += buildReviewQuestionHTML(questionIndex, true);
        });
    }
    
    // Then show incorrect questions (excluding skipped)
    const incorrectAnswered = incorrectQuestions.filter(idx => !skippedQuestions.includes(idx));
    if (incorrectAnswered.length > 0) {
        reviewHTML += `<h3>Incorrect Answers (${incorrectAnswered.length}):</h3>`;
        
        incorrectAnswered.forEach(questionIndex => {
            reviewHTML += buildReviewQuestionHTML(questionIndex);
        });
    }
    
    // Then show correct questions
    const correctQuestions = [];
    for (let i = 0; i < quizQuestions.length; i++) {
        if (!incorrectQuestions.includes(i) && !skippedQuestions.includes(i)) {
            correctQuestions.push(i);
        }
    }
    
    if (correctQuestions.length > 0) {
        reviewHTML += `<h3>Correct Answers (${correctQuestions.length}):</h3>`;
        
        correctQuestions.forEach(questionIndex => {
            reviewHTML += buildReviewQuestionHTML(questionIndex);
        });
    }
    
    // Add buttons to go back to results or retry quiz
    reviewHTML += `
        <div class="results-buttons">
            <button class="nav-btn" id="back-to-results">Back to Results</button>
            <button class="retry-btn" id="retry-from-review">Setup New Quiz</button>
        </div>
    `;
    
    reviewContainer.innerHTML = reviewHTML;
    
    // Add event listeners to buttons
    document.getElementById('back-to-results').addEventListener('click', () => {
        reviewContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        resultsContainer.classList.add('fade-in');
    });
    
    document.getElementById('retry-from-review').addEventListener('click', () => {
        reviewContainer.style.display = 'none';
        setupContainer.style.display = 'block';
        setupContainer.classList.add('fade-in');
    });
}

/**
 * Build HTML for a review question
 */
function buildReviewQuestionHTML(questionIndex, isSkipped = false) {
    const question = quizQuestions[questionIndex];
    let html = `
        <div class="review-question ${isSkipped ? 'skipped-question' : ''}">
            <h3>Question ${questionIndex + 1} ${isSkipped ? '<span style="color: #6c757d;">(Skipped)</span>' : ''}</h3>
            <p>${question.question}</p>
    `;
    
    // Add indicator for the number of correct selections required
    if (question.multiSelect) {
        const correctAnswers = Array.isArray(question.correctAnswer) ? 
            question.correctAnswer : [question.correctAnswer];
        html += `<p><em>This question required ${correctAnswers.length} correct selections.</em></p>`;
    }
    
    html += `<div class="review-answers">`;
    
    // Get the correct answers from the question data
    const correctAnswers = Array.isArray(question.correctAnswer) ? 
        question.correctAnswer : [question.correctAnswer];
    const userSelectedAnswers = userAnswers[questionIndex] || [];
    
    // Show all answer options in alphabetical order for review
    Object.keys(question.answers).sort().forEach(key => {
        const isCorrect = correctAnswers.includes(key);
        const wasSelected = userSelectedAnswers.includes(key);
        
        let classes = [];
        if (isCorrect) classes.push('correct');
        if (wasSelected && !isCorrect) classes.push('incorrect');
        if (wasSelected) classes.push('user-selected');
        
        html += `
            <div class="review-answer ${classes.join(' ')}">
                ${key.toUpperCase()}. ${question.answers[key]}
                ${isCorrect ? ' ✓' : ''}
                ${wasSelected && !isCorrect ? ' ✗' : ''}
            </div>
        `;
    });
    
    // Add explanation
    if (question.explanation) {
        html += `
            <div class="explanation">
                <strong>Explanation:</strong> ${question.explanation}
            </div>
        `;
    }
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

/**
 * Function to randomly select questions
 */
function getRandomQuestions(allQuestions, count) {
    // Remove duplicate questions based on question text
    const uniqueQuestions = [];
    const seenQuestions = new Set();
    
    for (const q of allQuestions) {
        const questionText = q.question.trim().toLowerCase();
        if (!seenQuestions.has(questionText)) {
            seenQuestions.add(questionText);
            uniqueQuestions.push(q);
        }
    }
    
    // Ensure count is within bounds
    count = Math.min(Math.max(count, 1), uniqueQuestions.length);
    
    // Clone the array to avoid modifying the original
    const questions = [...uniqueQuestions];
    
    // Shuffle using Fisher-Yates algorithm
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    
    // Return the first 'count' questions
    return questions.slice(0, count);
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Generate a unique ID for a question based on its content
 * This ensures comments are tied to the actual question, not its position
 */
function generateQuestionId(questionData) {
    // Create a hash from the question text for a consistent ID
    const questionText = questionData.question.trim();
    let hash = 0;
    for (let i = 0; i < questionText.length; i++) {
        const char = questionText.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    // Include topic in the ID to differentiate same questions across topics
    return `${selectedTopic}_q_${Math.abs(hash)}`;
}

/**
 * Start the timer
 */
function startTimer() {
    clearInterval(timer); // Clear any existing timer
    
    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        if (timerDisplay) {
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResults();
        } else {
            timeLeft--;
        }
    }, 1000);
}

/**
 * Enable/disable Reveal Answer and Next buttons based on required selections
 */
function updateButtonStatesForRequiredAnswers() {
    const currentQuestionData = quizQuestions[currentQuestionIndex];
    const selected = userAnswers[currentQuestionIndex] || [];
    let required = 1;
    if (currentQuestionData.multiSelect) {
        required = Array.isArray(currentQuestionData.correctAnswer)
            ? currentQuestionData.correctAnswer.length : 1;
    }
    
    // Only enable if exactly the required number of answers is selected
    const enable = selected.length === required;
    
    // Only allow reveal if not already revealed and has required selections
    if (!revealedAnswers[currentQuestionIndex]) {
        submitBtn.disabled = !enable;
        
        // For the last question, always enable the "Submit Quiz" button if answers are selected
        if (currentQuestionIndex === quizQuestions.length - 1) {
            navNextBtn.disabled = !enable;
        } else {
            // For other questions, enable "Next" if required selections are made
            navNextBtn.disabled = !enable;
        }
    } else {
        // If revealed, allow navigation
        submitBtn.disabled = false;
        navNextBtn.disabled = false;
    }
}

// Export public functions if needed
export { initializeQuiz };