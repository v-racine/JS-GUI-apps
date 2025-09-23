const languages = [
  {
    name: "Ruby",
    blurb:
      "Ruby is a dynamic, reflective, object-oriented, general-purpose programming language. It was designed and developed in t...",
    description:
      "Ruby is a dynamic, reflective, object-oriented, " +
      "general-purpose programming language. It was designed and developed in the mid-1990s " +
      "by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, " +
      "Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, " +
      "including functional, object-oriented, and imperative. It also has a dynamic type " +
      "system and automatic memory management.",
  },

  {
    name: "JavaScript",
    blurb:
      "JavaScript is a high-level, dynamic, untyped, and interpreted programming language. It has been standardized in the ECMA...",
    description:
      "JavaScript is a high-level, dynamic, untyped, and interpreted " +
      "programming language. It has been standardized in the ECMAScript language " +
      "specification. Alongside HTML and CSS, JavaScript is one of the three core " +
      "technologies of World Wide Web content production; the majority of websites employ " +
      "it, and all modern Web browsers support it without the need for plug-ins. JavaScript " +
      "is prototype-based with first-class functions, making it a multi-paradigm language, " +
      "supporting object-oriented, imperative, and functional programming styles.",
  },

  {
    name: "Lisp",
    blurb:
      "Lisp (historically, LISP) is a family of computer programming languages with a long history and a distinctive, fully par...",
    description:
      "Lisp (historically, LISP) is a family of computer programming languages " +
      "with a long history and a distinctive, fully parenthesized prefix notation. " +
      "Originally specified in 1958, Lisp is the second-oldest high-level programming " +
      "language in widespread use today. Only Fortran is older, by one year. Lisp has changed " +
      "since its early days, and many dialects have existed over its history. Today, the best " +
      "known general-purpose Lisp dialects are Common Lisp and Scheme.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const langs = document.querySelectorAll(".lang");
  let paragraph;

  langs.forEach((lang, ind) => {
    lang.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.tagName === "A" && e.target.className === "more") {
        paragraph = e.target.previousElementSibling;
        paragraph.textContent = languages[ind].description;

        e.target.classList.remove("more");
        e.target.classList.add("less");

        e.target.innerText = "Show Less";
      } else if (e.target.tagName === "A" && e.target.className === "less") {
        paragraph = e.target.previousElementSibling;
        paragraph.textContent = languages[ind].blurb;

        e.target.classList.remove("less");
        e.target.classList.add("more");

        e.target.innerText = "Show More";
      }
    });
  });
});
