class ProposalSite {
    constructor() {
        this.yesBtn = document.getElementById('yesBtn');
        this.noBtn = document.getElementById('noBtn');
        this.proposalCard = document.getElementById('proposalCard');
        this.successScreen = document.getElementById('successScreen');
        this.heartsContainer = document.getElementById('heartsContainer');
        
        this.noClickCount = 0;
        this.yesBtnScale = 1;
        
        this.init();
    }
    
    init() {
        this.yesBtn.addEventListener('click', () => this.handleYesClick());
        this.noBtn.addEventListener('click', () => this.handleNoClick());
        
        // Add entrance animations
        this.animateEntrance();
    }
    
    animateEntrance() {
        // Add subtle floating animation to the card
        setInterval(() => {
            this.proposalCard.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 3}px)`;
        }, 16);
    }
    
    handleYesClick() {
        // Hide proposal card with animation
        this.proposalCard.style.transform = 'scale(0.8)';
        this.proposalCard.style.opacity = '0';
        
        setTimeout(() => {
            this.showSuccessScreen();
        }, 300);
    }
    
    handleNoClick() {
        this.noClickCount++;
        
        // Increase yes button size
        this.yesBtnScale += 0.15;
        this.yesBtn.style.transform = `scale(${this.yesBtnScale})`;
        
        // Add shake animation to no button
        this.noBtn.style.animation = 'shake 0.5s ease-in-out';
        
        // Change no button text based on click count
        this.updateNoButtonText();
        
        // Make no button smaller and eventually disable it
        if (this.noClickCount >= 5) {
            this.noBtn.style.transform = 'scale(0.7)';
            this.noBtn.style.opacity = '0.5';
        }
        
        if (this.noClickCount >= 8) {
            this.noBtn.disabled = true;
            this.noBtn.textContent = '🥺 Lütfen...';
        }
        
        // Remove shake animation after it completes
        setTimeout(() => {
            this.noBtn.style.animation = '';
        }, 500);
        
        // Add encouraging messages
        this.showEncouragingMessage();
    }
    
    updateNoButtonText() {
        const noTexts = [
            'Hayır 💔',
            'Emin misin? 🥺',
            'Tekrar düşün... 💭',
            'Gerçekten mi? 😢',
            'Son şans! 🙏',
            'Lütfen... 🥺',
            'Neden ki? 😭',
            'Yalvarırım! 🙏',
            'Olamaz! 💔'
        ];
        
        if (this.noClickCount < noTexts.length) {
            this.noBtn.innerHTML = `<span>${noTexts[this.noClickCount]}</span>`;
        }
    }
    
    showEncouragingMessage() {
        const messages = [
            'Haydi, "Evet" daha iyi bir seçim! 💕',
            'Kalbim seninle atıyor... 💓',
            'Beraber harika olacağız! ✨',
            'Sen benim için çok değerlisin! 🌟',
            'Lütfen şansımızı deneyelim! 💖',
            'Seninle olmak istiyorum... 🥰',
            'Sen benim hayalimdeki kişisin! 💫',
            'Kalbim sadece seni istiyor! 💝'
        ];
        
        if (this.noClickCount <= messages.length) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'encouraging-message';
            messageDiv.textContent = messages[this.noClickCount - 1];
            messageDiv.style.cssText = `
                position: absolute;
                top: -60px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #ff9a9e, #fecfef);
                color: white;
                padding: 12px 20px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
                white-space: nowrap;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                animation: fadeInBounce 0.6s ease-out;
                z-index: 10;
            `;
            
            this.proposalCard.appendChild(messageDiv);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 3000);
        }
    }
    
    showSuccessScreen() {
        this.successScreen.style.display = 'flex';
        this.successScreen.style.opacity = '0';
        
        // Fade in success screen
        setTimeout(() => {
            this.successScreen.style.opacity = '1';
            this.successScreen.style.transition = 'opacity 0.5s ease';
        }, 50);
        
        // Start heart animation
        this.startHeartRain();
        
        // Add confetti effect
        this.createConfetti();
    }
    
    startHeartRain() {
        const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '🌹', '❤️', '💯'];
        
        const createHeart = () => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            
            this.heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 6000);
        };
        
        // Create hearts continuously
        const heartInterval = setInterval(createHeart, 300);
        
        // Stop creating hearts after 10 seconds
        setTimeout(() => {
            clearInterval(heartInterval);
        }, 10000);
    }
    
    createConfetti() {
        const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
        `;
        document.body.appendChild(confettiContainer);
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: 0.8;
                border-radius: 50%;
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            `;
            confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti container after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }
}

// Global function for restart button
function restartProposal() {
    location.reload();
}

// Add CSS animations dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fadeInBounce {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(10px) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
        }
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProposalSite();
});</absolute_file_name>
    </file>