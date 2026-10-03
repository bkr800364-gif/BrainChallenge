"use strict";

/* =========================================
   تحدّي العقل - محرك اللعبة
   ========================================= */

const TOTAL_LEVELS = 15;
const STORAGE_KEY = "brainChallengeSaveV1";

const questions = [
  {
    category: "ألغاز منطقية",
    icon: "🔍",
    title: "ما الشيء الذي كلما أخذت منه كَبُر؟",
    description: "فكّر جيدًا قبل اختيار الإجابة.",
    options: ["الجبل", "الحفرة", "الكتاب", "الشجرة"],
    answer: 1,
    hint: "قد تجده في الأرض عندما تحفر.",
    explanation: "الحفرة تكبر كلما أخذت منها التراب.",
  },
  {
    category: "حساب ذهني",
    icon: "🔢",
    title: "ما ناتج العملية التالية؟",
    description: "8 × 3 − 4 = ؟",
    options: ["20", "24", "28", "16"],
    answer: 0,
    hint: "اضرب 8 في 3 أولًا، ثم اطرح 4.",
    explanation: "8 × 3 = 24، ثم 24 − 4 = 20.",
  },
  {
    category: "ذكاء وملاحظة",
    icon: "🐑",
    title: "لدى مزارع 10 أغنام، هربت كلها ما عدا 3. كم بقي؟",
    description: "انتبه إلى صياغة السؤال.",
    options: ["7 أغنام", "3 أغنام", "10 أغنام", "لا شيء"],
    answer: 1,
    hint: "السؤال يقول: كلها ما عدا 3.",
    explanation: "بقيت 3 أغنام؛ لأن بقية الأغنام هربت.",
  },
  {
    category: "أنماط الأرقام",
    icon: "🧩",
    title: "ما الرقم التالي في السلسلة؟",
    description: "2، 4، 8، 16، ؟",
    options: ["20", "24", "30", "32"],
    answer: 3,
    hint: "كل رقم يساوي الرقم السابق مضروبًا في 2.",
    explanation: "نضاعف 16 فنحصل على 32.",
  },
  {
    category: "ألغاز منطقية",
    icon: "🕰️",
    title: "كم شهرًا في السنة يحتوي على 28 يومًا؟",
    description: "لا تتسرع في الإجابة.",
    options: ["شهر واحد", "شهران", "6 أشهر", "كل الشهور"],
    answer: 3,
    hint: "فكّر في الحد الأدنى للأيام الموجودة في كل شهر.",
    explanation: "كل شهور السنة تحتوي على اليوم الثامن والعشرين.",
  },
  {
    category: "حساب ذهني",
    icon: "🍎",
    title: "معك 12 تفاحة، أعطيت صديقك 4 وأكلت 2. كم بقي؟",
    description: "احسب ما تبقى معك.",
    options: ["8", "6", "10", "4"],
    answer: 1,
    hint: "اطرح 4 ثم اطرح 2 من العدد 12.",
    explanation: "12 − 4 − 2 = 6 تفاحات.",
  },
  {
    category: "ذكاء وملاحظة",
    icon: "🔠",
    title: "أي كلمة لا تنتمي إلى المجموعة؟",
    description: "قلم، كتاب، دفتر، موز",
    options: ["قلم", "كتاب", "دفتر", "موز"],
    answer: 3,
    hint: "ثلاثة أشياء تُستخدم في الدراسة.",
    explanation: "الموز فاكهة، أما بقية الكلمات فأدوات دراسية.",
  },
  {
    category: "أنماط الأرقام",
    icon: "📈",
    title: "ما الرقم الناقص؟",
    description: "3، 6، 9، 12، ؟",
    options: ["13", "14", "15", "18"],
    answer: 2,
    hint: "أضف 3 إلى كل رقم للحصول على الرقم التالي.",
    explanation: "12 + 3 = 15.",
  },
  {
    category: "ألغاز منطقية",
    icon: "🌧️",
    title: "شيء ينزل من السماء ولا يصعد إليها؟",
    description: "اختر الإجابة الأنسب.",
    options: ["الطائر", "المطر", "الدخان", "البالون"],
    answer: 1,
    hint: "نراه كثيرًا في الأيام الممطرة.",
    explanation: "الإجابة المقصودة هي المطر.",
  },
  {
    category: "حساب ذهني",
    icon: "🧮",
    title: "إذا كان نصف العدد 18، فما العدد كاملًا؟",
    description: "اعكس عملية القسمة على 2.",
    options: ["9", "24", "36", "40"],
    answer: 2,
    hint: "اضرب 18 في 2.",
    explanation: "18 × 2 = 36.",
  },
  {
    category: "ذكاء وملاحظة",
    icon: "🐓",
    title: "إذا وضعت بيضة في الماء، ماذا يحدث لها؟",
    description: "السؤال عن البيضة العادية دون افتراضات إضافية.",
    options: ["تتحول إلى حجر", "تذوب", "تبقى بيضة", "تصبح سمكة"],
    answer: 2,
    hint: "الماء وحده لا يغير نوع الشيء.",
    explanation: "تظل البيضة بيضة، وقد تطفو أو تغرق حسب ظروفها.",
  },
  {
    category: "أنماط الأرقام",
    icon: "🔺",
    title: "ما العدد التالي؟",
    description: "1، 4، 9، 16، ؟",
    options: ["20", "24", "25", "36"],
    answer: 2,
    hint: "هذه الأعداد ناتجة عن ضرب العدد في نفسه.",
    explanation: "1²، 2²، 3²، 4²، ثم 5² = 25.",
  },
  {
    category: "ألغاز منطقية",
    icon: "🚪",
    title: "له أسنان كثيرة لكنه لا يعض، فما هو؟",
    description: "فكّر في شيء تستخدمه يوميًا.",
    options: ["المشط", "الأسد", "السمكة", "القطة"],
    answer: 0,
    hint: "نستخدمه لترتيب الشعر.",
    explanation: "المشط له أسنان لكنه لا يعض.",
  },
  {
    category: "حساب ذهني",
    icon: "⏱️",
    title: "كم دقيقة في ساعتين ونصف؟",
    description: "الساعة تحتوي على 60 دقيقة.",
    options: ["120", "130", "150", "180"],
    answer: 2,
    hint: "ساعتان = 120 دقيقة، أضف نصف ساعة.",
    explanation: "120 + 30 = 150 دقيقة.",
  },
  {
    category: "التحدي النهائي",
    icon: "🏆",
    title: "ما العدد الذي إذا ضربته في نفسه كان الناتج 81؟",
    description: "اختر العدد الموجب الصحيح.",
    options: ["7", "8", "9", "10"],
    answer: 2,
    hint: "9 × 9 = ؟",
    explanation: "9 × 9 = 81. مبروك! لقد وصلت إلى نهاية التحدي.",
  },
];

const levelIcons = [
  "🔍",
  "🔢",
  "🐑",
  "🧩",
  "🕰️",
  "🍎",
  "🔠",
  "📈",
  "🌧️",
  "🧮",
  "🐓",
  "🔺",
  "🚪",
  "⏱️",
  "🏆",
];

const $ = (id) => document.getElementById(id);

function loadSave() {
  const defaults = {
    points: 0,
    unlockedLevel: 1,
    completedLevels: [],
    hintsUsed: [],
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const saved = JSON.parse(raw);

    return {
      points:
        Number.isFinite(saved.points) && saved.points >= 0
          ? Math.floor(saved.points)
          : 0,
      unlockedLevel: Number.isInteger(saved.unlockedLevel)
        ? Math.min(TOTAL_LEVELS, Math.max(1, saved.unlockedLevel))
        : 1,
      completedLevels: Array.isArray(saved.completedLevels)
        ? saved.completedLevels.filter(
            (n) => Number.isInteger(n) && n >= 1 && n <= TOTAL_LEVELS,
          )
        : [],
      hintsUsed: Array.isArray(saved.hintsUsed)
        ? saved.hintsUsed.filter(
            (n) => Number.isInteger(n) && n >= 1 && n <= TOTAL_LEVELS,
          )
        : [],
    };
  } catch (error) {
    console.warn("تعذر قراءة الحفظ السابق:", error);
    return defaults;
  }
}

let saveData = loadSave();
let currentLevel = 1;
let answered = false;
let selectedAnswer = null;
let hintShown = false;
let soundEnabled = false;
let audioContext = null;
let toastTimer = null;

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
  } catch (error) {
    showToast("تعذر حفظ التقدم. تحقق من إعدادات المتصفح.");
  }
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function playTone(success) {
  if (!soundEnabled) return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    audioContext = audioContext || new AudioContextClass();

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = success ? 660 : 220;
    gain.gain.setValueAtTime(0.07, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.18,
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.18);
  } catch (error) {
    console.warn("الصوت غير متاح في هذا المتصفح.");
  }
}

function renderStats() {
  const completedCount = new Set(saveData.completedLevels).size;
  const unlockedCount = saveData.unlockedLevel;

  $("headerPoints").textContent = saveData.points;
  $("pointsStat").textContent = saveData.points;
  $("completedStat").textContent = completedCount;
  $("unlockedStat").textContent = unlockedCount;
  $("gamePoints").textContent = saveData.points;
  $("levelsCount").textContent = `${completedCount} / ${TOTAL_LEVELS}`;

  const progress = (completedCount / TOTAL_LEVELS) * 100;
  $("overallProgress").style.width = `${progress}%`;

  renderLevelMap();
}

function renderLevelMap() {
  const grid = $("levelsGrid");
  grid.replaceChildren();

  questions.forEach((question, index) => {
    const level = index + 1;
    const completed = saveData.completedLevels.includes(level);
    const unlocked = level <= saveData.unlockedLevel;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "level-card";

    if (completed) {
      button.classList.add("completed");
    } else if (unlocked) {
      button.classList.add("available");
    } else {
      button.classList.add("locked");
    }

    if (level === saveData.unlockedLevel && !completed) {
      button.classList.add("current");
    }

    button.disabled = !unlocked;
    button.setAttribute(
      "aria-label",
      unlocked
        ? `المرحلة ${level}: ${question.category}`
        : `المرحلة ${level} مقفلة`,
    );

    const icon = document.createElement("span");
    icon.className = "level-emoji";
    icon.textContent = completed ? "✅" : unlocked ? levelIcons[index] : "🔒";

    const name = document.createElement("span");
    name.className = "level-name";
    name.textContent = `المرحلة ${String(level).padStart(2, "0")}`;

    const status = document.createElement("span");
    status.className = "level-status";
    status.textContent = completed ? "مكتملة" : unlocked ? "متاحة" : "مقفلة";

    button.append(icon, name, status);

    button.addEventListener("click", () => {
      if (unlocked) startLevel(level);
    });

    grid.appendChild(button);
  });
}

function startLevel(level) {
  if (level < 1 || level > TOTAL_LEVELS) return;

  if (level > saveData.unlockedLevel) {
    showToast("أكمل المراحل السابقة لفتح هذه المرحلة.");
    return;
  }

  currentLevel = level;
  answered = false;
  selectedAnswer = null;
  hintShown = saveData.hintsUsed.includes(level);

  const question = questions[currentLevel - 1];

  $("levelNumber").textContent = currentLevel;
  $("questionNumber").textContent =
    `السؤال ${String(currentLevel).padStart(2, "0")}`;
  $("questionCategory").textContent = `🧩 ${question.category}`;
  $("questionIllustration").textContent = question.icon;
  $("questionTitle").textContent = question.title;
  $("questionDescription").textContent = question.description;

  $("levelProgress").style.width =
    `${((currentLevel - 1) / TOTAL_LEVELS) * 100}%`;

  $("feedbackMessage").hidden = true;
  $("feedbackMessage").textContent = "";
  $("feedbackMessage").className = "feedback-message";
  $("nextButton").hidden = true;
  $("nextButtonText").textContent =
    currentLevel === TOTAL_LEVELS ? "إنهاء التحدّي" : "المرحلة التالية";

  $("hintText").hidden = true;
  $("hintText").textContent = "";
  $("hintButton").disabled = hintShown;
  $("hintButton").innerHTML = hintShown
    ? "💡 تم استخدام التلميح"
    : '💡 تلميح <span id="hintCost">− 2 نقطة</span>';

  renderAnswers(question);
  renderStats();
  showScreen("gameScreen");
}

function renderAnswers(question) {
  const grid = $("answersGrid");
  grid.replaceChildren();

  const letters = ["أ", "ب", "ج", "د"];

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";

    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = letters[index];

    const text = document.createElement("span");
    text.textContent = option;

    button.append(letter, text);
    button.addEventListener("click", () => chooseAnswer(index));
    grid.appendChild(button);
  });
}

function chooseAnswer(index) {
  if (answered) return;

  answered = true;
  selectedAnswer = index;

  const question = questions[currentLevel - 1];
  const correct = index === question.answer;
  const alreadyCompleted = saveData.completedLevels.includes(currentLevel);

  const answerButtons = $("answersGrid").querySelectorAll(".answer-button");

  answerButtons.forEach((button, buttonIndex) => {
    button.disabled = true;

    if (buttonIndex === question.answer) {
      button.classList.add("correct");
    } else if (buttonIndex === index && !correct) {
      button.classList.add("wrong");
    }
  });

  const feedback = $("feedbackMessage");
  feedback.hidden = false;
  feedback.className = `feedback-message ${correct ? "success" : "error"}`;

  if (correct) {
    if (!alreadyCompleted) {
      saveData.points += 10;
    }

    feedback.textContent = alreadyCompleted
      ? `✅ إجابة صحيحة! ${question.explanation} لقد أكملت هذه المرحلة سابقًا، لذا لن تُضاف نقاط جديدة.`
      : `🎉 إجابة صحيحة! حصلت على 10 نقاط. ${question.explanation}`;
  } else {
    feedback.textContent = `💡 ليست الإجابة الصحيحة. ${question.explanation}`;
  }

  if (!alreadyCompleted) {
    saveData.completedLevels.push(currentLevel);
  }

  saveData.unlockedLevel = Math.min(
    TOTAL_LEVELS,
    Math.max(saveData.unlockedLevel, currentLevel + 1),
  );

  saveProgress();
  renderStats();
  playTone(correct);

  $("nextButton").hidden = false;
  $("nextButtonText").textContent =
    currentLevel === TOTAL_LEVELS ? "عرض النتيجة النهائية" : "المرحلة التالية";
}

function useHint() {
  if (hintShown) {
    showToast("لقد استخدمت التلميح في هذه المرحلة.");
    return;
  }

  if (answered) {
    showToast("استخدم التلميح قبل اختيار الإجابة.");
    return;
  }

  if (saveData.points < 2) {
    showToast("تحتاج إلى نقطتين لاستخدام التلميح.");
    return;
  }

  saveData.points -= 2;
  saveData.hintsUsed.push(currentLevel);
  hintShown = true;

  $("hintText").textContent = `💡 ${questions[currentLevel - 1].hint}`;
  $("hintText").hidden = false;
  $("hintButton").disabled = true;
  $("hintButton").textContent = "💡 تم استخدام التلميح";

  saveProgress();
  renderStats();
  showToast("تم خصم نقطتين وإظهار التلميح.");
}

function nextLevel() {
  if (!answered) return;

  if (currentLevel >= TOTAL_LEVELS) {
    showFinishScreen();
    return;
  }

  startLevel(currentLevel + 1);
}

function showFinishScreen() {
  const completedCount = new Set(saveData.completedLevels).size;

  $("finishIcon").textContent = completedCount === TOTAL_LEVELS ? "🏆" : "🎉";

  $("finishTitle").textContent =
    completedCount === TOTAL_LEVELS ? "بطل تحدّي العقل!" : "إنجاز رائع!";

  $("finishDescription").textContent =
    completedCount === TOTAL_LEVELS
      ? "لقد أكملت جميع المراحل الخمس عشرة. هل تستطيع تحسين نتيجتك؟"
      : "أنهيت المرحلة الأخيرة. يمكنك إعادة المراحل لتحسين أدائك.";

  $("finalPoints").textContent = saveData.points;
  $("finalCompleted").textContent = completedCount;

  showScreen("finishScreen");
}

function goHome() {
  renderStats();
  showScreen("homeScreen");
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  $("soundButton").textContent = soundEnabled ? "🔊" : "🔇";
  $("soundButton").title = soundEnabled ? "تعطيل الصوت" : "تفعيل الصوت";

  showToast(soundEnabled ? "تم تفعيل المؤثرات الصوتية." : "تم تعطيل الصوت.");

  if (soundEnabled) playTone(true);
}

function resetProgress() {
  const confirmed = window.confirm(
    "هل أنت متأكد من حذف جميع النقاط والمراحل المحفوظة؟ لا يمكن التراجع عن هذا الإجراء.",
  );

  if (!confirmed) return;

  saveData = {
    points: 0,
    unlockedLevel: 1,
    completedLevels: [],
    hintsUsed: [],
  };

  currentLevel = 1;
  answered = false;
  selectedAnswer = null;
  hintShown = false;

  saveProgress();
  renderStats();
  goHome();
  showToast("تمت إعادة اللعبة من البداية.");
}

/* ربط الأزرار */
$("startButton").addEventListener("click", () => {
  startLevel(saveData.unlockedLevel);
});

$("brandHome").addEventListener("click", (event) => {
  event.preventDefault();
  goHome();
});

$("backButton").addEventListener("click", goHome);
$("hintButton").addEventListener("click", useHint);
$("nextButton").addEventListener("click", nextLevel);
$("soundButton").addEventListener("click", toggleSound);
$("replayButton").addEventListener("click", goHome);

$("retryButton").addEventListener("click", () => {
  startLevel(currentLevel);
});

/* إضافة خيار إعادة التقدم من خلال ضغط Ctrl + Shift + R داخل اللعبة */
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "r") {
    event.preventDefault();
    resetProgress();
  }
});

/* بدء تشغيل اللعبة */
renderStats();
