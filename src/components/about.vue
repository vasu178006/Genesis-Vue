<template>
  <div class="credits-container">
    <div class="animated-background"></div>
    
    <div class="credits-header" v-animate-on-scroll="'fade-in'">
      <h1>{{ projectTitle }}</h1>
      <p class="project-description">{{ projectDescription }}</p>
    </div>

    <div class="credits-section" v-animate-on-scroll="'slide-up'">
      <h2>Developer</h2>
      <div class="developer-showcase">
        <div 
          class="developer-card"
          @mouseenter="isActive = true"
          @mouseleave="isActive = false"
          :class="{ 'is-active': isActive }"
        >
          <div class="card-background"></div>
          <div class="profile-image-container">
            <img 
              :src="developer.profilePic || defaultProfilePic" 
              :alt="`${developer.name}'s profile`" 
              class="profile-image" 
            />
            <div class="glow-effect"></div>
          </div>
          <div class="developer-info">
            <h3>{{ developer.name }}</h3>
            <p class="role">{{ developer.role }}</p>
            
            <div class="skills-container">
              <h4>Skills</h4>
              <div class="skills-grid">
                <div 
                  v-for="(skill, index) in developer.skills" 
                  :key="index" 
                  class="skill-badge"
                  :style="{ animationDelay: index * 0.08 + 's' }"
                >
                  {{ skill }}
                </div>
              </div>
            </div>
            
            <div class="contributions-container">
              <h4>Contributions</h4>
              <p class="contributions">{{ developer.contributions }}</p>
            </div>
            
            <div class="social-links">
              <a v-if="developer.github" :href="developer.github" target="_blank" class="social-link">
                <i class="fab fa-github"></i>
              </a>
              <a v-if="developer.linkedin" :href="developer.linkedin" target="_blank" class="social-link">
                <i class="fab fa-linkedin"></i>
              </a>
              <a v-if="developer.website" :href="developer.website" target="_blank" class="social-link">
                <i class="fas fa-globe"></i>
              </a>
              <a v-if="developer.email" :href="`mailto:${developer.email}`" class="social-link">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="credits-footer" v-animate-on-scroll="'fade-in'">
      <h2>Project Details</h2>
      <div class="details-container">
        <div class="detail-item" v-animate-on-scroll="'pop-in'" :data-delay="0">
          <h3>Version</h3>
          <p>{{ projectVersion }}</p>
        </div>
        <div class="detail-item" v-animate-on-scroll="'pop-in'" :data-delay="0.15">
          <h3>Last Updated</h3>
          <p>{{ lastUpdated }}</p>
        </div>
        <div class="detail-item" v-animate-on-scroll="'pop-in'" :data-delay="0.3">
          <h3>License</h3>
          <p>{{ license }}</p>
        </div>
      </div>
      <div class="repository-link">
        <a :href="repositoryUrl" target="_blank" class="repo-button">
          <span class="repo-button-bg"></span>
          <span class="repo-button-content">
            <i class="fab fa-github"></i> View Repository
          </span>
        </a>
      </div>
      <div class="home-link">
        <RouterLink to="/landing"class="home-button">
          <span class="home-button-bg"></span>
          <span class="home-button-content">
            <i class="fas fa-home"></i> Back to Home
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeveloperCredit',
  data() {
    return {
      isActive: false,
      projectTitle: 'Genesis PC store',
      projectDescription: 'A clean, minimal project crafted with expertise.',
      projectVersion: '1.0.0',
      lastUpdated: 'March 2025',
      license: 'MIT',
      repositoryUrl: 'https://github.com/vasu178006/Genesis-Vue',
      homeUrl: '/', // URL to the landing page
      defaultProfilePic: 'https://via.placeholder.com/300',
      developer: {
        name: 'Vasu Sharma',
        role: 'Developer',
        contributions: 'Designed and implemented the entire application architecture, created responsive UI components, optimized performance, and deployed the application to production.',
        skills: ['Vue.js', 'JavaScript', 'CSS3', 'Node.js', 'Firebase', ],
        profilePic: '/images/jin.webp',
      }
    };
  },
  directives: {
    animateOnScroll: {
      inserted: function(el, binding) {
        let delay = el.dataset.delay || 0;
        let animationClass = binding.value;
        
        el.style.opacity = '0';
        el.classList.add(animationClass);
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                el.style.opacity = '1';
                el.classList.add('animated');
              }, delay * 1000);
              observer.unobserve(el);
            }
          });
        }, {
          threshold: 0.2
        });
        
        observer.observe(el);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap');

.credits-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #e0e0ff;
  background-color: transparent;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* Animated background */
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(125deg, #0f0524 0%, #1a0a2e 40%, #2d1854 75%, #3d1d70 100%);
  z-index: -2;
  overflow: hidden;
}

.animated-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(187, 134, 252, 0.1) 0%, transparent 60%);
  animation: pulse-glow 10s infinite alternate ease-in-out;
}

.animated-background::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  animation: background-drift 180s linear infinite;
  z-index: -1;
  opacity: 0.4;
}

@keyframes background-drift {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(10%, 10%) rotate(5deg);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

.credits-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.credits-header h1 {
  font-size: 2.2rem;
  font-weight: 600;
  color: #bb86fc;
  margin-bottom: 0.75rem;
  position: relative;
  display: inline-block;
}

.credits-header h1::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #bb86fc;
  animation: line-grow 1.2s forwards 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

@keyframes line-grow {
  0% { width: 0; }
  100% { width: 100%; }
}

.project-description {
  font-size: 1.1rem;
  color: #d0c0ff;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

.credits-section, .credits-footer {
  margin-bottom: 3rem;
  position: relative;
}

.credits-section h2, .credits-footer h2 {
  font-size: 1.6rem;
  color: #bb86fc;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
}

.credits-section h2::after, .credits-footer h2::after {
  content: '';
  display: block;
  width: 60px;
  height: 2px;
  background: #bb86fc;
  margin: 0.5rem auto 0;
  transform: scaleX(0);
  animation: scale-in 1s forwards cubic-bezier(0.25, 1, 0.5, 1);
  transform-origin: center;
}

@keyframes scale-in {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}

.developer-showcase {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}

.developer-card {
  width: 100%;
  max-width: 550px;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  backdrop-filter: blur(5px);
  transform-style: preserve-3d;
  perspective: 1000px;
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(45, 24, 84, 0.7);
  border-radius: 12px;
  z-index: -1;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(187, 134, 252, 0.15);
  transform: translateZ(-10px);
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.developer-card.is-active .card-background {
  background: rgba(55, 30, 100, 0.85);
  border: 1px solid rgba(187, 134, 252, 0.3);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(187, 134, 252, 0.25);
}

.developer-card.is-active {
  transform: translateY(-10px) scale(1.02);
}

.profile-image-container {
  height: 180px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(35, 18, 62, 0.5);
  position: relative;
  transition: all 0.5s ease-out;
}

.developer-card.is-active .profile-image-container {
  background: rgba(45, 24, 84, 0.5);
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: rgba(187, 134, 252, 0.15);
  filter: blur(20px);
  opacity: 0;
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.developer-card.is-active .glow-effect {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.3);
  background: rgba(187, 134, 252, 0.25);
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #bb86fc;
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 1;
  filter: brightness(0.95);
  transform: translateZ(10px);
}

.developer-card.is-active .profile-image {
  transform: translateZ(20px) scale(1.05);
  border-color: #d0b3ff;
  box-shadow: 0 0 30px rgba(187, 134, 252, 0.5);
  filter: brightness(1.05);
}

.developer-info {
  padding: 1.8rem;
  transition: all 0.5s ease-out;
}

.developer-card.is-active .developer-info {
  transform: translateZ(10px);
}

.developer-info h3 {
  color: #bb86fc;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  position: relative;
  display: inline-block;
  transition: all 0.5s ease-out;
}

.developer-card.is-active .developer-info h3 {
  color: #d0b3ff;
  text-shadow: 0 0 15px rgba(187, 134, 252, 0.5);
}

.role {
  color: #d0b3ff;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1.25rem;
  transition: all 0.5s ease-out;
  opacity: 0.9;
}

.developer-card.is-active .role {
  opacity: 1;
}

.skills-container {
  margin-bottom: 1.25rem;
}

.skills-container h4, .contributions-container h4 {
  color: #bb86fc;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
  transition: all 0.5s ease-out;
}

.developer-card.is-active .skills-container h4,
.developer-card.is-active .contributions-container h4 {
  color: #d0b3ff;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-badge {
  background: rgba(61, 29, 112, 0.8);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  transform: translateY(10px);
  animation: fade-in-up 0.6s forwards;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.developer-card.is-active .skill-badge {
  background: rgba(78, 41, 145, 0.9);
  box-shadow: 0 3px 10px rgba(187, 134, 252, 0.3);
  transform: translateY(-3px) translateZ(15px);
}

.skill-badge:hover {
  background: #5835a5;
  transform: translateY(-3px) scale(1.05);
}

.contributions-container {
  margin-bottom: 1.25rem;
}

.contributions {
  color: #d0c0ff;
  font-size: 0.9rem;
  line-height: 1.5;
  border-left: 2px solid rgba(106, 60, 191, 0.7);
  padding-left: 0.75rem;
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0.9;
}

.developer-card.is-active .contributions {
  border-left-color: rgba(187, 134, 252, 0.9);
  transform: translateX(3px) translateZ(5px);
  opacity: 1;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.25rem;
}

.social-link {
  color: rgba(187, 134, 252, 0.8);
  font-size: 1.2rem;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(45, 24, 84, 0.3);
}

.social-link:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: rgba(187, 134, 252, 0.1);
  transform: scale(0);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.social-link:hover {
  color: #fff;
  transform: translateY(-5px) scale(1.1);
}

.social-link:hover:before {
  transform: scale(1);
}

.developer-card.is-active .social-link {
  color: rgba(208, 179, 255, 0.9);
  background: rgba(61, 29, 112, 0.4);
}

.details-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.detail-item {
  background: rgba(45, 24, 84, 0.6);
  padding: 1.25rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(187, 134, 252, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(0) scale(1);
}

.detail-item:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(187, 134, 252, 0.15);
  border-color: rgba(187, 134, 252, 0.3);
  background: rgba(55, 30, 100, 0.7);
}

.detail-item h3 {
  color: #bb86fc;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease-out;
}

.detail-item:hover h3 {
  color: #d0b3ff;
}

.detail-item p {
  color: #d0c0ff;
  transition: all 0.3s ease-out;
}

.detail-item:hover p {
  color: #fff;
}

.repository-link {
  text-align: center;
  margin-top: 2rem;
}

.repo-button {
  display: inline-block;
  position: relative;
  padding: 0.75rem 0;
  width: 180px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.repo-button-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #6a3cbf 0%, #7b47d9 100%);
  z-index: -1;
  border-radius: 6px;
  transition: all 0.5s ease-out;
  box-shadow: 0 4px 15px rgba(106, 60, 191, 0.3);
}

.repo-button-content {
  position: relative;
  z-index: 1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.repo-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.7s ease;
  z-index: 1;
}

.repo-button:hover {
  transform: translateY(-5px) scale(1.05);
}

.repo-button:hover .repo-button-bg {
  background: linear-gradient(135deg, #7b47d9 0%, #8e5ce6 100%);
  box-shadow: 0 8px 25px rgba(106, 60, 191, 0.5);
}

.repo-button:hover:before {
  transform: translateX(100%);
}

.repo-button-content i {
  margin-right: 0.5rem;
}

/* Home button styles */
.home-link {
  text-align: center;
  margin-top: 1rem;
}

.home-button {
  display: inline-block;
  position: relative;
  padding: 0.75rem 0;
  width: 180px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.home-button-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4e4ebf 0%, #5a5ad9 100%);
  z-index: -1;
  border-radius: 6px;
  transition: all 0.5s ease-out;
  box-shadow: 0 4px 15px rgba(78, 78, 191, 0.3);
}

.home-button-content {
  position: relative;
  z-index: 1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.7s ease;
  z-index: 1;
}

.home-button:hover {
  transform: translateY(-5px) scale(1.05);
}

.home-button:hover .home-button-bg {
  background: linear-gradient(135deg, #5a5ad9 0%, #6b6be6 100%);
  box-shadow: 0 8px 25px rgba(78, 78, 191, 0.5);
}

.home-button:hover:before {
  transform: translateX(100%);
}

.home-button-content i {
  margin-right: 0.5rem;
}

/* Animation classes */
.fade-in {
  transform: translateY(20px);
  transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-in.animated {
  transform: translateY(0);
}

.slide-up {
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-up.animated {
  transform: translateY(0);
}

.pop-in {
  transform: scale(0.8);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pop-in.animated {
  transform: scale(1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .details-container {
    grid-template-columns: 1fr;
  }
  
  .developer-info h3 {
    font-size: 1.3rem;
  }
  
  .skills-grid {
    gap: 0.4rem;
  }
}
</style>