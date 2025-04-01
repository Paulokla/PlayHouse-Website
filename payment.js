// Update navigation.js to include the new ticket page
if (typeof changePage !== 'function') {
    // Add ticket page to navigation if not already present
    function changePage(pageId) {
      // Hide all pages
      var pages = ["home", "about", "products", "tickets"];
      for (var i = 0; i < pages.length; i++) {
        var pageElement = document.getElementById(pages[i] + "Page");
        if (pageElement) {
          pageElement.classList.remove("active");
        }
      }
  
      // Show selected page
      var selectedPage = document.getElementById(pageId + "Page");
      if (selectedPage) {
        selectedPage.classList.add("active");
        if (selectedPage.querySelector(".page-content")) {
          selectedPage.querySelector(".page-content").classList.add("animate-entry");
        }
      }
    }
  }
  
  // Payment page functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Variables
    let selectedTicketType = null;
    let selectedTicketPrice = 0;
    let processingFee = 0;
    
    // DOM elements
    const ticketCards = document.querySelectorAll('.ticket-card');
    const ticketTypeDisplay = document.getElementById('ticketTypeDisplay');
    const ticketPriceDisplay = document.getElementById('ticketPriceDisplay');
    const processingFeeElement = document.getElementById('processingFee');
    const totalPriceElement = document.getElementById('totalPrice');
    const termsCheckbox = document.getElementById('terms');
    const submitButton = document.getElementById('submitPayment');
    const paymentForm = document.getElementById('paymentForm');
    
    // Format currency
    function formatCurrency(amount) {
      return '$' + amount.toFixed(2);
    }
    
    // Calculate totals
    function calculateTotals() {
      processingFee = selectedTicketPrice > 0 ? selectedTicketPrice * 0.05 : 0;
      const total = selectedTicketPrice + processingFee;
      
      processingFeeElement.textContent = formatCurrency(processingFee);
      totalPriceElement.textContent = formatCurrency(total);
    }
    
    // Select ticket function
    window.selectTicket = function(ticketType, price) {
      selectedTicketType = ticketType;
      selectedTicketPrice = price;
      
      // Update UI
      ticketCards.forEach(card => {
        if (card.dataset.ticketType === ticketType) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });
      
      // Update summary
      let ticketTypeName = '';
      switch(ticketType) {
        case 'standard':
          ticketTypeName = 'Standard Entry Ticket';
          break;
        case 'vip':
          ticketTypeName = 'VIP Experience Ticket';
          break;
        case 'premium':
          ticketTypeName = 'Premium Package Ticket';
          break;
      }
      
      ticketTypeDisplay.textContent = ticketTypeName;
      ticketPriceDisplay.textContent = formatCurrency(price);
      
      calculateTotals();
      checkFormValidity();
    };
    
    // Form validation
    function checkFormValidity() {
      const requiredFields = document.querySelectorAll('[required]');
      let isValid = true;
      
      // Check if a ticket is selected
      if (!selectedTicketType) {
        isValid = false;
      }
      
      // Check if terms are accepted
      if (!termsCheckbox.checked) {
        isValid = false;
      }
      
      // Enable/disable submit button
      submitButton.disabled = !isValid;
    }
    
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
      cardNumberInput.addEventListener('input', function(e) {
        // Remove non-digits
        let input = this.value.replace(/\D/g, '');
        // Add spaces after every 4 digits
        let formatted = '';
        for (let i = 0; i < input.length; i++) {
          if (i > 0 && i % 4 === 0) {
            formatted += ' ';
          }
          formatted += input[i];
        }
        this.value = formatted;
      });
    }
    
    // Expiry date formatting
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
      expiryDateInput.addEventListener('input', function(e) {
        // Remove non-digits
        let input = this.value.replace(/\D/g, '');
        // Add slash after month
        if (input.length > 2) {
          this.value = input.substring(0, 2) + '/' + input.substring(2, 4);
        } else {
          this.value = input;
        }
      });
    }
    
    // Terms checkbox
    if (termsCheckbox) {
      termsCheckbox.addEventListener('change', checkFormValidity);
    }
    
    // Form submission
    if (paymentForm) {
      paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create an object with all the form data
        const formData = {
          ticketType: selectedTicketType,
          ticketPrice: selectedTicketPrice,
          processingFee: processingFee,
          totalPrice: selectedTicketPrice + processingFee,
          firstName: document.getElementById('firstName').value,
          lastName: document.getElementById('lastName').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          cardName: document.getElementById('cardName').value,
          cardNumber: document.getElementById('cardNumber').value.replace(/\s/g, ''),
          expiryDate: document.getElementById('expiryDate').value,
          cvv: document.getElementById('cvv').value
        };
        
        // Here you would normally send this data to your backend
        console.log('Payment form submitted with data:', formData);
        
        // Show success message (in a real app, this would happen after backend confirmation)
        alert('Thank you for your purchase! Your ticket has been reserved. You will receive a confirmation email shortly.');
        
        // This is where backend would take over for payment processing
        // For now, reset the form for demonstration purposes
        paymentForm.reset();
        ticketCards.forEach(card => card.classList.remove('selected'));
        selectedTicketType = null;
        selectedTicketPrice = 0;
        calculateTotals();
        ticketTypeDisplay.textContent = 'No ticket selected';
        ticketPriceDisplay.textContent = '$0.00';
        submitButton.disabled = true;
      });
    }
  });