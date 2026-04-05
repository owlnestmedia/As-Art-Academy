document.addEventListener('DOMContentLoaded', () => {
    // Initialize Scroll Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    }

    // Mobile Menu
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
                header.style.background = 'rgba(10, 10, 12, 0.95)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(10, 10, 12, 0.8)';
            }
        });
    }

    // Location Tabs Toggle (Crucial for dual address view)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const locationPanes = document.querySelectorAll('.location-pane');

    if (tabBtns.length > 0 && locationPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                // Hide all and reset active state
                tabBtns.forEach(b => b.classList.remove('active'));
                locationPanes.forEach(p => p.classList.remove('active'));

                // Activate clicked
                btn.classList.add('active');

                // Show pane
                const targetPane = document.getElementById(`pane-${targetTab}`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // WhatsApp AI Chat Logic
    const waChatBtn = document.getElementById('waChatBtn');
    const waChatPanel = document.getElementById('waChatPanel');
    const waCloseBtn = document.getElementById('waCloseBtn');
    const waSendBtn = document.getElementById('waSendBtn');
    const waChatInput = document.getElementById('waChatInput');
    const waChatBody = document.getElementById('waChatBody');

    if (waChatBtn && waChatPanel) {
        waChatBtn.addEventListener('click', () => {
            waChatPanel.classList.toggle('active');
            if (waChatPanel.classList.contains('active')) {
                waChatInput.focus();
            }
        });

        waCloseBtn.addEventListener('click', () => {
            waChatPanel.classList.remove('active');
        });

        const scrollToBottom = () => {
            waChatBody.scrollTop = waChatBody.scrollHeight;
        };

        const addMessage = (text, type) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `wa-message ${type}`;
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            msgDiv.innerHTML = `<p>${text}</p><span class="wa-time">${time}</span>`;
            waChatBody.appendChild(msgDiv);
            scrollToBottom();
        };

        const handleAiResponse = (userText) => {
            waChatInput.disabled = true;

            // Add typing indicator
            const typingDiv = document.createElement('div');
            typingDiv.className = 'wa-message wa-received';
            typingDiv.innerHTML = `<p><i>Typing...</i></p>`;
            typingDiv.id = 'typingIndicator';
            waChatBody.appendChild(typingDiv);
            scrollToBottom();

            setTimeout(() => {
                const indicator = document.getElementById('typingIndicator');
                if (indicator) indicator.remove();

                const lowerText = userText.toLowerCase();
                let reply = "Thanks for your message! Our team will get back to you shortly. For immediate assistance, please click the button below to chat on our official WhatsApp.";

                if (lowerText.includes('fees') || lowerText.includes('price') || lowerText.includes('cost')) {
                    reply = "Our fees depend on the specific program (Sketching, Painting, etc.) and duration. Would you like me to connect you with Sudeep Sir on WhatsApp for exact pricing?";
                } else if (lowerText.includes('timing') || lowerText.includes('hours') || lowerText.includes('time')) {
                    reply = "We are open until 10:00 PM at both our Nalasopara East and West branches. Let's connect on WhatsApp to find a batch timing that works for you!";
                } else if (lowerText.includes('location') || lowerText.includes('address') || lowerText.includes('where')) {
                    reply = "We have two branches:<br>📍 West: Yashwant Gaurav Apple No. 2<br>📍 East: Soni Nivas CHS, Taki Rd<br>Check our Locations section for maps!";
                } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
                    reply = "Hello there! 😊 Are you interested in any specific drawing or painting class?";
                }

                addMessage(reply, 'wa-received');

                // Add direct whatsapp link button
                setTimeout(() => {
                    const linkDiv = document.createElement('div');
                    linkDiv.className = 'wa-message wa-received';
                    linkDiv.innerHTML = `<a href="https://wa.me/9107774026846?text=Hi! I want to know more about the classes." target="_blank" style="display:inline-block; padding:8px 15px; background:#25D366; color:white; border-radius:10px; text-decoration:none; font-weight:bold; margin-top:5px;"><i class="fa-brands fa-whatsapp"></i> Chat with real Human</a><span class="wa-time">Now</span>`;
                    waChatBody.appendChild(linkDiv);
                    scrollToBottom();
                    waChatInput.disabled = false;
                    waChatInput.focus();
                }, 800);

            }, 1200);
        };

        const sendMessage = () => {
            const text = waChatInput.value.trim();
            if (text) {
                addMessage(text, 'wa-sent');
                waChatInput.value = '';
                handleAiResponse(text);
            }
        };

        waSendBtn.addEventListener('click', sendMessage);
        waChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // Modal Logic
    const joinBtns = document.querySelectorAll('.join-btn');
    const joinModal = document.getElementById('joinModal');
    const closeJoinModal = document.getElementById('closeJoinModal');
    const formSelectionView = document.getElementById('formSelectionView');
    const selectionCards = document.querySelectorAll('.selection-card');
    const backBtns = document.querySelectorAll('.back-btn');
    const offlineForm = document.getElementById('joinFormOffline');
    const onlineForm = document.getElementById('joinFormOnline');

    if (joinModal) {
        joinBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (offlineForm) offlineForm.style.display = 'none';
                if (onlineForm) onlineForm.style.display = 'none';
                if (formSelectionView) formSelectionView.style.display = 'block';
                joinModal.classList.add('active');
            });
        });

        closeJoinModal.addEventListener('click', () => {
            joinModal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === joinModal) {
                joinModal.classList.remove('active');
            }
        });

        if (selectionCards.length > 0) {
            selectionCards.forEach(btn => {
                btn.addEventListener('click', () => {
                    formSelectionView.style.display = 'none';
                    if (btn.getAttribute('data-form') === 'offline') {
                        offlineForm.style.display = 'block';
                    } else {
                        onlineForm.style.display = 'block';
                    }
                });
            });
        }

        if (backBtns.length > 0) {
            backBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    offlineForm.style.display = 'none';
                    onlineForm.style.display = 'none';
                    formSelectionView.style.display = 'block';
                });
            });
        }

        if (offlineForm) {
            offlineForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('studentName').value;
                const phone = document.getElementById('studentPhone').value;
                const edu = document.getElementById('studentEdu').value;
                const course = document.getElementById('studentCourse').value;
                const branch = document.getElementById('studentBranch').value;

                const message = `Hello Sudeep Sir, I want to join Offline Classes!%0A%0A*Student's Name:* ${name}%0A*WhatsApp:* ${phone}%0A*Education:* ${edu}%0A*Course:* ${course}%0A*Branch:* ${branch}`;
                window.open(`https://wa.me/9107774026846?text=${message}`, '_blank');
                joinModal.classList.remove('active');
                offlineForm.reset();
            });
        }

        if (onlineForm) {
            onlineForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('onlineName').value;
                const loc = document.getElementById('onlineLocation').value;
                const level = document.getElementById('onlineLevel').value;
                const duration = document.getElementById('onlineDuration').value;
                const course = document.getElementById('onlineCourse').value;
                const source = document.getElementById('onlineSource').value;

                const message = `Hello Sudeep Sir, I want to join the Online Crash Course!%0A%0A*Name:* ${name}%0A*Location:* ${loc}%0A*Art Level:* ${level}%0A*Duration:* ${duration}%0A*Course:* ${course}%0A*Found via:* ${source}`;
                window.open(`https://wa.me/9107774026846?text=${message}`, '_blank');
                joinModal.classList.remove('active');
                onlineForm.reset();
            });
        }
    }

    // Login Modal Logic
    const loginBtns = document.querySelectorAll('.login-btn');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginSelectionView = document.getElementById('loginSelectionView');
    const loginSelectionCards = document.querySelectorAll('.login-selection-card');
    const loginBackBtns = document.querySelectorAll('.login-back-btn');
    const studentLoginForm = document.getElementById('loginFormStudent');
    const teacherLoginForm = document.getElementById('loginFormTeacher');

    const studentMobileStep = document.getElementById('studentMobileStep');
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    const studentOtpStep = document.getElementById('studentOtpStep');
    const studentLoginPhone = document.getElementById('studentLoginPhone');

    if (loginModal) {
        loginBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (studentLoginForm) studentLoginForm.style.display = 'none';
                if (teacherLoginForm) teacherLoginForm.style.display = 'none';
                if (loginSelectionView) loginSelectionView.style.display = 'block';
                if (studentMobileStep) studentMobileStep.style.display = 'block';
                if (studentOtpStep) studentOtpStep.style.display = 'none';

                loginModal.classList.add('active');
            });
        });

        closeLoginModal.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });

        if (loginSelectionCards.length > 0) {
            loginSelectionCards.forEach(btn => {
                btn.addEventListener('click', () => {
                    loginSelectionView.style.display = 'none';
                    if (btn.getAttribute('data-login') === 'student') {
                        studentLoginForm.style.display = 'block';
                    } else {
                        teacherLoginForm.style.display = 'block';
                    }
                });
            });
        }

        if (loginBackBtns.length > 0) {
            loginBackBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    studentLoginForm.style.display = 'none';
                    teacherLoginForm.style.display = 'none';
                    loginSelectionView.style.display = 'block';
                });
            });
        }

        if (sendOtpBtn && studentLoginPhone) {
            sendOtpBtn.addEventListener('click', () => {
                if (studentLoginPhone.value.trim().length >= 10) {
                    studentMobileStep.style.display = 'none';
                    studentOtpStep.style.display = 'block';
                } else {
                    alert('Please enter a valid mobile number.');
                }
            });
        }

        if (studentLoginForm) {
            studentLoginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const otp = document.getElementById('studentOtp').value;
                if (otp.length === 4) {
                    window.location.href = 'student-dashboard.html';
                } else {
                    alert('Please enter a valid 4-digit OTP.');
                }
            });
        }

        if (teacherLoginForm) {
            teacherLoginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                window.location.href = 'teacher-dashboard.html';
            });
        }
    }
});
