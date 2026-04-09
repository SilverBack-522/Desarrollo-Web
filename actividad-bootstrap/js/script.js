
"use strict";

const mainNav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    mainNav.style.borderBottomColor = "rgba(255,255,255,0.10)";
  } else {
    mainNav.style.borderBottomColor = "rgba(255,255,255,0.07)";
  }
});

const btnLogin      = document.getElementById("btnLogin");
const emailInput    = document.getElementById("loginEmail");
const passInput     = document.getElementById("loginPassword");
const emailFeedback = document.getElementById("emailFeedback");
const passFeedback  = document.getElementById("passFeedback");
const loginAlert    = document.getElementById("loginAlert");

function esEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

function mostrarLoginAlert(mensaje, tipo) {
  const iconos = { success: "bi-check-circle-fill", error: "bi-x-circle-fill" };
  loginAlert.className = `alert-custom alert-${tipo}-custom mb-3`;
  loginAlert.innerHTML = `<i class="bi ${iconos[tipo]}"></i> ${mensaje}`;
  loginAlert.classList.remove("d-none");
}

function limpiarFormulario() {
  emailInput.classList.remove("is-invalid", "is-valid");
  passInput.classList.remove("is-invalid", "is-valid");
  loginAlert.classList.add("d-none");
}

emailInput.addEventListener("blur", () => {
  if (!emailInput.value) return;
  if (esEmailValido(emailInput.value)) {
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
  } else {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
  }
});

passInput.addEventListener("blur", () => {
  if (!passInput.value) return;
  if (passInput.value.length >= 6) {
    passInput.classList.remove("is-invalid");
    passInput.classList.add("is-valid");
  } else {
    passInput.classList.add("is-invalid");
    passInput.classList.remove("is-valid");
  }
});

btnLogin.addEventListener("click", () => {
  const email    = emailInput.value.trim();
  const password = passInput.value;
  let hayErrores = false;

  if (!email || !esEmailValido(email)) {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    hayErrores = true;
  } else {
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
  }

  if (!password || password.length < 6) {
    passInput.classList.add("is-invalid");
    passInput.classList.remove("is-valid");
    hayErrores = true;
  } else {
    passInput.classList.remove("is-invalid");
    passInput.classList.add("is-valid");
  }

  if (hayErrores) {
    mostrarLoginAlert("Por favor, corrige los campos marcados.", "error");
    return;
  }

  mostrarLoginAlert("¡Bienvenido! Redirigiendo…", "success");
  btnLogin.disabled = true;
  btnLogin.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Entrando…';

  setTimeout(() => {

    const modalEl  = document.getElementById("loginModal");
    const modalInst = bootstrap.Modal.getInstance(modalEl);
    modalInst.hide();
    mostrarAlertaGlobal(`✅ Sesión iniciada como <strong>${email}</strong>`, "success");


    btnLogin.disabled = false;
    btnLogin.innerHTML = 'Entrar <i class="bi bi-box-arrow-in-right ms-1"></i>';
    limpiarFormulario();
    emailInput.value = "";
    passInput.value  = "";
  }, 1500);
});

const togglePass     = document.getElementById("togglePass");
const togglePassIcon = document.getElementById("togglePassIcon");

togglePass.addEventListener("click", () => {
  const esPassword = passInput.type === "password";
  passInput.type          = esPassword ? "text" : "password";
  togglePassIcon.className = esPassword ? "bi bi-eye-slash" : "bi bi-eye";
});

const alertZone = document.getElementById("dynamicAlertZone");

function mostrarAlertaGlobal(mensaje, tipo = "info", duracion = 5000) {
  const iconos = {
    success : "bi-check-circle-fill",
    error   : "bi-exclamation-triangle-fill",
    info    : "bi-info-circle-fill",
  };

  const div = document.createElement("div");
  div.className = `alert-custom alert-${tipo}-custom`;
  div.innerHTML = `<i class="bi ${iconos[tipo]} flex-shrink-0"></i><span>${mensaje}</span>
    <button type="button" style="margin-left:auto;background:none;border:none;cursor:pointer;color:inherit;font-size:1.1rem;" aria-label="Cerrar">
      <i class="bi bi-x-lg"></i>
    </button>`;

  div.querySelector("button").addEventListener("click", () => {
    div.style.opacity = "0";
    div.style.transition = "opacity .3s";
    setTimeout(() => div.remove(), 320);
  });

  alertZone.appendChild(div);

  if (duracion > 0) {
    setTimeout(() => {
      div.style.opacity = "0";
      div.style.transition = "opacity .4s";
      setTimeout(() => div.remove(), 420);
    }, duracion);
  }
}

const btnAlerta = document.getElementById("btnAlerta");
const mensajes  = [
  { texto: "🎯 Bootstrap acelera tu flujo de trabajo hasta 3×.", tipo: "info"    },
  { texto: "💡 Recuerda usar el sistema de grid de 12 columnas.",   tipo: "info"    },
  { texto: "🚀 Usa clases utilitarias en lugar de CSS repetitivo.", tipo: "success" },
  { texto: "⚠️ Siempre prueba tu diseño en móvil primero.",         tipo: "error"   },
];
let msgIndex = 0;

btnAlerta.addEventListener("click", () => {
  const { texto, tipo } = mensajes[msgIndex % mensajes.length];
  mostrarAlertaGlobal(texto, tipo);
  msgIndex++;
  alertZone.scrollIntoView({ behavior: "smooth", block: "center" });
});

const cardModal = document.getElementById("cardModal");

cardModal.addEventListener("show.bs.modal", (event) => {
  const trigger = event.relatedTarget;
  if (!trigger) return;

  const nombre = trigger.dataset.course || "";
  const desc   = trigger.dataset.desc   || "";
  const icon   = trigger.dataset.icon   || "bi-book";
  const level  = trigger.dataset.level  || "";

  document.getElementById("cardModalLabel").textContent = nombre;
  document.getElementById("modalCourseName").textContent = nombre;
  document.getElementById("modalCourseDesc").textContent = desc;
  document.getElementById("modalCourseLevel").innerHTML  =
    `<span class="badge bg-secondary">${level}</span>`;

  const iconEl   = document.getElementById("modalCourseIcon");
  iconEl.innerHTML = `<i class="bi ${icon}" style="color:var(--accent)"></i>`;
});

document.getElementById("loginModal").addEventListener("hidden.bs.modal", () => {
  limpiarFormulario();
  emailInput.value = "";
  passInput.value  = "";
});

document.getElementById("switchToRegister").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarAlertaGlobal("📝 El registro estará disponible próximamente.", "info");
  bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 80}ms`;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".course-card").forEach((card) => {
  card.style.opacity  = "0";
  card.style.transform = "translateY(24px)";
  card.style.transition = "opacity .5s ease, transform .5s ease";
  observer.observe(card);
});

const styleReveal = document.createElement("style");
styleReveal.textContent = `.course-card.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(styleReveal);
