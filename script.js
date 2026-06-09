const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const quizQuestions = [
  {
    question: 'Who is this learning hub intended for?',
    options: ['Patients preparing for induction of labour', 'Healthcare professionals', 'General public media', 'Hospital finance teams only'],
    answer: 1,
    feedback: 'The page is intended for healthcare professionals.'
  },
  {
    question: 'Which description best reflects DILAPAN-S?',
    options: ['A pharmacological prostaglandin insert', 'A mechanical hygroscopic cervical dilator', 'An oxytocin infusion', 'A balloon catheter'],
    answer: 1,
    feedback: 'DILAPAN-S is a hygroscopic cervical dilator used for mechanical cervical ripening and dilation.'
  },
  {
    question: 'What material forms the dilating part of DILAPAN-S?',
    options: ['Hydrogel', 'Latex', 'Cotton', 'Silicone balloon membrane'],
    answer: 0,
    feedback: 'The dilating part is made from hydrogel.'
  },
  {
    question: 'What is the primary mechanism of action?',
    options: ['It absorbs moisture and gradually expands', 'It releases oxytocin', 'It releases prostaglandins', 'It mechanically inflates after insertion'],
    answer: 0,
    feedback: 'DILAPAN-S absorbs moisture and gradually increases in diameter.'
  },
  {
    question: 'Which document should always be checked for full procedural instructions?',
    options: ['A social media post', 'The current country-specific Instructions for Use', 'A patient story', 'A conference abstract only'],
    answer: 1,
    feedback: 'The current country-specific IFU and local hospital protocol are essential.'
  },
  {
    question: 'Which topic belongs in the evidence section of this learning hub?',
    options: ['Hair care', 'Outpatient cervical ripening', 'General nutrition', 'Paediatric vaccination'],
    answer: 1,
    feedback: 'Outpatient cervical ripening is one of the planned evidence topics.'
  },
  {
    question: 'In this e-learning, VBAC content should be interpreted within:',
    options: ['Local guidance and clinical judgement', 'A universal rule for every patient', 'Patient preference only', 'Marketing claims only'],
    answer: 0,
    feedback: 'VBAC-related content must be interpreted within local guidance, clinical judgement and IFU requirements.'
  },
  {
    question: 'Which wording is preferable for compliant product education?',
    options: ['The safest induction method', 'A mechanical cervical ripening option', 'Guaranteed painless induction', 'Risk-free labour induction'],
    answer: 1,
    feedback: 'Avoid overclaiming. “A mechanical cervical ripening option” is more appropriate.'
  },
  {
    question: 'What should users do after reviewing insertion videos?',
    options: ['Use the video instead of the IFU', 'Check the IFU and local hospital protocol', 'Ignore local requirements', 'Use any number of rods they prefer'],
    answer: 1,
    feedback: 'Videos support training but do not replace the IFU or local protocol.'
  },
  {
    question: 'What does the test result represent?',
    options: ['A formal clinical certification', 'An educational knowledge check', 'Permission to ignore local training', 'Regulatory approval'],
    answer: 1,
    feedback: 'This is an educational knowledge check, not a formal certification unless a validated process is added.'
  }
];

const quizContainer = document.getElementById('quiz-questions');
const quizForm = document.getElementById('quiz-form');
const resultBox = document.getElementById('quiz-result');
const resetButton = document.getElementById('reset-quiz');

function renderQuiz() {
  if (!quizContainer) return;
  quizContainer.innerHTML = quizQuestions.map((item, index) => {
    const options = item.options.map((option, optionIndex) => `
      <label>
        <input type="radio" name="q${index}" value="${optionIndex}" required />
        <span>${option}</span>
      </label>
    `).join('');

    return `
      <fieldset class="quiz-question">
        <legend>${index + 1}. ${item.question}</legend>
        <div class="quiz-options">${options}</div>
      </fieldset>
    `;
  }).join('');
}

function evaluateQuiz(event) {
  event.preventDefault();
  if (!quizForm || !resultBox) return;

  let score = 0;
  const missed = [];

  quizQuestions.forEach((item, index) => {
    const selected = quizForm.querySelector(`input[name="q${index}"]:checked`);
    if (selected && Number(selected.value) === item.answer) {
      score += 1;
    } else {
      missed.push(`<li><strong>Question ${index + 1}:</strong> ${item.feedback}</li>`);
    }
  });

  const percent = Math.round((score / quizQuestions.length) * 100);
  const status = score === quizQuestions.length
    ? 'All answers are correct.'
    : 'Review the points below and retake the test when ready.';

  resultBox.hidden = false;
  resultBox.innerHTML = `
    <h3>Your result: ${score}/${quizQuestions.length} correct (${percent}%)</h3>
    <p><strong>${status}</strong></p>
    ${missed.length ? `<ul>${missed.join('')}</ul>` : ''}
  `;
  resultBox.scrollIntoView({ behaviour: 'smooth', block: 'start' });
}

function resetQuiz() {
  quizForm?.reset();
  if (resultBox) {
    resultBox.hidden = true;
    resultBox.innerHTML = '';
  }
}

renderQuiz();
quizForm?.addEventListener('submit', evaluateQuiz);
resetButton?.addEventListener('click', resetQuiz);
