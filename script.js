document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('surveyForm');
    const messageDiv = document.getElementById('message');
    const submitBtn = form.querySelector('.submit-btn');

    // Form validation function
    function validateForm(formData) {
        const errors = [];
        
        // Check if all required fields are filled
        if (!formData.userName.trim()) {
            errors.push('UserName is required');
        }
        
        if (!formData.email.trim()) {
            errors.push('Email is required');
        } else if (!isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.employeeId.trim()) {
            errors.push('Employee ID is required');
        }
        
        if (!formData.tower) {
            errors.push('Please select your tower');
        }
        
        if (!formData.problem) {
            errors.push('Please select a problem type');
        }
        
        if (!formData.businessBenefit.trim()) {
            errors.push('Business Benefit is required');
        }
        
        if (!formData.justification.trim()) {
            errors.push('Justification/UseCase is required');
        }
        
        return errors;
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show message function
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }

    // Collect form data function
    function collectFormData() {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Add timestamp
        data.submissionTime = new Date().toISOString();
        
        return data;
    }

    // Submit form function
    async function submitForm(formData) {
        try {
            // Determine the server URL based on environment
            const serverUrl = window.location.hostname === 'localhost' || 
                            window.location.hostname === '127.0.0.1' || 
                            window.location.protocol === 'file:'
                ? 'http://localhost:5000'
                : window.location.origin;
            
            const response = await fetch(`${serverUrl}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(result.message || 'AI Solution request submitted successfully!', 'success');
                form.reset(); // Clear the form
            } else {
                throw new Error(result.error || 'Submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                const serverUrl = window.location.hostname === 'localhost' || 
                                window.location.hostname === '127.0.0.1' || 
                                window.location.protocol === 'file:'
                    ? 'http://localhost:5000'
                    : window.location.origin;
                showMessage(`Unable to connect to server. Please make sure the Flask server is running on ${serverUrl}`, 'error');
            } else {
                showMessage(`Error: ${error.message}`, 'error');
            }
        }
    }

    // Form submit event listener
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = collectFormData();
        
        // Validate form
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            showMessage(`Please fix the following errors:\n• ${errors.join('\n• ')}`, 'error');
            return;
        }

        // Disable submit button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        showMessage('Submitting your AI solution request...', 'loading');

        try {
            await submitForm(formData);
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Request';
        }
    });

    // Add real-time validation feedback
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Remove any existing error styling
            this.style.borderColor = '';
            
            // Basic validation feedback
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#dc3545';
            } else if (this.value) {
                this.style.borderColor = '#28a745';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
    });

    // Add character counter for justification textarea
    const justificationTextarea = document.getElementById('justification');
    const charCounter = document.createElement('div');
    charCounter.style.cssText = 'text-align: right; font-size: 0.9em; color: #666; margin-top: 5px;';
    justificationTextarea.parentNode.appendChild(charCounter);

    justificationTextarea.addEventListener('input', function() {
        const maxLength = 1000;
        const currentLength = this.value.length;
        charCounter.textContent = `${currentLength}/${maxLength} characters`;
        
        if (currentLength > maxLength) {
            charCounter.style.color = '#dc3545';
            this.style.borderColor = '#dc3545';
        } else {
            charCounter.style.color = '#666';
            this.style.borderColor = '';
        }
    });

    // Initialize character counter
    justificationTextarea.dispatchEvent(new Event('input'));

    // Add character counter for business benefit textarea
    const businessBenefitTextarea = document.getElementById('businessBenefit');
    const charCounter2 = document.createElement('div');
    charCounter2.style.cssText = 'text-align: right; font-size: 0.9em; color: #666; margin-top: 5px;';
    businessBenefitTextarea.parentNode.appendChild(charCounter2);

    businessBenefitTextarea.addEventListener('input', function() {
        const maxLength = 1000;
        const currentLength = this.value.length;
        charCounter2.textContent = `${currentLength}/${maxLength} characters`;
        
        if (currentLength > maxLength) {
            charCounter2.style.color = '#dc3545';
            this.style.borderColor = '#dc3545';
        } else {
            charCounter2.style.color = '#666';
            this.style.borderColor = '';
        }
    });

    // Initialize character counter
    businessBenefitTextarea.dispatchEvent(new Event('input'));
});
