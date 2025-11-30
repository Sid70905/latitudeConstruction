'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * SMOOTH SCROLL FOR NAVBAR LINKS
 */

const navLinks = document.querySelectorAll(".navbar-link");

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
}

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    if (this.getAttribute("href").startsWith("#")) {
      closeNavbar();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  });
});



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});


/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function(currentSlider) {

  const sldierContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sldierContainer.style.transform = `translateX(-${sldierContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */

  const slideNext = function () {
    const slideEnd = currentSlidePos >= sldierContainer.childElementCount - 1;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */

   const slidePrev = function () {

    if (currentSlidePos <= 0) {
      currentSlidePos = sldierContainer.childElementCount - 1;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = sldierContainer.childElementCount <= 1;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }



/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = accordions[0];

const initAccordion = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  const expandAccordion = function () {
    if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
      lastActiveAccordion.classList.remove("expanded");
    }

    currentAccordion.classList.toggle("expanded");

    lastActiveAccordion = currentAccordion;
  }

  accordionBtn.addEventListener("click", expandAccordion);

}

for (let i = 0, len = accordions.length; i < len; i++) { initAccordion(accordions[i]); }


/**
 * COST CALCULATOR
 */

const landArea = document.getElementById("landArea");
const roadWidth = document.getElementById("roadWidth");
const floors = document.getElementById("floors");
const packageSelect = document.getElementById("package");
const downPaymentSelect = document.getElementById("downPayment");
const interestRate = document.getElementById("interestRate");
const loanTenure = document.getElementById("loanTenure");

const calculateCost = function() {
  if (!landArea.value || !roadWidth.value || !floors.value || !packageSelect.value || !loanTenure.value || !downPaymentSelect.value || !interestRate.value) {
    return;
  }

  const land = parseFloat(landArea.value);
  const road = parseFloat(roadWidth.value);
  const floorValue = parseFloat(floors.value);
  const packagePrice = parseFloat(packageSelect.value);
  const downPaymentPercent = parseFloat(downPaymentSelect.value);
  const interest = parseFloat(interestRate.value);
  const tenure = parseFloat(loanTenure.value);

  // Calculate Built-up Area
  const tba = land * floorValue * 0.85;
  document.getElementById("builtUpArea").textContent = Math.round(tba).toLocaleString();

  // Calculate Project Cost
  const projectCost = tba * packagePrice;
  document.getElementById("projectCost").textContent = "₹ " + Math.round(projectCost).toLocaleString();

  // Calculate Down Payment
  const downPaymentAmount = projectCost * downPaymentPercent;
  document.getElementById("downPaymentAmount").textContent = "₹ " + Math.round(downPaymentAmount).toLocaleString();

  // Calculate Loan Amount
  const loanAmount = projectCost - downPaymentAmount;
  document.getElementById("loanAmount").textContent = "₹ " + Math.round(loanAmount).toLocaleString();

  // Calculate EMI
  const monthlyInterest = interest / 12 / 100;
  const months = tenure * 12;
  const result1 = Math.pow(1 + monthlyInterest, months);
  const result2 = result1 - 1;
  const result3 = result1 / result2;
  const emi = loanAmount * monthlyInterest * result3;
  document.getElementById("emiAmount").textContent = "₹ " + Math.round(emi).toLocaleString();

  // Calculate Total Interest
  const totalInterest = (emi * months) - loanAmount;
  document.getElementById("totalInterest").textContent = "₹ " + Math.round(totalInterest).toLocaleString();

  // Calculate Total Amount
  const totalAmount = emi * months;
  document.getElementById("totalAmount").textContent = "₹ " + Math.round(totalAmount).toLocaleString();
};

// Add event listeners for calculator
if (landArea) landArea.addEventListener("input", calculateCost);
if (roadWidth) roadWidth.addEventListener("change", calculateCost);
if (floors) floors.addEventListener("change", calculateCost);
if (packageSelect) packageSelect.addEventListener("change", calculateCost);
if (downPaymentSelect) downPaymentSelect.addEventListener("change", calculateCost);
if (interestRate) interestRate.addEventListener("input", calculateCost);
if (loanTenure) loanTenure.addEventListener("change", calculateCost);

// Initial calculation
calculateCost();

// Handle consultation call buttons: scroll to contact then open phone dialer
const callButtons = document.querySelectorAll('[data-action="call"]');
callButtons.forEach(btn => {
  btn.addEventListener('click', function(e){
    e.preventDefault();
    const tel = this.getAttribute('data-call');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // open dialer after a short delay so user sees the contact section
    setTimeout(() => {
      if (tel) window.location.href = `tel:${tel}`;
    }, 700);
  });
});

// Make contact-card links close navbar on click (mobile)
const contactCardLinks = document.querySelectorAll('.contact-card-link');
contactCardLinks.forEach(link => {
  link.addEventListener('click', function(){
    closeNavbar();
  });
});

/**
 * QUOTE FORM - EMAIL FUNCTIONALITY
 */

// Initialize EmailJS with your public key
emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

// Get quote modal elements
const quoteModal = document.getElementById('quoteModal');
const getQuoteBtn = document.getElementById('getQuoteBtn');
const modalClose = document.getElementById('modalClose');
const quoteForm = document.getElementById('quoteForm');

// Function to get all calculator values
const getCalculatorData = function() {
  return {
    landArea: document.getElementById('landArea').value,
    roadWidth: document.getElementById('roadWidth').value,
    floors: document.getElementById('floors').value,
    package: document.getElementById('package').value,
    interestRate: document.getElementById('interestRate').value,
    loanTenure: document.getElementById('loanTenure').value,
    downPayment: document.getElementById('downPayment').value,
    builtUpArea: document.getElementById('builtUpArea').textContent,
    projectCost: document.getElementById('projectCost').textContent,
    downPaymentAmount: document.getElementById('downPaymentAmount').textContent,
    loanAmount: document.getElementById('loanAmount').textContent,
    emiAmount: document.getElementById('emiAmount').textContent,
    totalInterest: document.getElementById('totalInterest').textContent,
    totalAmount: document.getElementById('totalAmount').textContent
  };
};

// Open modal on Get Detailed Quote button click
if (getQuoteBtn) {
  getQuoteBtn.addEventListener('click', function() {
    quoteModal.classList.add('active');
  });
}

// Close modal on X click
if (modalClose) {
  modalClose.addEventListener('click', function() {
    quoteModal.classList.remove('active');
  });
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
  if (event.target == quoteModal) {
    quoteModal.classList.remove('active');
  }
});

// Handle quote form submission
if (quoteForm) {
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get customer details
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerCity = document.getElementById('customerCity').value;
    const customerLocation = document.getElementById('customerLocation').value;

    // Get calculator data
    const calcData = getCalculatorData();

    // Format email body with all details
    const emailContent = `
New Quote Request from Latitude Construction Website

CUSTOMER DETAILS:
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
City: ${customerCity}
Preferred Location: ${customerLocation || 'Not specified'}

CALCULATOR DETAILS:
Land Area: ${calcData.landArea} SFT
Road Width: ${calcData.roadWidth}
Number of Floors: ${calcData.floors}
Package Selected: ${calcData.package}
Interest Rate: ${calcData.interestRate}%
Loan Tenure: ${calcData.loanTenure} Years
Down Payment: ${calcData.downPayment}

COST BREAKDOWN:
Built-up Area: ${calcData.builtUpArea} SFT
Project Cost: ${calcData.projectCost}
Down Payment Amount: ${calcData.downPaymentAmount}
Loan Amount: ${calcData.loanAmount}
Monthly EMI: ${calcData.emiAmount}
Total Interest: ${calcData.totalInterest}
Total Amount: ${calcData.totalAmount}

Please follow up with this customer at the earliest.

Regards,
Latitude Construction Website
    `;

    // Send email using EmailJS
    const templateParams = {
      from_name: customerName,
      from_email: customerEmail,
      customer_phone: customerPhone,
      customer_city: customerCity,
      customer_location: customerLocation || 'Not specified',
      land_area: calcData.landArea,
      package: calcData.package,
      emi_amount: calcData.emiAmount,
      total_amount: calcData.totalAmount,
      message: emailContent,
      to_email: EMAIL_CONFIG.COMPANY_EMAIL
    };

    // Show loading state
    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Send email
    emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATES.QUOTE_NOTIFICATION, templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        // Show success message
        alert('Quote request submitted successfully! We will email you the details shortly.');
        
        // Also send confirmation email to customer
        const customerTemplateParams = {
          to_email: customerEmail,
          customer_name: customerName,
          emi_amount: calcData.emiAmount,
          total_amount: calcData.totalAmount
        };
        
        return emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATES.CUSTOMER_CONFIRMATION, customerTemplateParams);
      })
      .then(function(response) {
        console.log('Confirmation email sent to customer!', response.status);
        
        // Reset form and close modal
        quoteForm.reset();
        quoteModal.classList.remove('active');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      })
      .catch(function(error) {
        console.log('FAILED...', error);
        alert('Error sending quote. Please try again or contact us directly at +91 96061 25333');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      });
  });
}