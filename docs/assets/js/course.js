/* =============================================================
   OHDSI / OMOP Train-the-Trainer — course interactions

   Two things live here:

   1. Self-check quizzes  — <div class="quiz" data-answer="b">
   2. Lab progress        — task-list checkboxes remembered per page

   Both degrade gracefully: with JavaScript off, quizzes read as a
   question with its options and explanation, and checklists are
   still checklists.
   ============================================================= */

(function () {
  "use strict";

  var STORE_PREFIX = "ttt:v1:";

  /* Storage may be unavailable (private mode, blocked cookies).
     Fail quiet rather than breaking the page. */
  var store = (function () {
    try {
      var probe = STORE_PREFIX + "probe";
      window.localStorage.setItem(probe, "1");
      window.localStorage.removeItem(probe);
      return window.localStorage;
    } catch (e) {
      return null;
    }
  })();

  function keyFor(suffix) {
    return STORE_PREFIX + window.location.pathname + ":" + suffix;
  }

  /* -----------------------------------------------------------
     1. Self-check quizzes
     ----------------------------------------------------------- */

  function initQuizzes() {
    var quizzes = document.querySelectorAll(".quiz");

    Array.prototype.forEach.call(quizzes, function (quiz, qi) {
      var options = quiz.querySelectorAll(".quiz__opts li");
      if (!options.length) return;

      Array.prototype.forEach.call(options, function (option) {
        option.setAttribute("role", "button");
        option.setAttribute("tabindex", "0");

        function choose() {
          if (quiz.classList.contains("is-answered")) return;
          quiz.classList.add("is-answered");

          Array.prototype.forEach.call(options, function (other) {
            var right = other.getAttribute("data-correct") === "true";
            /* Mark every correct option, and the wrong one they picked.
               Unpicked wrong options stay neutral so the page does not
               turn into a wall of red. */
            if (right) {
              other.classList.add("is-right");
            } else if (other === option) {
              other.classList.add("is-wrong");
            }
            other.removeAttribute("tabindex");
            other.setAttribute("aria-disabled", "true");
          });

          var why = quiz.querySelector(".quiz__why");
          if (why) why.setAttribute("aria-live", "polite");

          if (store) {
            var picked = Array.prototype.indexOf.call(options, option);
            try {
              store.setItem(keyFor("quiz:" + qi), String(picked));
            } catch (e) { /* quota — ignore */ }
          }
        }

        option.addEventListener("click", choose);
        option.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            choose();
          }
        });
      });

      /* Restore a previous answer so a reload does not wipe the result. */
      if (store) {
        var saved = store.getItem(keyFor("quiz:" + qi));
        if (saved !== null && options[Number(saved)]) {
          options[Number(saved)].click();
        }
      }
    });
  }

  /* -----------------------------------------------------------
     2. Lab progress
     ----------------------------------------------------------- */

  function initProgress() {
    var widget = document.querySelector(".lab-progress");
    if (!widget) return;

    var article = document.querySelector(".md-content article") || document;
    var boxes = article.querySelectorAll(
      ".task-list-item input[type='checkbox']"
    );
    if (!boxes.length) {
      widget.style.display = "none";
      return;
    }

    widget.innerHTML =
      '<span class="lab-progress__count">0 / ' + boxes.length + "</span>" +
      '<span class="lab-progress__bar">' +
      '<span class="lab-progress__fill"></span></span>' +
      '<button type="button" class="lab-progress__reset">Reset</button>';

    var fill = widget.querySelector(".lab-progress__fill");
    var count = widget.querySelector(".lab-progress__count");
    var reset = widget.querySelector(".lab-progress__reset");

    var bar = widget.querySelector(".lab-progress__bar");
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", String(boxes.length));

    function render() {
      var done = 0;
      Array.prototype.forEach.call(boxes, function (box) {
        var item = box.closest(".task-list-item");
        if (box.checked) {
          done++;
          if (item) item.classList.add("is-done");
        } else if (item) {
          item.classList.remove("is-done");
        }
      });

      fill.style.width = (done / boxes.length) * 100 + "%";
      count.textContent = done + " / " + boxes.length;
      bar.setAttribute("aria-valuenow", String(done));
      widget.classList.toggle("is-complete", done === boxes.length);
    }

    Array.prototype.forEach.call(boxes, function (box, index) {
      box.removeAttribute("disabled");

      if (store) {
        var saved = store.getItem(keyFor("task:" + index));
        if (saved === "1") box.checked = true;
      }

      box.addEventListener("change", function () {
        if (store) {
          try {
            store.setItem(keyFor("task:" + index), box.checked ? "1" : "0");
          } catch (e) { /* quota — ignore */ }
        }
        render();
      });
    });

    reset.addEventListener("click", function () {
      Array.prototype.forEach.call(boxes, function (box, index) {
        box.checked = false;
        if (store) store.removeItem(keyFor("task:" + index));
      });
      render();
    });

    render();
  }

  function boot() {
    initQuizzes();
    initProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
